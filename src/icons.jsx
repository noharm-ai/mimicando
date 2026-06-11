export function Icon({ name, size = 24, color = 'currentColor', stroke = 2.2 }) {
  const p = { fill: 'none', stroke: color, strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const paths = {
    play:    <path d="M7 5l12 7-12 7V5z" fill={color} stroke="none" />,
    back:    <path d="M15 5l-7 7 7 7" {...p} />,
    close:   <path d="M6 6l12 12M18 6L6 18" {...p} />,
    check:   <path d="M5 13l4 4 10-11" {...p} />,
    plus:    <path d="M12 5v14M5 12h14" {...p} />,
    minus:   <path d="M5 12h14" {...p} />,
    gear:    <g {...p}><circle cx="12" cy="12" r="3.2"/><path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4 5.6 5.6"/></g>,
    info:    <g {...p}><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 7.6v.2"/></g>,
    clock:   <g {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></g>,
    trophy:  <g {...p}><path d="M7 4h10v4a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3M9.5 14.5 9 19h6l-.5-4.5M8 21h8"/></g>,
    users:   <g {...p}><circle cx="9" cy="8" r="3.2"/><path d="M3.5 19a5.5 5.5 0 0 1 11 0M16 6.2a3 3 0 0 1 0 5.6M17 14.4a5.5 5.5 0 0 1 3.5 5"/></g>,
    grid:    <g {...p}><rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/></g>,
    skipfwd: <g {...p}><path d="M5 5l9 7-9 7V5z" fill={color} stroke="none"/><path d="M19 5v14"/></g>,
    pause:   <g {...p}><rect x="7" y="5" width="3.5" height="14" rx="1.4" fill={color} stroke="none"/><rect x="13.5" y="5" width="3.5" height="14" rx="1.4" fill={color} stroke="none"/></g>,
    masks:   <g {...p}><path d="M3 6c3-1 5-1 5 3s-2 6-4 6-2-3-2-5"/><path d="M21 6c-3-1-5-1-5 3s2 6 4 6 2-3 2-5"/></g>,
    pencil:  <path d="M4 20l1-4L16 5l3 3L8 19l-4 1ZM14 7l3 3" {...p} />,
    speech:  <path d="M4 5h16v11H9l-4 4v-4H4V5Z" {...p} />,
    bolt:    <path d="M13 3 5 13h5l-1 8 8-10h-5l1-8Z" {...p} />,
    fire:    <path d="M12 3c1 3-1 4-1 6a3 3 0 0 0 6 0c0-1.5-1-2.5-1-3 2 1 4 3.5 4 7a7 7 0 0 1-14 0c0-4 3-6 6-10Z" {...p} />,
    star:    <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.6l1-5.8L3.5 9.7l5.9-.9L12 3.5Z" fill={color} stroke="none" />,
    arrowR:  <path d="M5 12h14M13 6l6 6-6 6" {...p} />,
    refresh: <g {...p}><path d="M20 11a8 8 0 0 0-14-4.5L4 9M4 4v5h5"/><path d="M4 13a8 8 0 0 0 14 4.5L20 15M20 20v-5h-5"/></g>,
    crown:   <path d="M4 8l3.5 3L12 5l4.5 6L20 8l-1.5 10h-13L4 8Z" {...p} />,
    home:    <path d="M4 11l8-7 8 7M6 9.5V20h12V9.5" {...p} />,
    eye:     <g {...p}><path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.6"/></g>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>
}
