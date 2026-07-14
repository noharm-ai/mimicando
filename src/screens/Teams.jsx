import React from 'react'
import { T, Btn, IconBtn, Eyebrow } from '../theme.jsx'
import { Icon } from '../icons.jsx'
import { MODES } from '../data.js'
import { Body, TopBar } from './Setup.jsx'

// ── TEAMS ─────────────────────────────────────────────────────────
export function Teams({ go, state, set }) {
  const teams = state.teams
  const addTeam = () => {
    if (teams.length >= 6) return
    const used = teams.map(t => t.palette)
    const pal = T.teams.find(p => !used.includes(p.id)) || T.teams[0]
    const newId = teams.length > 0 ? Math.max(...teams.map(t => t.id)) + 1 : 1
    set({ teams: [...teams, { id: newId, name: pal.name, palette: pal.id,
      c1: pal.c1, c2: pal.c2, emoji: pal.emoji }] })
  }
  const remove = (id) => set({ teams: teams.filter(t => t.id !== id) })
  const cycleEmoji = (id) => {
    const emojis = ['🐬','🐢','🦊','🦁','🐳','🦩','🐵','🦄','🐸','🦉','🐯','🐼']
    set({ teams: teams.map(t => {
      if (t.id !== id) return t
      const currentIndex = emojis.indexOf(t.emoji)
      const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % emojis.length
      return { ...t, emoji: emojis[nextIndex] }
    }) })
  }

  return (
    <Body>
      <TopBar onBack={() => go('packs')} title="Times" />
      <Eyebrow color={T.skip}>Passo 3 de 3</Eyebrow>
      <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: '6px 0 16px' }}>
        Quem vai disputar? Toque no avatar para trocar.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {teams.map((t, i) => (
          <div key={t.id} className="anim-up"
            style={{ animationDelay: `${i * 40}ms`, display: 'flex', alignItems: 'center',
              gap: 14, background: '#fff', borderRadius: 20, padding: '12px 14px',
              boxShadow: T.shadowSm, borderLeft: `6px solid ${t.c1}` }}>
            <button onClick={() => cycleEmoji(t.id)}
              style={{ width: 52, height: 52, borderRadius: 16, flexShrink: 0,
                background: `linear-gradient(135deg, ${t.c1}, ${t.c2})`, fontSize: 28,
                display: 'grid', placeItems: 'center', boxShadow: `0 6px 14px ${t.c1}44` }}>
              {t.emoji}
            </button>
            <input value={t.name}
              onChange={e => set({ teams: teams.map(x => x.id === t.id ? { ...x, name: e.target.value } : x) })}
              style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'var(--display)',
                fontWeight: 600, fontSize: 19, color: T.navy, background: 'transparent', minWidth: 0 }} />
            {teams.length > 2 && (
              <button onClick={() => remove(t.id)}
                style={{ width: 34, height: 34, borderRadius: 11, background: '#fff1ec',
                  color: T.skipDeep, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
                <Icon name="close" size={18} />
              </button>
            )}
          </div>
        ))}
      </div>

      {teams.length < 6 && (
        <button onClick={addTeam}
          style={{ marginTop: 12, padding: '14px', borderRadius: 18,
            border: `2.5px dashed ${T.edge}`, background: 'transparent', color: T.teal,
            fontFamily: 'var(--display)', fontWeight: 600, fontSize: 16,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <Icon name="plus" size={20} /> Adicionar time
        </button>
      )}

      <div style={{ flex: 1, minHeight: 18 }} />

      <div style={{ background: '#fff', borderRadius: 20, padding: 16, boxShadow: T.shadowSm, marginBottom: 14 }}>
        <Stepper label="Tempo por rodada" icon="clock" suffix="s" step={15} min={30} max={120}
          value={state.roundTime} onChange={v => set({ roundTime: v })} />
        <div style={{ height: 1, background: T.line, margin: '12px 0' }} />
        <Stepper label="Meta de pontos" icon="trophy" suffix="" step={5} min={10} max={50}
          value={state.target} onChange={v => set({ target: v })} />
      </div>

      <Btn full variant="primary" onClick={() => { set({ turn: 0, scores: {} }); go('ready') }}>
        <Icon name="play" size={22} color="#fff" /> Começar partida
      </Btn>
    </Body>
  )
}

function Stepper({ label, icon, value, onChange, step, min, max, suffix }) {
  const stepBtn = { width: 36, height: 36, borderRadius: 11, background: T.page,
    border: `2px solid ${T.edge}`, display: 'grid', placeItems: 'center' }
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${T.teal}14`,
        color: T.teal, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
        <Icon name={icon} size={22} />
      </div>
      <div style={{ flex: 1, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 15.5,
        color: T.navy, lineHeight: 1.15 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
        <button onClick={() => onChange(Math.max(min, value - step))} style={stepBtn}>
          <Icon name="minus" size={18} color={T.navy} />
        </button>
        <div className="display" style={{ minWidth: 52, textAlign: 'center', fontSize: 19,
          fontWeight: 600, color: T.navy }}>{value}{suffix}</div>
        <button onClick={() => onChange(Math.min(max, value + step))} style={stepBtn}>
          <Icon name="plus" size={18} color={T.navy} />
        </button>
      </div>
    </div>
  )
}

// ── READY (pass the phone) ────────────────────────────────────────
export function Ready({ go, state }) {
  const team = state.teams[state.turn % state.teams.length]
  const mode = MODES.find(m => m.id === state.mode)
  const [confirmExit, setConfirmExit] = React.useState(false)
  const hasProgress = state.turn > 0 || Object.values(state.scores || {}).some(v => v > 0)
  const handleBack = () => hasProgress ? setConfirmExit(true) : go('teams')
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: `linear-gradient(160deg, ${team.c1}, ${team.c2})`, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%',
        background: 'rgba(255,255,255,0.14)', top: -110, left: -80 }} />
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        padding: '60px 28px 28px', display: 'flex', flexDirection: 'column' }}>
        <IconBtn light onClick={handleBack} style={{ alignSelf: 'flex-start' }}>
          <Icon name="back" size={22} />
        </IconBtn>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center' }}>
          <div className="anim-pop float" style={{ width: 150, height: 150, borderRadius: '50%',
            background: 'rgba(255,255,255,0.22)', display: 'grid', placeItems: 'center',
            fontSize: 76, marginBottom: 22, boxShadow: 'inset 0 0 0 6px rgba(255,255,255,0.25)' }}>
            {team.emoji}
          </div>
          <div className="display anim-up" style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15,
            fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase' }}>
            Passe o celular para
          </div>
          <h1 className="display anim-up" style={{ color: '#fff', fontSize: 46, fontWeight: 700,
            margin: '6px 0 18px', letterSpacing: '-0.5px' }}>{team.name}</h1>
          <div className="anim-up" style={{ display: 'inline-flex', alignItems: 'center', gap: 9,
            background: 'rgba(255,255,255,0.2)', borderRadius: 999, padding: '10px 18px',
            color: '#fff', fontFamily: 'var(--display)', fontWeight: 600, fontSize: 16 }}>
            <Icon name={mode.icon} size={20} /> {mode.name} · {state.roundTime}s
          </div>
        </div>
        <Btn full variant="white" style={{ fontSize: 22, padding: 20 }} onClick={() => go('play')}>
          <Icon name="play" size={24} color={team.c1} /> Estamos prontos!
        </Btn>
      </div>

      {confirmExit && (
        <div className="anim-in" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: 35, background: 'rgba(46,60,90,0.55)', backdropFilter: 'blur(6px)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 16, padding: 30 }}>
          <div className="display" style={{ color: '#fff', fontSize: 30, fontWeight: 700, textAlign: 'center' }}>
            Sair da partida?
          </div>
          <div style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600, fontSize: 15,
            textAlign: 'center', maxWidth: 280, lineHeight: 1.4 }}>
            Você vai perder a pontuação atual do jogo.
          </div>
          <Btn variant="white" size="lg" full onClick={() => setConfirmExit(false)}>
            <Icon name="play" size={22} color={team.c1} /> Continuar jogando
          </Btn>
          <Btn variant="ghost" size="md" full onClick={() => go('teams')}>Sair e perder pontos</Btn>
        </div>
      )}
    </div>
  )
}
