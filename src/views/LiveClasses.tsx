import { useState, useEffect, useRef } from "react";
import { useApp } from "../lib/store";
import { courseMeta } from "../lib/data";
import { Chip, CourseTag, Reveal, SectionHead, cn } from "../components/ui";
import { Icon } from "../components/icons";
import type { LiveClass, ClassMessage, ClassPoll } from "../lib/types";

const isLocalhost = () => ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
const secureCameraUrl = () => {
  if (window.location.protocol !== "http:" || isLocalhost()) return "";
  return `https://${window.location.host}${window.location.pathname}${window.location.search}${window.location.hash}`;
};

const mediaUnavailableMessage = (device: "Camera" | "Microphone") => {
  if (!window.isSecureContext) {
    return `${device} is blocked because this page is not using HTTPS. Open the secure HTTPS version of this site, or use localhost while developing.`;
  }
  return `${device} access is not available in this browser. Try Chrome, Edge, Safari, or Firefox with camera permissions enabled.`;
};

// ─── Live Classes List View ──────────────────────────────────────────────────

export function LiveClassesView() {
  const app = useApp();
  const { db, user } = app;

  if (!user) return null;

  const isInstructor = user.role === "instructor" || user.role === "admin";
  const studentClasses = app.getStudentLiveClasses();

  const liveNow = db.liveClasses.filter((c) => c.status === "live");
  const upcoming = db.liveClasses.filter((c) => c.status === "scheduled");
  const completed = db.liveClasses.filter((c) => c.status === "completed");

  const handleStartInstantClass = () => {
    if (!isInstructor) return;

    const testCourse = db.courses[0];
    if (!testCourse) {
      app.toast("No courses available", "warn");
      return;
    }

    const liveClass = app.createLiveClass({
      title: "Live Class - " + new Date().toLocaleTimeString(),
      description: "Instant live teaching session for students in this course.",
      courseId: testCourse.id,
      instructorId: user.id,
      scheduledAt: Date.now(),
      duration: 60,
      status: "live",
      allowStudentMic: true,
      allowStudentCamera: true,
      allowStudentChat: true,
      allowScreenShare: true,
      recordingEnabled: false,
      resources: [],
    });

    if (liveClass) {
      app.nav({ name: "liveclass", id: liveClass.id });
    }
  };

  return (
    <div>
      <SectionHead
        kicker="Live Learning"
        title="Virtual Classroom"
        right={
          isInstructor ? (
            <div className="flex gap-2">
              <button 
                className="btn btn-danger btn-sm" 
                onClick={handleStartInstantClass}
                title="Start an instant live class"
              >
                <Icon name="play" size={13} /> Start Live Class
              </button>
              <button className="btn btn-primary btn-sm" onClick={() => app.nav({ name: "admin", tab: "liveclasses" })}>
                <Icon name="plus" size={13} /> Create Class
              </button>
            </div>
          ) : null
        }
      />

      {/* Live Now */}
      {liveNow.length > 0 && (
        <Reveal>
          <section className="card-ink mb-6 overflow-hidden bg-card">
            <div className="flex items-center gap-2 border-b-1.5 border-line bg-danger/5 px-5 py-3">
              <span className="dot-live h-2 w-2 rounded-full bg-danger" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-danger">Live Now</span>
            </div>
            <div className="space-y-2 p-4">
              {liveNow.map((c) => (
                <LiveClassCard key={c.id} liveClass={c} isLive />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Upcoming Classes */}
      {upcoming.length > 0 && (
        <Reveal delay={80}>
          <section className="card-ink mb-6 bg-card p-5">
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight">Upcoming Classes</h3>
            <div className="space-y-2">
              {upcoming.map((c) => (
                <LiveClassCard key={c.id} liveClass={c} />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Completed Classes */}
      {completed.length > 0 && (
        <Reveal delay={120}>
          <section className="card-ink bg-card p-5">
            <h3 className="mb-4 font-display text-lg font-semibold tracking-tight">Past Classes</h3>
            <div className="space-y-2">
              {completed.slice(0, 5).map((c) => (
                <LiveClassCard key={c.id} liveClass={c} isPast />
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {/* Empty State */}
      {liveNow.length === 0 && upcoming.length === 0 && completed.length === 0 && (
        <Reveal>
          <div className="card-ink mx-auto max-w-md bg-card p-8 text-center">
            <Icon name="video" size={48} className="mx-auto text-mute/40" />
            <h3 className="mt-4 font-display text-lg font-bold">No live classes yet</h3>
            <p className="mt-2 text-sm text-mute">
              {isInstructor ? "Create your first live class to get started." : "Check back soon for live learning sessions."}
            </p>
          </div>
        </Reveal>
      )}
    </div>
  );
}

// ─── Live Class Card ─────────────────────────────────────────────────────────

function LiveClassCard({ liveClass, isLive, isPast }: { liveClass: LiveClass; isLive?: boolean; isPast?: boolean }) {
  const app = useApp();
  const course = app.getCourse(liveClass.courseId);
  const m = course ? courseMeta(course.id) : null;
  const instructor = app.getUser(liveClass.instructorId);

  const scheduledDate = new Date(liveClass.scheduledAt);
  const isToday = scheduledDate.toDateString() === new Date().toDateString();
  const isTomorrow = scheduledDate.toDateString() === new Date(Date.now() + 86400000).toDateString();

  const formatDate = () => {
    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";
    return scheduledDate.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  };

  const formatTime = () => {
    return scheduledDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  };

  const handleJoin = () => {
    app.joinLiveClass(liveClass.id);
    app.nav({ name: "liveclass", id: liveClass.id });
  };

  return (
    <div className={cn(
      "card-ink-hover group rounded-lg border-1.5 border-line bg-paper/50 p-4 transition-all",
      isLive && "border-danger/40 bg-danger/5"
    )}>
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            {isLive && (
              <span className="flex items-center gap-1 rounded-full bg-danger px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
                <span className="dot-live h-1.5 w-1.5 rounded-full bg-white" />
                Live
              </span>
            )}
            {course && <CourseTag course={course} />}
          </div>
          <h4 className="mt-1.5 font-display text-base font-bold tracking-tight">{liveClass.title}</h4>
          <p className="mt-1 text-[13px] text-mute line-clamp-2">{liveClass.description}</p>
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-wider text-mute">
            <span className="flex items-center gap-1">
              <Icon name="calendar" size={11} />
              {formatDate()} · {formatTime()}
            </span>
            <span className="flex items-center gap-1">
              <Icon name="clock" size={11} />
              {liveClass.duration} min
            </span>
            {instructor && (
              <span className="flex items-center gap-1">
                <Icon name="user" size={11} />
                {instructor.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col items-end gap-2">
          {isLive && (
            <button onClick={handleJoin} className="btn btn-danger btn-sm">
              <Icon name="play" size={13} /> Join Live
            </button>
          )}
          {!isLive && !isPast && liveClass.status === "scheduled" && (
            <button onClick={handleJoin} className="btn btn-primary btn-sm">
              <Icon name="calendar" size={13} /> View Details
            </button>
          )}
          {isPast && (
            <Chip className="bg-[#e8eadd] text-mute">Completed</Chip>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Live Classroom View ─────────────────────────────────────────────────────

export function LiveClassroomView({ classId }: { classId: string }) {
  const app = useApp();
  const { user } = app;
  const liveClass = app.getLiveClass(classId);
  const isInstructorForRoom = !!liveClass && !!user && (user.id === liveClass.instructorId || user.role === "admin");
  const [isJoined, setIsJoined] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isMicOn, setIsMicOn] = useState(false);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [hasRaisedHand, setHasRaisedHand] = useState(false);
  const [cameraError, setCameraError] = useState("");
  const [micError, setMicError] = useState("");
  const [secureUrl, setSecureUrl] = useState("");
  const [messages, setMessages] = useState<ClassMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [activePoll, setActivePoll] = useState<ClassPoll | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenRef = useRef<HTMLVideoElement>(null);
  const localStreamRef = useRef<MediaStream | null>(null);
  const screenStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (liveClass) {
      const classMessages = app.db.classMessages[classId] || [];
      setMessages(classMessages);
      const polls = app.db.classPolls[classId] || [];
      const currentPoll = polls.find((p) => p.isActive);
      if (currentPoll) setActivePoll(currentPoll);
    }
  }, [classId, liveClass, app.db.classMessages, app.db.classPolls]);

  useEffect(() => {
    if (liveClass && isInstructorForRoom) {
      app.joinLiveClass(classId);
      setIsJoined(true);
    }
  }, [classId, liveClass?.id, isInstructorForRoom]);

  useEffect(() => {
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
      screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [classId]);

  useEffect(() => {
    if (videoRef.current && localStreamRef.current && isCameraOn) {
      videoRef.current.srcObject = localStreamRef.current;
      videoRef.current.play().catch(() => {
        // Autoplay may wait for the browser to finish granting access.
      });
    }
  }, [isCameraOn]);

  useEffect(() => {
    if (screenRef.current && screenStreamRef.current && isScreenSharing) {
      screenRef.current.srcObject = screenStreamRef.current;
      screenRef.current.play().catch(() => {
        // Screen-share playback starts once the browser has attached the stream.
      });
    }
  }, [isScreenSharing]);

  if (!liveClass || !user) {
    return (
      <div className="card-ink mx-auto max-w-md bg-card p-8 text-center">
        <Icon name="flag" size={48} className="mx-auto text-danger/60" />
        <h3 className="mt-4 font-display text-lg font-bold">Class not found</h3>
        <p className="mt-2 text-sm text-mute">This class doesn't exist or has been cancelled.</p>
        <button onClick={() => app.nav({ name: "liveclasses" })} className="btn btn-primary mt-4">
          Back to Live Classes
        </button>
      </div>
    );
  }

  const course = app.getCourse(liveClass.courseId);
  const isInstructor = isInstructorForRoom;
  const isLive = liveClass.status === "live";
  const instructor = app.getUser(liveClass.instructorId);
  const attendance = app.db.classAttendance[classId] || [];
  const activeAttendees = attendance.filter((entry) => !entry.leftAt);
  const canUseCamera = isInstructor || liveClass.allowStudentCamera;
  const canUseMic = isInstructor || liveClass.allowStudentMic;

  const toggleCamera = async () => {
    if (!canUseCamera) {
      app.toast("Student cameras are disabled for this class", "warn");
      return;
    }
    if (isCameraOn) {
      localStreamRef.current?.getVideoTracks().forEach((track) => {
        track.stop();
        localStreamRef.current?.removeTrack(track);
      });
      setIsCameraOn(false);
      setCameraError("");
    } else {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          const message = mediaUnavailableMessage("Camera");
          setCameraError(message);
          setSecureUrl(secureCameraUrl());
          app.toast(message, "warn");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
        });
        const [videoTrack] = stream.getVideoTracks();

        if (localStreamRef.current && videoTrack) {
          localStreamRef.current.getVideoTracks().forEach((track) => {
            track.stop();
            localStreamRef.current?.removeTrack(track);
          });
          localStreamRef.current.addTrack(videoTrack);
          stream.getAudioTracks().forEach((track) => track.stop());
        } else {
          localStreamRef.current = stream;
        }

        setIsCameraOn(true);
        setCameraError("");
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === "NotAllowedError"
            ? "Camera permission was blocked. Allow camera access in your browser, then try again."
            : "Camera could not start. Check that no other app is using it, then try again.";
        setCameraError(message);
        setSecureUrl(secureCameraUrl());
        app.toast(message, "warn");
      }
    }
  };

  const toggleMic = async () => {
    if (!canUseMic) {
      app.toast("Student microphones are disabled for this class", "warn");
      return;
    }
    if (isMicOn) {
      localStreamRef.current?.getAudioTracks().forEach((track) => {
        track.stop();
        localStreamRef.current?.removeTrack(track);
      });
      setIsMicOn(false);
      setMicError("");
    } else {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          const message = mediaUnavailableMessage("Microphone");
          setMicError(message);
          app.toast(message, "warn");
          return;
        }

        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        if (localStreamRef.current) {
          stream.getAudioTracks().forEach((track) => localStreamRef.current!.addTrack(track));
        } else {
          localStreamRef.current = stream;
        }
        setIsMicOn(true);
        setMicError("");
      } catch (err) {
        const message =
          err instanceof DOMException && err.name === "NotAllowedError"
            ? "Microphone permission was blocked. Allow microphone access in your browser, then try again."
            : "Microphone could not start. Check that no other app is using it, then try again.";
        setMicError(message);
        app.toast(message, "warn");
      }
    }
  };

  const toggleScreenShare = async () => {
    if (!isInstructor || !liveClass.allowScreenShare) {
      app.toast("Screen sharing is available to the instructor only", "warn");
      return;
    }
    if (isScreenSharing) {
      screenStreamRef.current?.getTracks().forEach((track) => track.stop());
      screenStreamRef.current = null;
      setIsScreenSharing(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        screenStreamRef.current = stream;
        if (screenRef.current) {
          screenRef.current.srcObject = stream;
        }
        setIsScreenSharing(true);
        stream.getVideoTracks()[0].onended = () => {
          setIsScreenSharing(false);
          screenStreamRef.current = null;
        };
      } catch (err) {
        app.toast("Screen sharing permission denied", "warn");
      }
    }
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    app.sendClassMessage(classId, newMessage);
    setNewMessage("");
    const updatedMessages = app.db.classMessages[classId] || [];
    setMessages(updatedMessages);
  };

  const handleJoin = () => {
    app.joinLiveClass(classId);
    setIsJoined(true);
  };

  const handleLeave = () => {
    app.leaveLiveClass(classId);
    localStreamRef.current?.getTracks().forEach((track) => track.stop());
    screenStreamRef.current?.getTracks().forEach((track) => track.stop());
    setIsCameraOn(false);
    setIsMicOn(false);
    setIsScreenSharing(false);
    app.nav({ name: "liveclasses" });
  };

  // Waiting room
  if (!isLive && !isInstructor) {
    return (
      <div className="card-ink mx-auto max-w-lg bg-card p-8 text-center">
        <Icon name="clock" size={48} className="mx-auto text-gold" />
        <h3 className="mt-4 font-display text-xl font-bold">Class hasn't started yet</h3>
        <p className="mt-2 text-sm text-mute">
          The instructor will start the class soon. Please wait here.
        </p>
        <div className="mt-4 rounded-lg border-1.5 border-line bg-paper/50 p-4">
          <h4 className="font-display text-base font-bold">{liveClass.title}</h4>
          <p className="mt-1 text-[13px] text-mute">{liveClass.description}</p>
          {course && <CourseTag course={course} className="mt-2" />}
        </div>
        <button onClick={() => app.nav({ name: "liveclasses" })} className="btn btn-ghost mt-4">
          Leave waiting room
        </button>
      </div>
    );
  }

  // Not joined yet
  if (!isJoined && !isInstructor) {
    return (
      <div className="card-ink mx-auto max-w-lg bg-card p-8 text-center">
        <h3 className="font-display text-xl font-bold">{liveClass.title}</h3>
        <p className="mt-2 text-sm text-mute">{liveClass.description}</p>
        {course && <CourseTag course={course} className="mt-3" />}
        <button onClick={handleJoin} className="btn btn-primary mt-6">
          <Icon name="play" size={14} /> Join Class
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-xl border-1.5 border-line bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between border-b-1.5 border-line bg-card px-4 py-3">
        <div className="flex items-center gap-3">
          {isLive && (
            <span className="flex items-center gap-1 rounded-full bg-danger px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-white">
              <span className="dot-live h-1.5 w-1.5 rounded-full bg-white" />
              Live
            </span>
          )}
          <h2 className="font-display text-base font-bold tracking-tight">{liveClass.title}</h2>
          {course && <CourseTag course={course} />}
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-mute sm:flex">
            <Icon name="users" size={13} /> {activeAttendees.length} in room
          </span>
          <button onClick={handleLeave} className="btn btn-ghost btn-sm">
            <Icon name="logout" size={13} /> Leave
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-b-1.5 border-line bg-paper/60 px-4 py-2.5 text-[11px] text-mute">
        <span className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", isLive ? "bg-se" : "bg-gold")} />
          {isInstructor ? "You are teaching this session" : `Live with ${instructor?.name || "your instructor"}`}
        </span>
        <span className="font-mono uppercase tracking-wider">
          {isInstructor ? "Stage + screen share enabled" : "Watch the instructor stage and use chat to ask questions"}
        </span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Video area */}
        <div className="flex min-w-0 flex-1 flex-col bg-ink">
          <div className="relative flex-1">
            {/* Screen share */}
            {isScreenSharing && (
              <video
                ref={screenRef}
                autoPlay
                playsInline
                className="h-full w-full object-contain"
              />
            )}
            {isScreenSharing && (
              <div className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-ink/80 px-3 py-1.5 text-xs text-paper">
                <span className="h-2 w-2 rounded-full bg-brand" />
                {isInstructor ? "You are presenting" : "Instructor is presenting"}
              </div>
            )}
            {/* Camera */}
            {!isScreenSharing && (
              <div className="flex h-full items-center justify-center">
                {isCameraOn ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="h-full w-full scale-x-[-1] object-cover"
                  />
                ) : (
                  <div className="text-center text-paper/60">
                    <Icon name="video" size={64} className="mx-auto opacity-40" />
                    <p className="mt-2 text-sm">Camera is off</p>
                    {cameraError && (
                      <div className="mx-auto mt-2 max-w-sm space-y-3">
                        <p className="text-xs leading-relaxed text-paper/75">{cameraError}</p>
                        {secureUrl && (
                          <a className="btn btn-primary btn-sm" href={secureUrl}>
                            <Icon name="key" size={13} /> Open secure site
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            {!isScreenSharing && isInstructor && (
              <div className="absolute bottom-4 left-4 max-w-xs rounded-lg border border-paper/15 bg-ink/80 px-3 py-2 text-xs text-paper/80">
                <div className="font-semibold text-paper">Teaching stage</div>
                <div className="mt-0.5">Turn on your camera or share your screen to start the lesson.</div>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-3 border-t-1.5 border-paper/10 bg-ink2 px-4 py-3">
            <button
              onClick={toggleMic}
              disabled={!canUseMic}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                isMicOn ? "bg-paper/10 text-paper hover:bg-paper/20" : "bg-danger text-white hover:bg-danger/90"
              )}
              title={!canUseMic ? "Microphone disabled by instructor" : isMicOn ? "Mute" : "Unmute"}
            >
              <Icon name={isMicOn ? "volume" : "volumeOff"} size={18} />
            </button>
            <button
              onClick={toggleCamera}
              disabled={!canUseCamera}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                isCameraOn ? "bg-paper/10 text-paper hover:bg-paper/20" : "bg-danger text-white hover:bg-danger/90"
              )}
              title={!canUseCamera ? "Camera disabled by instructor" : isCameraOn ? "Turn off camera" : "Turn on camera"}
            >
              <Icon name={isCameraOn ? "video" : "videoOff"} size={18} />
            </button>
            {isInstructor && (
              <button
                onClick={toggleScreenShare}
                disabled={!liveClass.allowScreenShare}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-full px-4 transition-colors",
                  isScreenSharing ? "bg-brand text-white hover:bg-brand/90" : "bg-paper/10 text-paper hover:bg-paper/20"
                )}
                title={isScreenSharing ? "Stop sharing" : "Share screen"}
              >
                <Icon name="screen" size={18} />
                <span className="text-sm font-medium">{isScreenSharing ? "Sharing" : "Share Screen"}</span>
              </button>
            )}
            <button
              onClick={() => setHasRaisedHand(!hasRaisedHand)}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                hasRaisedHand ? "bg-gold text-ink hover:bg-gold/90" : "bg-paper/10 text-paper hover:bg-paper/20"
              )}
              title={hasRaisedHand ? "Lower hand" : "Raise hand"}
            >
              <span className="text-lg">✋</span>
            </button>
            {isInstructor && isLive && (
              <button
                onClick={() => app.endLiveClass(classId)}
                className="flex h-10 items-center gap-2 rounded-full bg-danger px-4 text-white hover:bg-danger/90"
              >
                <Icon name="stop" size={18} />
                <span className="text-sm font-medium">End Class</span>
              </button>
            )}
            {isInstructor && !isLive && (
              <button
                onClick={() => app.startLiveClass(classId)}
                className="flex h-10 items-center gap-2 rounded-full bg-se px-4 text-white hover:bg-se/90"
              >
                <Icon name="play" size={18} />
                <span className="text-sm font-medium">Start Class</span>
              </button>
            )}
          </div>
          {(cameraError || micError) && (
            <div className="border-t border-paper/10 bg-danger/10 px-4 py-2 text-center text-xs text-paper/85">
              {cameraError || micError}
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        <div className="flex w-80 shrink-0 flex-col border-l-1.5 border-line bg-card">
          <div className="border-b-1.5 border-line px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display text-sm font-bold">Classroom</h3>
              <span className="font-mono text-[10px] uppercase tracking-wider text-mute">{activeAttendees.length} online</span>
            </div>
            <div className="mt-3 space-y-2">
              {activeAttendees.slice(0, 4).map((entry) => {
                const participant = app.getUser(entry.userId);
                if (!participant) return null;
                return (
                  <div key={entry.userId} className="flex items-center gap-2 text-xs">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand/15 font-semibold text-brand">
                      {participant.name.slice(0, 1).toUpperCase()}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{participant.name}</span>
                    {entry.userId === liveClass.instructorId && <span className="text-[10px] text-mute">HOST</span>}
                  </div>
                );
              })}
              {activeAttendees.length === 0 && <p className="text-xs text-mute">No one else has joined yet.</p>}
            </div>
          </div>
          {liveClass.allowStudentChat && <>
            <div className="border-b-1.5 border-line px-4 py-3">
              <h3 className="font-display text-sm font-bold">Chat</h3>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-3">
                {messages.map((msg) => {
                  const sender = msg.isSystem ? null : app.getUser(msg.userId);
                  return (
                    <div key={msg.id} className={cn("text-sm", msg.isSystem && "text-center text-xs text-mute italic")}>
                      {!msg.isSystem && sender && (
                        <div className="font-semibold">{sender.name}</div>
                      )}
                      <div className={msg.isSystem ? "" : "text-mute"}>{msg.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="border-t-1.5 border-line p-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                  placeholder="Type a message..."
                  className="inp flex-1 text-sm"
                />
                <button onClick={sendMessage} className="btn btn-primary btn-sm">
                  <Icon name="send" size={14} />
                </button>
              </div>
            </div>
          </>}
        </div>
      </div>
    </div>
  );
}
