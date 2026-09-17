import type { ReactNode, SVGProps } from "react";

// Hand-drawn 24×24 stroke icon set. All icons inherit currentColor.

const P: Record<string, ReactNode> = {
  logo: (
    <>
      <path d="M12 2.6l8.1 4.6v9.6L12 21.4l-8.1-4.6V7.2z" />
      <circle cx="12" cy="12" r="3.1" fill="currentColor" stroke="none" />
      <path d="M12 2.6v6.3M20.1 16.8l-5.4-3M3.9 16.8l5.4-3" />
    </>
  ),
  dashboard: (
    <>
      <rect x="3.5" y="3.5" width="7" height="9" rx="1.2" />
      <rect x="13.5" y="3.5" width="7" height="5" rx="1.2" />
      <rect x="13.5" y="11.5" width="7" height="9" rx="1.2" />
      <rect x="3.5" y="15.5" width="7" height="5" rx="1.2" />
    </>
  ),
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15.5H6.5A2.5 2.5 0 0 0 4 21z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H20" />
      <path d="M8.5 7.5h7M8.5 11h5" />
    </>
  ),
  wrench: (
    <>
      <path d="M14.5 6.5a4 4 0 0 0-5.4 4.8L3.5 17a2 2 0 1 0 2.8 2.8l5.7-5.6a4 4 0 0 0 4.8-5.4L14 11.5 11.8 9.3z" />
    </>
  ),
  clipboard: (
    <>
      <rect x="5" y="4.5" width="14" height="17" rx="1.5" />
      <path d="M9 4.5V3h6v1.5" />
      <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4" />
    </>
  ),
  cube: (
    <>
      <path d="M12 2.8l8 4.4v9.6l-8 4.4-8-4.4V7.2z" />
      <path d="M12 12l8-4.6M12 12L4 7.4M12 12v9.2" />
    </>
  ),
  zap: <path d="M13 2.5L5 13.5h5.5L11 21.5l8-11h-5.5z" />,
  map: (
    <>
      <path d="M9 4L3.5 6v14L9 18l6 2 5.5-2V4L15 6z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20.5c1.3-3.4 4-5 7.5-5s6.2 1.6 7.5 5" />
    </>
  ),
  bell: (
    <>
      <path d="M6 16v-5.5a6 6 0 1 1 12 0V16l1.8 2.6H4.2z" />
      <path d="M10 21a2.2 2.2 0 0 0 4 0" />
    </>
  ),
  logout: (
    <>
      <path d="M14 4H6.5A1.5 1.5 0 0 0 5 5.5v13A1.5 1.5 0 0 0 6.5 20H14" />
      <path d="M10 12h10.5M17 8.5l3.5 3.5-3.5 3.5" />
    </>
  ),
  check: <path d="M4.5 12.5l5 5L19.5 7" />,
  circle: <circle cx="12" cy="12" r="8.2" />,
  arrowR: <path d="M4 12h16M13.5 5.5L20 12l-6.5 6.5" />,
  arrowL: <path d="M20 12H4M10.5 5.5L4 12l6.5 6.5" />,
  play: <path d="M7.5 4.5l12 7.5-12 7.5z" />,
  video: (
    <>
      <rect x="3.5" y="6.5" width="12.5" height="11" rx="2" />
      <path d="M16 10l4.5-2.5v9L16 14z" />
      <path d="M7.5 10.5h4" />
    </>
  ),
  chevD: <path d="M5 9l7 7 7-7" />,
  chevR: <path d="M9 5l7 7-7 7" />,
  plus: <path d="M12 4.5v15M4.5 12h15" />,
  edit: (
    <>
      <path d="M4 20h4.5L20 8.5a2.1 2.1 0 0 0-3-3L5.5 17z" />
      <path d="M14.5 8l1.5 1.5" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 6.5h15M9.5 6V4.5h5V6M6.5 6.5l1 13h9l1-13" />
      <path d="M10 10.5v5.5M14 10.5v5.5" />
    </>
  ),
  x: <path d="M5.5 5.5l13 13M18.5 5.5l-13 13" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 7.5V12l3.2 2.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8.2" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" stroke="none" />
    </>
  ),
  cpu: (
    <>
      <rect x="6" y="6" width="12" height="12" rx="1.5" />
      <rect x="9.5" y="9.5" width="5" height="5" />
      <path d="M9 2.8v3.2M15 2.8v3.2M9 18v3.2M15 18v3.2M2.8 9H6M2.8 15H6M18 9h3.2M18 15h3.2" />
    </>
  ),
  code: <path d="M8 6.5L2.5 12 8 17.5M16 6.5l5.5 5.5L16 17.5M13.5 4.5l-3 15" />,
  bulb: (
    <>
      <path d="M12 2.8a6.2 6.2 0 0 1 3.7 11.2c-.8.6-1.2 1.3-1.2 2.2H9.5c0-.9-.4-1.6-1.2-2.2A6.2 6.2 0 0 1 12 2.8z" />
      <path d="M9.5 19.5h5M10.3 22h3.4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 4v16h16" />
      <path d="M8 16v-5M12.5 16V7.5M17 16v-3.5" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M2.8 20c1-3 3.3-4.5 6.2-4.5s5.2 1.5 6.2 4.5" />
      <path d="M15.5 5.8a3.2 3.2 0 0 1 0 5.4M17.8 15.9c1.7.7 3 2 3.6 4.1" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="5.5" />
      <path d="M8.8 13.5L7 21.2l5-2.6 5 2.6-1.8-7.7" />
    </>
  ),
  doc: (
    <>
      <path d="M6 3.5h8l4 4v13H6z" />
      <path d="M14 3.5v4h4M9 12h6M9 15.5h6M9 8.5h2" />
    </>
  ),
  link: (
    <>
      <path d="M10 14a4.2 4.2 0 0 0 6 0l3-3a4.24 4.24 0 0 0-6-6l-1.5 1.5" />
      <path d="M14 10a4.2 4.2 0 0 0-6 0l-3 3a4.24 4.24 0 0 0 6 6l1.5-1.5" />
    </>
  ),
  send: <path d="M21 3.5L3 10.8l6.8 2.4L12.2 20z M21 3.5l-11.2 9.7" />,
  eye: (
    <>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12z" />
      <circle cx="12" cy="12" r="2.8" />
    </>
  ),
  eyeOff: (
    <>
      <path d="M17.9 17.9A10.1 10.1 0 0 1 12 19.5c-6 0-9.5-7.5-9.5-7.5a15.2 15.2 0 0 1 3.4-4.3M9.9 5.3A10 10 0 0 1 12 4.5c6 0 9.5 7.5 9.5 7.5a15.2 15.2 0 0 1-2.3 3.1" />
      <path d="M3 3l18 18" />
    </>
  ),
  refresh: (
    <>
      <path d="M4 12a8 8 0 0 1 14-5.2L20.5 9M20 12a8 8 0 0 1-14 5.2L3.5 15" />
      <path d="M20.5 4.5V9H16M3.5 19.5V15H8" />
    </>
  ),
  menu: <path d="M4 6.5h16M4 12h16M4 17.5h16" />,
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.2" />
      <path d="M15.2 15.2L21 21" />
    </>
  ),
  star: <path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.3 1.1 6-5.4-3-5.4 3 1.1-6L3.2 9.6l6.1-.8z" />,
  flag: <path d="M5.5 21V4.2c4.5-2.4 8.5 2.2 13 0v10.6c-4.5 2.2-8.5-2.4-13 0" />,
  layers: (
    <>
      <path d="M12 3.2l8.5 4.6L12 12.4 3.5 7.8z" />
      <path d="M3.5 12.2l8.5 4.6 8.5-4.6M3.5 16.6l8.5 4.6 8.5-4.6" />
    </>
  ),
  grad: (
    <>
      <path d="M2.5 8.5L12 4l9.5 4.5L12 13z" />
      <path d="M6.5 10.7v4.8c0 1.4 2.5 2.7 5.5 2.7s5.5-1.3 5.5-2.7v-4.8" />
      <path d="M21.5 8.5v5.5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 2.8l7.5 2.8v6c0 5-3.2 8.2-7.5 9.6-4.3-1.4-7.5-4.6-7.5-9.6v-6z" />
      <path d="M8.8 11.8l2.3 2.3 4.2-4.5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M18.7 5.3l-2.1 2.1M7.4 16.6l-2.1 2.1" />
    </>
  ),
  scroll: (
    <>
      <path d="M6 4.5h12.5v3H16" />
      <path d="M6 4.5A2 2 0 0 0 4 6.5v0a2 2 0 0 0 2 2h10v9a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-2h-4" />
      <path d="M8 12h5M8 15h5" />
    </>
  ),
  message: (
    <>
      <path d="M3.5 5.5h17v11H10l-4.5 3.8V16.5h-2z" />
      <path d="M7.5 9.5h9M7.5 12.5h5.5" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5l-2.2 5-5 2.2 2.2-5z" />
    </>
  ),
  home: (
    <>
      <path d="M4 11l8-7 8 7v9.5h-5.5V15h-5v5.5H4z" />
    </>
  ),
  robot: (
    <>
      <rect x="5" y="8" width="14" height="10" rx="2" />
      <path d="M12 8V4.8M12 4.8a1.3 1.3 0 1 0-.01 0zM2.8 12.5h2.2M19 12.5h2.2M9.5 18v2M14.5 18v2" />
      <circle cx="9.2" cy="12.4" r="1" fill="currentColor" stroke="none" />
      <circle cx="14.8" cy="12.4" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3v4.5M12 16.5V21M3 12h4.5M16.5 12H21M6 6l2.8 2.8M15.2 15.2L18 18M18 6l-2.8 2.8M8.8 15.2L6 18" />
    </>
  ),
  filter: <path d="M4 5.5h16l-6.2 7.2v5.5L10.2 20v-7.3z" />,
  download: <path d="M12 4v11M7.5 11l4.5 4.5L16.5 11M5 20h14" />,
  key: (
    <>
      <circle cx="8" cy="14.5" r="4.2" />
      <path d="M11.2 11.3L20 2.5M16 6.5l2.8 2.8M13.5 9l2 2" />
    </>
  ),
};

export type IconName = keyof typeof P;

export function Icon({
  name,
  size = 20,
  sw = 1.8,
  className,
  ...rest
}: { name: IconName; size?: number; sw?: number; className?: string } & SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {P[name]}
    </svg>
  );
}
