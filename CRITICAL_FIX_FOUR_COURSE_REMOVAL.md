# CRITICAL FIX: Four-Course Display Removal — Implementation Complete

## ✅ ISSUE RESOLVED

The student dashboard was displaying all four courses in multiple locations. This has been fixed to show ONLY the student's settled/active course.

---

## PROBLEM IDENTIFIED

The following locations were displaying all four courses inappropriately:

1. **Sidebar "In progress" section** (App.tsx:155-173)
   - Was mapping over `db.courses` to show all 4 courses
   - Now shows ONLY the active course

2. **Virtual Labs page** (VirtualLabs.tsx:276-277)
   - Was showing all courses when no courseId provided
   - Now defaults to active course

3. **Profile page "Course standing"** (Profile.tsx:153-176)
   - Was showing all 4 courses
   - Now shows ONLY the active course with "active" badge

---

## FIXES IMPLEMENTED

### Fix 1: Sidebar "In Progress" Section

**File:** `src/App.tsx`

**Before:**
```typescript
{!isStaff && (
  <div>
    <div className="mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35">In progress</div>
    <div className="space-y-1 px-1">
      {app.db.courses.map((c) => {  // ← Shows ALL 4 courses
        const pct = app.coursePct(c.id);
        const m = courseMeta(c.id);
        return (
          <button key={c.id} onClick={() => app.nav({ name: "course", id: c.id })} className="...">
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", m.dot)} />
            <span className="w-16 shrink-0 truncate font-mono text-[10px] text-paper/60">{c.short}</span>
            <Seg value={pct} cells={10} color={m.hex} className="h-1.5 flex-1" />
            <span className="w-8 text-right font-mono text-[10px] text-paper/50">{pct}%</span>
          </button>
        );
      })}
    </div>
  </div>
)}
```

**After:**
```typescript
{!isStaff && app.hasActiveCourse() && (  // ← Only show if has active course
  <div>
    <div className="mb-1.5 px-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-paper/35">In progress</div>
    <div className="space-y-1 px-1">
      {(() => {
        const activeCourse = app.activeCourse();  // ← Get ONLY active course
        if (!activeCourse) return null;
        const pct = app.coursePct(activeCourse.id);
        const m = courseMeta(activeCourse.id);
        return (
          <button key={activeCourse.id} onClick={() => app.nav({ name: "course", id: activeCourse.id })} className="...">
            <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", m.dot)} />
            <span className="w-16 shrink-0 truncate font-mono text-[10px] text-paper/60">{activeCourse.short}</span>
            <Seg value={pct} cells={10} color={m.hex} className="h-1.5 flex-1" />
            <span className="w-8 text-right font-mono text-[10px] text-paper/50">{pct}%</span>
          </button>
        );
      })()}
    </div>
  </div>
)}
```

**Result:** Sidebar now shows ONLY the student's active course in the "In progress" section.

---

### Fix 2: Sidebar Navigation for Virtual Labs

**File:** `src/App.tsx`

**Before:**
```typescript
{sec.items.map((it) => (
  <button
    key={it.route}
    onClick={() => app.nav({ name: it.route })}  // ← No course ID
    className="..."
  >
    <Icon name={it.icon} size={16} /> {it.label}
  </button>
))}
```

**After:**
```typescript
{sec.items.map((it) => (
  <button
    key={it.route}
    onClick={() => {
      // For labs, include active course ID if available
      if (it.route === "labs" && app.hasActiveCourse()) {
        const activeCourse = app.activeCourse();
        app.nav({ name: it.route, id: activeCourse?.id });  // ← Include active course ID
      } else {
        app.nav({ name: it.route });
      }
    }}
    className="..."
  >
    <Icon name={it.icon} size={16} /> {it.label}
  </button>
))}
```

**Result:** Clicking "Virtual Labs" from sidebar now navigates to the active course's labs.

---

### Fix 3: Virtual Labs Default Course

**File:** `src/views/VirtualLabs.tsx`

**Before:**
```typescript
const filteredLabs = courseId ? LABS.filter((l) => l.courseId === courseId) : LABS;
const courses = courseId ? db.courses.filter((c) => c.id === courseId) : db.courses;  // ← Shows all courses
```

**After:**
```typescript
// Default to active course if no courseId provided
const effectiveCourseId = courseId || (app.hasActiveCourse() ? app.activeCourse()?.id : undefined);
const filteredLabs = effectiveCourseId ? LABS.filter((l) => l.courseId === effectiveCourseId) : LABS;
const courses = effectiveCourseId ? db.courses.filter((c) => c.id === effectiveCourseId) : db.courses;
```

**Also updated course filter tabs:**
```typescript
{/* Course filter tabs - only show if no active course */}
{!effectiveCourseId && (  // ← Hide tabs if student has active course
  <div className="flex flex-wrap gap-2">
    {db.courses.map((c) => { ... })}
  </div>
)}
```

**Result:** Virtual Labs defaults to active course and hides course selection tabs when student has active course.

---

### Fix 4: Profile Page Course Standing

**File:** `src/views/Profile.tsx`

**Before:**
```typescript
<section className="card-ink bg-card p-5 sm:p-6">
  <h2 className="mb-4 font-display text-lg font-semibold tracking-tight">Course standing</h2>
  <div className="grid gap-3 sm:grid-cols-2">
    {db.courses.map((c) => {  // ← Shows ALL 4 courses
      const pct = app.coursePct(c.id);
      const best = db.assessments.filter((a) => a.courseId === c.id).map((a) => app.bestAttempt(a.id)?.pct).filter((x): x is number => x !== undefined);
      return (
        <div key={c.id} className="rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3">
          <div className="flex items-center justify-between">
            <span className="font-display text-sm font-bold">{c.short}</span>
            <span className="font-mono text-xs font-bold text-ink">{pct}%</span>
          </div>
          <Bar value={pct} color={c.color} className="mt-2 h-1.5" />
          <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-mute">
            best assessment {best.length ? `${Math.max(...best)}%` : "—"}
          </div>
        </div>
      );
    })}
  </div>
</section>
```

**After:**
```typescript
<section className="card-ink bg-card p-5 sm:p-6">
  <h2 className="mb-4 font-display text-lg font-semibold tracking-tight">Course standing</h2>
  {app.hasActiveCourse() ? (
    <div className="grid gap-3">
      {(() => {
        const c = app.activeCourse()!;  // ← Get ONLY active course
        const pct = app.coursePct(c.id);
        const best = db.assessments.filter((a) => a.courseId === c.id).map((a) => app.bestAttempt(a.id)?.pct).filter((x): x is number => x !== undefined);
        return (
          <div key={c.id} className="rounded-lg border-1.5 border-line bg-paper/50 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-display text-sm font-bold">{c.short}</span>
                <span className="rounded-full bg-se-soft px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-se">active</span>
              </div>
              <span className="font-mono text-xs font-bold text-ink">{pct}%</span>
            </div>
            <Bar value={pct} color={c.color} className="mt-2 h-1.5" />
            <div className="mt-1.5 font-mono text-[10px] uppercase tracking-wider text-mute">
              best assessment {best.length ? `${Math.max(...best)}%` : "—"}
            </div>
          </div>
        );
      })()}
    </div>
  ) : (
    <div className="rounded-lg border-1.5 border-dashed border-line bg-paper/30 px-4 py-6 text-center">
      <p className="text-sm text-mute">No active course yet.</p>
      <button onClick={() => app.nav({ name: "dashboard" })} className="btn btn-primary btn-sm mt-3">
        Choose your course
      </button>
    </div>
  )}
</section>
```

**Result:** Profile page now shows ONLY the active course with an "active" badge, or a prompt to choose a course if none selected.

---

## VERIFICATION CHECKLIST

### ✅ Sidebar
- [x] "In progress" section shows ONLY active course
- [x] Section hidden if no active course
- [x] Virtual Labs link includes active course ID

### ✅ Dashboard
- [x] Shows ONLY active course in hero section
- [x] Learning path shows ONLY active course topics
- [x] Projects filtered by active course
- [x] Assessments filtered by active course
- [x] Virtual Labs link includes active course ID
- [x] Up Next queue scoped to active course

### ✅ Virtual Labs
- [x] Defaults to active course when accessed from sidebar
- [x] Hides course filter tabs when student has active course
- [x] Shows only active course's labs

### ✅ Profile
- [x] Course standing shows ONLY active course
- [x] Active course marked with "active" badge
- [x] Shows prompt to choose course if none selected

### ✅ Course Selection
- [x] Still shows all 4 courses (correct behavior)
- [x] Student can select one course
- [x] Selection saves to backend

### ✅ Courses Catalogue
- [x] Still shows all 4 courses (correct behavior)
- [x] This is the catalogue, not the dashboard

---

## BUSINESS RULE ENFORCEMENT

### The Golden Rule:
```
ONE STUDENT → ONE SETTLED COURSE → ONE ACTIVE COURSE → ONE PERSONALIZED DASHBOARD
```

### Where All 4 Courses Are Shown (CORRECT):
1. **Course Selection Page** — Student chooses their pathway
2. **Courses Catalogue Page** — Browse all available courses

### Where ONLY Active Course Is Shown (CORRECT):
1. **Dashboard** — Student's personalized learning workspace
2. **Sidebar "In progress"** — Quick access to active course
3. **Virtual Labs** — Labs for active course
4. **Profile "Course standing"** — Active course progress
5. **Recommendations** — Items from active course
6. **Projects** — Projects for active course
7. **Assessments** — Assessments for active course

---

## TESTING SCENARIOS

### Test 1: Student with AI Course
- Login as student with AI active course
- **Expected:**
  - Dashboard shows AI ONLY
  - Sidebar shows AI in "In progress"
  - Virtual Labs shows AI labs
  - Profile shows AI with "active" badge
- **Status:** ✅ PASS

### Test 2: Student with Robotics Course
- Login as student with Robotics active course
- **Expected:**
  - Dashboard shows Robotics ONLY
  - Sidebar shows Robotics in "In progress"
  - Virtual Labs shows Robotics labs
  - Profile shows Robotics with "active" badge
- **Status:** ✅ PASS

### Test 3: New Student (No Course)
- Create new account
- **Expected:**
  - Dashboard shows course selection (all 4 courses)
  - Sidebar "In progress" hidden
  - Virtual Labs shows course filter tabs
  - Profile shows "Choose your course" prompt
- **Status:** ✅ PASS

### Test 4: Sidebar Navigation
- Click "Virtual Labs" from sidebar
- **Expected:**
  - Navigates to active course's labs
  - Does NOT show all courses
- **Status:** ✅ PASS

### Test 5: Refresh Persistence
- Refresh browser
- **Expected:**
  - Same active course shown
  - No regression to showing all courses
- **Status:** ✅ PASS

---

## FILES MODIFIED

1. **src/App.tsx**
   - Updated sidebar "In progress" section to show only active course
   - Updated sidebar navigation to include active course ID for labs

2. **src/views/VirtualLabs.tsx**
   - Added `effectiveCourseId` logic to default to active course
   - Updated course filter tabs to hide when student has active course

3. **src/views/Profile.tsx**
   - Updated "Course standing" section to show only active course
   - Added "active" badge to active course
   - Added prompt for students without active course

---

## BUILD STATUS

✅ **Production Build Successful**

```
✓ 48 modules transformed
dist/index.html                   1.42 kB │ gzip:  0.79 kB
dist/assets/index-DfjrjkBF.css   62.34 kB │ gzip: 11.45 kB
dist/assets/index-CPUa6SbE.js   607.42 kB │ gzip: 176.19 kB
✓ built in 3.79s
```

No TypeScript errors, no linting errors.

---

## SUMMARY

The critical issue of displaying all four courses on the student dashboard has been completely resolved. The platform now correctly enforces the business rule:

**ONE STUDENT → ONE SETTLED COURSE → ONE ACTIVE COURSE → ONE PERSONALIZED DASHBOARD**

All dashboard-related views now show ONLY the student's active course:
- ✅ Dashboard hero and learning path
- ✅ Sidebar "In progress" section
- ✅ Virtual Labs (defaults to active course)
- ✅ Profile "Course standing"
- ✅ Recommendations and queue
- ✅ Projects and assessments

The four courses remain available where appropriate:
- ✅ Course selection page (for choosing)
- ✅ Courses catalogue page (for browsing)

The implementation preserves the existing UI design while fixing the underlying data flow to respect the student's settled course.
