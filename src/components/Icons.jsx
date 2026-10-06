const baseProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
};

export function LogoMark(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="7.2" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="2.1" fill="currentColor" />
    </svg>
  );
}

export function IconCamera(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 8.5A2.5 2.5 0 0 1 6.5 6h1.2a1 1 0 0 0 .83-.45l.94-1.4A1 1 0 0 1 10.3 3.7h3.4a1 1 0 0 1 .83.45l.94 1.4a1 1 0 0 0 .83.45h1.2A2.5 2.5 0 0 1 20 8.5v8A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5z" />
      <circle cx="12" cy="12.3" r="3.2" />
    </svg>
  );
}

export function IconAlert(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20.2h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
      <path d="M12 9v4.5" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m4.5 12.5 5 5 10-11" />
    </svg>
  );
}

export function IconX(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}

export function IconArrowLeft(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

export function IconEye(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconActivity(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M3 12h4l2.5-6.5 4 13L16.5 12H21" />
    </svg>
  );
}

export function IconLock(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="4.5" y="10.5" width="15" height="9.5" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </svg>
  );
}

export function IconFlag(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 21V4.5" />
      <path d="M5 5h11.5l-2 3.5 2 3.5H5" />
    </svg>
  );
}

export function IconMapPin(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  );
}

export function IconUser(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </svg>
  );
}

export function IconClock(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 1.8" />
    </svg>
  );
}

export function IconRadio(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="2" />
      <path d="M7.8 16.2a6 6 0 0 1 0-8.4M16.2 7.8a6 6 0 0 1 0 8.4" />
      <path d="M4.9 19.1a10 10 0 0 1 0-14.2M19.1 4.9a10 10 0 0 1 0 14.2" />
    </svg>
  );
}

export function IconScan(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 8.5V6a2 2 0 0 1 2-2h2.5M15.5 4H18a2 2 0 0 1 2 2v2.5M20 15.5V18a2 2 0 0 1-2 2h-2.5M8.5 20H6a2 2 0 0 1-2-2v-2.5" />
      <path d="M4 12h16" />
    </svg>
  );
}

export function IconFile(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M6.5 3.5h7l4.5 4.5v11a2 2 0 0 1-2 2h-9.5a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2Z" />
      <path d="M13.5 3.5V8H18" />
      <path d="M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  );
}

export function IconChevron(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

export function IconArrowRight(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function IconHome(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M4 11.2 12 4l8 7.2V19a1.5 1.5 0 0 1-1.5 1.5H15V15H9v5.5H5.5A1.5 1.5 0 0 1 4 19Z" />
    </svg>
  );
}

export function IconClipboard(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="5" y="5.5" width="14" height="15" rx="2" />
      <path d="M9 5.5a1.5 1.5 0 0 1 1.5-1.5h3A1.5 1.5 0 0 1 15 5.5V7H9Z" />
      <path d="M8.5 11h7M8.5 14.5h5" />
    </svg>
  );
}

export function IconShield(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M12 3.5 19 6v5.5c0 4.4-2.9 7.4-7 9-4.1-1.6-7-4.6-7-9V6Z" />
      <path d="m9 11.8 2.2 2.2 4-4.3" />
    </svg>
  );
}

export function IconGear(props) {
  return (
    <svg {...baseProps} {...props}>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" />
    </svg>
  );
}

export function IconBattery(props) {
  return (
    <svg {...baseProps} {...props}>
      <rect x="3" y="8" width="16" height="8" rx="2" />
      <path d="M21 10.5v3" />
      <path d="M5.8 10.5h4.4v3H5.8z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function IconPause(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M9 5.5v13M15 5.5v13" />
    </svg>
  );
}

export function IconPlay(props) {
  return (
    <svg {...baseProps} {...props}>
      <path d="M7.5 5.2v13.6L18.5 12Z" />
    </svg>
  );
}
