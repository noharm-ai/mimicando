import React from 'react'

export const T = {
  gradFrom: '#10bcd7',
  gradTo:   '#57bf95',
  grad:     'linear-gradient(135deg, #10bcd7 0%, #3fc0b0 45%, #57bf95 100%)',
  gradSoft: 'linear-gradient(135deg, #e7fbfb 0%, #eafaf1 100%)',

  navy:   '#2e3c5a',
  navy2:  '#3a4a6d',
  teal:   '#10bcd7',
  sage:   '#57bf95',

  ink:    '#243049',
  text:   '#5b6478',
  muted:  '#9aa1b1',
  edge:   '#e7ebf1',
  line:   '#eef1f5',
  page:   '#f4f6f9',
  paper:  '#ffffff',

  ok:      '#34c759',
  okDeep:  '#1ea34a',
  skip:    '#ff7a3d',
  skipDeep:'#e85f23',
  gold:    '#ffc83d',

  teams: [
    { id: 'teal',  name: 'Time Ciano',  c1: '#10bcd7', c2: '#27a8d4', emoji: '🐬' },
    { id: 'green', name: 'Time Verde',  c1: '#57bf95', c2: '#3da876', emoji: '🐢' },
    { id: 'coral', name: 'Time Coral',  c1: '#ff7a3d', c2: '#f4603b', emoji: '🦊' },
    { id: 'gold',  name: 'Time Ouro',   c1: '#ffc83d', c2: '#f5ab1f', emoji: '🦁' },
    { id: 'navy',  name: 'Time Azul',   c1: '#5d7bd6', c2: '#3a4a6d', emoji: '🐳' },
    { id: 'pink',  name: 'Time Rosa',   c1: '#f57db0', c2: '#e85b97', emoji: '🦩' },
  ],

  shadow:   '0 10px 30px rgba(46,60,90,0.10)',
  shadowSm: '0 4px 14px rgba(46,60,90,0.08)',
  shadowLg: '0 24px 60px rgba(46,60,90,0.18)',
}

// ── Phone frame ───────────────────────────────────────────────────
export function Phone({ children, statusDark = false, statusTint = 'transparent' }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 46, position: 'relative',
      background: T.paper, boxShadow: T.shadowLg,
      border: '10px solid #11151f', overflow: 'hidden',
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, width: 370, height: 824, overflow: 'hidden' }}>
        {children}
      </div>
      <StatusBar dark={statusDark} tint={statusTint} />
    </div>
  )
}

export function StatusBar({ dark = false, tint = 'transparent' }) {
  const fg = dark ? '#ffffff' : T.navy
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 40,
      height: 50, padding: '0 28px 0 32px', background: tint,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: 'var(--display)', pointerEvents: 'none',
    }}>
      <span style={{ fontSize: 15, fontWeight: 600, color: fg, letterSpacing: '.2px' }}>20:24</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
        <svg width="18" height="12" viewBox="0 0 18 12" fill={fg}>
          <rect x="0" y="8" width="3" height="4" rx="1"/>
          <rect x="5" y="5" width="3" height="7" rx="1"/>
          <rect x="10" y="2.5" width="3" height="9.5" rx="1"/>
          <rect x="15" y="0" width="3" height="12" rx="1"/>
        </svg>
        <svg width="17" height="12" viewBox="0 0 17 12" fill={fg}>
          <path d="M8.5 2.2c2.7 0 5.1 1 6.9 2.7l-1.4 1.5A8 8 0 0 0 8.5 4.2 8 8 0 0 0 3 6.4L1.6 4.9A9.8 9.8 0 0 1 8.5 2.2Zm0 3.6c1.7 0 3.2.6 4.3 1.7l-1.5 1.5A4 4 0 0 0 8.5 9.4a4 4 0 0 0-2.8 1.1L4.2 9A6.1 6.1 0 0 1 8.5 5.8Zm0 3.5 1.6 1.6-1.6 1.6L6.9 11l1.6-1.7Z"/>
        </svg>
        <svg width="26" height="13" viewBox="0 0 26 13" fill="none">
          <rect x="0.5" y="0.5" width="22" height="12" rx="3.2" stroke={fg} opacity="0.45"/>
          <rect x="2.5" y="2.5" width="16" height="8" rx="1.8" fill={fg}/>
          <rect x="24" y="4" width="2" height="5" rx="1" fill={fg} opacity="0.45"/>
        </svg>
      </div>
    </div>
  )
}

// ── Buttons ───────────────────────────────────────────────────────
export function Btn({ children, onClick, variant = 'primary', size = 'lg', style = {}, disabled, full }) {
  const [press, setPress] = React.useState(false)
  const sizes = {
    lg: { padding: '18px 26px', fontSize: 20, radius: 20 },
    md: { padding: '14px 22px', fontSize: 17, radius: 16 },
    sm: { padding: '10px 16px', fontSize: 14, radius: 13 },
  }[size]
  const variants = {
    primary: { background: T.grad, color: '#fff', boxShadow: '0 10px 22px rgba(16,188,215,0.34)' },
    dark:    { background: T.navy, color: '#fff', boxShadow: '0 10px 22px rgba(46,60,90,0.28)' },
    white:   { background: '#fff', color: T.navy, boxShadow: T.shadowSm, border: `2px solid ${T.edge}` },
    ghost:   { background: 'rgba(255,255,255,0.16)', color: '#fff', border: '2px solid rgba(255,255,255,0.4)' },
    ok:      { background: `linear-gradient(135deg, #41d066, ${T.okDeep})`, color: '#fff', boxShadow: '0 12px 26px rgba(52,199,89,0.36)' },
    skip:    { background: `linear-gradient(135deg, #ff9255, ${T.skipDeep})`, color: '#fff', boxShadow: '0 12px 26px rgba(255,122,61,0.32)' },
  }[variant]
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      style={{
        ...variants, ...sizes,
        fontFamily: 'var(--display)', fontWeight: 600, letterSpacing: '.2px',
        whiteSpace: 'nowrap',
        width: full ? '100%' : undefined,
        borderRadius: sizes.radius,
        opacity: disabled ? 0.45 : 1,
        transform: press && !disabled ? 'scale(0.965)' : 'scale(1)',
        transition: 'transform .12s ease, box-shadow .2s ease, opacity .2s',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 10,
        ...style,
      }}
    >{children}</button>
  )
}

export function IconBtn({ children, onClick, style = {}, light }) {
  const [press, setPress] = React.useState(false)
  return (
    <button onClick={onClick}
      onPointerDown={() => setPress(true)} onPointerUp={() => setPress(false)} onPointerLeave={() => setPress(false)}
      style={{
        width: 46, height: 46, borderRadius: 15, display: 'grid', placeItems: 'center',
        background: light ? 'rgba(255,255,255,0.2)' : '#fff',
        color: light ? '#fff' : T.navy,
        border: light ? '2px solid rgba(255,255,255,0.34)' : `2px solid ${T.edge}`,
        boxShadow: light ? 'none' : T.shadowSm,
        transform: press ? 'scale(0.92)' : 'scale(1)', transition: 'transform .12s',
        ...style,
      }}>{children}</button>
  )
}

export function Eyebrow({ children, color = T.teal }) {
  return (
    <div style={{
      fontFamily: 'var(--display)', fontWeight: 600, fontSize: 13, letterSpacing: '2px',
      textTransform: 'uppercase', color,
    }}>{children}</div>
  )
}
