import React from 'react'
import { T, Btn, IconBtn, Eyebrow } from '../theme.jsx'
import { Icon } from '../icons.jsx'
import { MODES } from '../data.js'
import { Body } from './Setup.jsx'

// ── GAMEPLAY ──────────────────────────────────────────────────────
export function Play({ go, state, finishRound }) {
  const team = state.teams[state.turn % state.teams.length]
  const mode = MODES.find(m => m.id === state.mode)
  const deckRef = React.useRef(state.deck)
  const [idx, setIdx] = React.useState(0)
  const [results, setResults] = React.useState([])
  const [time, setTime] = React.useState(state.roundTime)
  const [paused, setPaused] = React.useState(false)
  const [flash, setFlash] = React.useState(null)

  React.useEffect(() => {
    if (paused) return
    if (time <= 0) { finishRound(team, results); return }
    const id = setTimeout(() => setTime(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [time, paused])

  const word = deckRef.current[idx % deckRef.current.length]
  const score = results.filter(r => r.got).length - (state.penalty ? results.filter(r => !r.got).length : 0)

  const advance = (got) => {
    setFlash(got ? 'ok' : 'skip')
    setTimeout(() => setFlash(null), 260)
    setResults(r => [...r, { word, got }])
    setIdx(i => i + 1)
  }

  const pct = time / state.roundTime
  const ringColor = pct > 0.5 ? '#fff' : pct > 0.25 ? T.gold : '#ffd5c2'
  const low = time <= 10

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: `linear-gradient(165deg, ${team.c1}, ${team.c2})`, overflow: 'hidden' }}>
      {flash && (
        <div className="anim-in" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 30, pointerEvents: 'none',
          background: flash === 'ok' ? 'rgba(52,199,89,0.32)' : 'rgba(255,122,61,0.30)' }} />
      )}

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        padding: '58px 22px 24px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 40, height: 40, borderRadius: 12, background: 'rgba(255,255,255,0.22)',
              display: 'grid', placeItems: 'center', fontSize: 22 }}>{team.emoji}</div>
            <div style={{ color: '#fff', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 17 }}>
              {team.name}
            </div>
          </div>
          <IconBtn light onClick={() => setPaused(p => !p)}>
            <Icon name={paused ? 'play' : 'pause'} size={20} />
          </IconBtn>
        </div>

        {/* timer ring */}
        <div style={{ display: 'grid', placeItems: 'center', margin: '14px 0 6px' }}>
          <div style={{ position: 'relative', width: 130, height: 130 }}>
            <svg width="130" height="130" viewBox="0 0 130 130" style={{ transform: 'rotate(-90deg)' }}>
              <circle cx="65" cy="65" r="58" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="10" />
              <circle cx="65" cy="65" r="58" fill="none" stroke={ringColor} strokeWidth="10"
                strokeLinecap="round" strokeDasharray={2 * Math.PI * 58}
                strokeDashoffset={2 * Math.PI * 58 * (1 - pct)}
                style={{ transition: 'stroke-dashoffset 1s linear, stroke .3s' }} />
            </svg>
            <div className={low ? 'anim-pop' : ''} key={low ? time : 'x'}
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                display: 'grid', placeItems: 'center', flexDirection: 'column' }}>
              <div className="display" style={{ fontSize: 46, fontWeight: 700, color: '#fff', lineHeight: 1 }}>{time}</div>
              <div style={{ fontSize: 11, fontWeight: 800, color: 'rgba(255,255,255,0.8)',
                letterSpacing: '1.5px', textTransform: 'uppercase' }}>segundos</div>
            </div>
          </div>
        </div>

        {/* word card */}
        <div style={{ flex: 1, display: 'grid', placeItems: 'center' }}>
          <div key={idx} className="anim-pop" style={{ width: '100%', background: '#fff',
            borderRadius: 28, padding: '40px 24px', textAlign: 'center', boxShadow: T.shadowLg,
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7,
              background: `${team.c1}14`, color: team.c2, borderRadius: 999, padding: '7px 14px',
              fontFamily: 'var(--display)', fontWeight: 600, fontSize: 13 }}>
              <Icon name={mode.icon} size={16} /> {mode.name}
            </div>
            <div className="display" style={{ fontSize: 44, fontWeight: 700, color: T.navy,
              lineHeight: 1.05, letterSpacing: '-0.5px' }}>{word}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: T.muted }}>Palavra {idx + 1}</div>
          </div>
        </div>

        {/* score pill */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'rgba(255,255,255,0.22)', borderRadius: 999, padding: '8px 18px',
            color: '#fff', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 15,
            whiteSpace: 'nowrap' }}>
            <Icon name="star" size={18} color={T.gold} /> {score} ponto(s) na rodada
          </div>
        </div>

        {/* action buttons */}
        <div style={{ display: 'flex', gap: 14 }}>
          <Btn variant="skip" size="lg" full onClick={() => advance(false)} style={{ padding: '22px 0' }}>
            <Icon name="skipfwd" size={26} color="#fff" /> Passar
          </Btn>
          <Btn variant="ok" size="lg" full onClick={() => advance(true)} style={{ padding: '22px 0' }}>
            <Icon name="check" size={28} color="#fff" stroke={3} /> Acertou
          </Btn>
        </div>
      </div>

      {/* pause overlay */}
      {paused && (
        <div className="anim-in" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 35, background: 'rgba(46,60,90,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 16, padding: 30 }}>
          <div className="display" style={{ color: '#fff', fontSize: 34, fontWeight: 700 }}>Pausado</div>
          <Btn variant="white" size="lg" full onClick={() => setPaused(false)}>
            <Icon name="play" size={22} color={team.c1} /> Continuar
          </Btn>
          <Btn variant="ghost" size="md" full onClick={() => go('teams')}>Sair da partida</Btn>
        </div>
      )}
    </div>
  )
}

// ── ROUND RESULT ──────────────────────────────────────────────────
export function RoundResult({ go, state, nextTurn }) {
  const { team, results, gained } = state.lastRound
  const got = results.filter(r => r.got)
  const skipped = results.filter(r => !r.got)
  const total = state.scores[team.id] || 0
  return (
    <Body bg={T.page}>
      <div style={{ textAlign: 'center', marginBottom: 18 }}>
        <div className="anim-pop" style={{ width: 92, height: 92, borderRadius: '50%',
          margin: '0 auto 14px', background: `linear-gradient(135deg, ${team.c1}, ${team.c2})`,
          display: 'grid', placeItems: 'center', fontSize: 48,
          boxShadow: `0 14px 30px ${team.c1}44` }}>{team.emoji}</div>
        <Eyebrow color={team.c2}>Fim da rodada</Eyebrow>
        <h1 className="display" style={{ fontSize: 34, fontWeight: 700, color: T.navy, margin: '4px 0 0' }}>
          {team.name}
        </h1>
      </div>

      <div style={{ display: 'flex', gap: 12, marginBottom: 18 }}>
        <StatCard label="Acertos"  value={`+${got.length}`} color={T.ok}   icon="check"   />
        <StatCard label="Passou"   value={skipped.length}    color={T.skip} icon="skipfwd" />
        <StatCard label="Total"    value={total}             color={T.teal} icon="trophy"  />
      </div>

      <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: T.shadowSm, flex: 1 }}>
        <div className="display" style={{ fontSize: 15, fontWeight: 600, color: T.muted,
          marginBottom: 10, letterSpacing: '.5px' }}>PALAVRAS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {results.map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 24, height: 24, borderRadius: 8, flexShrink: 0,
                background: r.got ? `${T.ok}1c` : `${T.skip}1c`,
                color: r.got ? T.okDeep : T.skipDeep, display: 'grid', placeItems: 'center' }}>
                <Icon name={r.got ? 'check' : 'close'} size={15} stroke={3} />
              </div>
              <div style={{ fontWeight: 700, fontSize: 16,
                color: r.got ? T.navy : T.muted, textDecoration: r.got ? 'none' : 'line-through' }}>
                {r.word}
              </div>
            </div>
          ))}
          {!results.length && (
            <div style={{ color: T.muted, fontWeight: 700 }}>Nenhuma palavra ainda.</div>
          )}
        </div>
      </div>

      <Btn full variant="primary" style={{ marginTop: 16 }} onClick={nextTurn}>
        Próximo time <Icon name="arrowR" size={22} />
      </Btn>
    </Body>
  )
}

function StatCard({ label, value, color, icon }) {
  return (
    <div style={{ flex: 1, background: '#fff', borderRadius: 18, padding: '14px 10px',
      textAlign: 'center', boxShadow: T.shadowSm }}>
      <div style={{ width: 36, height: 36, borderRadius: 11, margin: '0 auto 8px',
        background: `${color}18`, color, display: 'grid', placeItems: 'center' }}>
        <Icon name={icon} size={20} />
      </div>
      <div className="display" style={{ fontSize: 26, fontWeight: 700, color: T.navy, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, fontWeight: 800, color: T.muted, marginTop: 3 }}>{label}</div>
    </div>
  )
}

// ── WINNER ────────────────────────────────────────────────────────
export function Winner({ go, state, reset }) {
  const ranked = [...state.teams].sort((a, b) => (state.scores[b.id] || 0) - (state.scores[a.id] || 0))
  const champ = ranked[0]
  const confetti = React.useMemo(() => Array.from({ length: 26 }, (_, i) => ({
    left: Math.random() * 100, delay: Math.random() * 1.2, dur: 2 + Math.random() * 1.5,
    color: [T.gold, T.teal, T.sage, T.skip, '#f57db0'][i % 5], size: 8 + Math.random() * 8,
  })), [])

  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: `linear-gradient(165deg, ${champ.c1}, ${champ.c2})`, overflow: 'hidden' }}>
      {confetti.map((c, i) => (
        <div key={i} style={{ position: 'absolute', top: -20, left: `${c.left}%`,
          width: c.size, height: c.size * 1.4, background: c.color, borderRadius: 2,
          animation: `mc-confetti ${c.dur}s linear ${c.delay}s infinite` }} />
      ))}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        padding: '64px 26px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="anim-pop">
          <Icon name="crown" size={56} color={T.gold} />
        </div>
        <Eyebrow color="rgba(255,255,255,0.9)">Campeão</Eyebrow>
        <div className="anim-pop float" style={{ width: 130, height: 130, borderRadius: '50%',
          margin: '14px 0', background: 'rgba(255,255,255,0.24)', display: 'grid',
          placeItems: 'center', fontSize: 66, boxShadow: 'inset 0 0 0 6px rgba(255,255,255,0.3)' }}>
          {champ.emoji}
        </div>
        <h1 className="display anim-up" style={{ color: '#fff', fontSize: 42, fontWeight: 700,
          margin: 0, textAlign: 'center', letterSpacing: '-0.5px' }}>{champ.name}</h1>
        <div className="display anim-up" style={{ color: '#fff', fontSize: 18, fontWeight: 600, opacity: 0.92 }}>
          {state.scores[champ.id] || 0} pontos
        </div>

        <div style={{ alignSelf: 'stretch', background: 'rgba(255,255,255,0.16)', borderRadius: 22,
          padding: 14, margin: '22px 0', display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ranked.map((t, i) => (
            <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '9px 8px',
              borderRadius: 14, background: i === 0 ? 'rgba(255,255,255,0.18)' : 'transparent' }}>
              <div className="display" style={{ width: 26, color: '#fff', fontWeight: 700,
                fontSize: 17, opacity: i === 0 ? 1 : 0.7 }}>{i + 1}</div>
              <div style={{ fontSize: 24 }}>{t.emoji}</div>
              <div style={{ flex: 1, color: '#fff', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 17 }}>{t.name}</div>
              <div className="display" style={{ color: '#fff', fontWeight: 700, fontSize: 19 }}>
                {state.scores[t.id] || 0}
              </div>
            </div>
          ))}
        </div>

        <div style={{ flex: 1 }} />
        <Btn full variant="white" style={{ marginBottom: 12 }} onClick={reset}>
          <Icon name="refresh" size={22} color={champ.c1} /> Jogar de novo
        </Btn>
        <Btn full variant="ghost" onClick={() => go('home')}>
          <Icon name="home" size={20} /> Início
        </Btn>
      </div>
    </div>
  )
}
