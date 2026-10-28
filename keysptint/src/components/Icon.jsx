const paths = {
  settings: <><path d="m9 3-.6 2.2-2 .9-2-.6L2.5 10l1.6 1.6v1L2.5 14l1.9 4.5 2-.6 2 .9L9 21h6l.6-2.2 2-.9 2 .6 1.9-4.5-1.6-1.4v-1l1.6-1.6-1.9-4.5-2 .6-2-.9L15 3H9Z" /><circle cx="12" cy="12" r="3" /></>,
  moon: <path d="M20.8 13.3A9 9 0 0 1 10.7 3.2a9 9 0 1 0 10.1 10.1Z" />,
  volume: <><path d="M11 4 6 8H2v8h4l5 4V4ZM15 8a6 6 0 0 1 0 8M18 4a11 11 0 0 1 0 16" /></>,
  shuffle: <><path d="m3 5 14 14h4m-4-4 4 4-4 4M3 19l5-5m6-6 7-7m-4 0h4v4" /></>,
  phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 5h4M11 19h2" /></>,
  bulb: <><path d="M8 17h8M9 21h6M8 14a7 7 0 1 1 8 0v3H8v-3Z" /></>,
  bolt: <path d="m13 2-9 12h7l-1 8 10-13h-7l1-7Z" fill="currentColor" stroke="none" />,
  keyboard: <><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M6 9h.01M10 9h.01M14 9h.01M18 9h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10" /></>,
  game: <><path d="M7 7h10c3 0 4 5 5 10 .4 3-2 4-4 1l-2-2H8l-2 2c-2 3-4.4 2-4-1 1-5 2-10 5-10Z" /><path d="M7 10v5M4.5 12.5h5M16 11h.01M19 14h.01" /></>,
  book: <path d="M12 5C8 2 4 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-2-1-6-2-10 1v16" />,
  chart: <path d="M4 3v18h18M8 15l4-5 4 3 5-7" />,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
  arrow: <path d="M4 12h16m-6-6 6 6-6 6" />,
  check: <path d="m5 12 4 4L19 6" />,
  letters: <path d="m3 18 4-12 4 12M4.5 14h5M15 6h3a3 3 0 0 1 0 6h-3V6Zm0 6h3a3 3 0 0 1 0 6h-3v-6Z" />,
  words: <path d="M3 5h12M9 5v15M14 10h8M18 10v10" />,
  sentences: <path d="M4 6h16M4 12h12M4 18h7" />,
  paragraphs: <><rect x="4" y="2" width="16" height="20" rx="2" /><path d="M8 7h8M8 12h8M8 17h5" /></>,
  timer: <><circle cx="12" cy="14" r="8" /><path d="M12 10v5l3 2M9 2h6M12 2v4M18 6l2-2" /></>,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  eye: <><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>,
  search: <><circle cx="10" cy="10" r="7" /><path d="m15 15 6 6" /></>,
  trophy: <path d="M8 3h8v7a4 4 0 0 1-8 0V3ZM8 5H3v3a5 5 0 0 0 5 5m8-8h5v3a5 5 0 0 1-5 5M12 14v7M7 21h10" />,
  refresh: <path d="M20 7a9 9 0 1 0 1 8M20 2v6h-6" />,
}
export default function Icon({ name, className = 'h-5 w-5' }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">{paths[name] || paths.bolt}</svg>
}
