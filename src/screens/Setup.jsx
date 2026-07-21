import React from 'react'
import { T, Btn, IconBtn, Eyebrow } from '../theme.jsx'
import { Icon } from '../icons.jsx'
import { MODES, PACKS, DIFFICULTY, buildDeck, difficultyForWord } from '../data.js'

export function Body({ children, bg = T.page, pad = 24, style = {} }) {
  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: bg, overflowY: 'auto',
      padding: `60px ${pad}px 28px`, display: 'flex', flexDirection: 'column',
      ...style,
    }}>{children}</div>
  )
}

export function TopBar({ onBack, title, light, right }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      {onBack && <IconBtn onClick={onBack} light={light}><Icon name="back" size={22} /></IconBtn>}
      <div style={{ flex: 1, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 22,
        color: light ? '#fff' : T.navy }}>{title}</div>
      {right}
    </div>
  )
}

// ── HOME ──────────────────────────────────────────────────────────
export function Home({ go }) {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
      background: T.grad, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', width: 320, height: 320, borderRadius: '50%',
        background: 'rgba(255,255,255,0.16)', top: -120, right: -90, filter: 'blur(6px)' }} />
      <div style={{ position: 'absolute', width: 220, height: 220, borderRadius: '50%',
        background: 'rgba(255,255,255,0.12)', bottom: 250, left: -80 }} />

      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        padding: '64px 26px 26px', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconBtn light onClick={() => go('settings')}><Icon name="gear" size={22} /></IconBtn>
          <IconBtn light onClick={() => go('how')}><Icon name="info" size={22} /></IconBtn>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', textAlign: 'center', marginTop: -10 }}>
          <div className="float" style={{ marginBottom: 26 }}>
            <div style={{ width: 188, height: 188, borderRadius: '50%', position: 'relative',
              background: 'rgba(255,255,255,0.22)', display: 'grid', placeItems: 'center',
              boxShadow: '0 22px 50px rgba(0,0,0,0.16), inset 0 0 0 6px rgba(255,255,255,0.25)' }}>
              <div style={{ position: 'absolute', fontSize: 104, lineHeight: 1, userSelect: 'none' }}>🐵</div>
            </div>
          </div>
          <div className="display anim-up" style={{ fontSize: 13, letterSpacing: '4px',
            fontWeight: 600, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' }}>
            Festa · Mímica · Risada
          </div>
          <h1 className="display anim-up" style={{ fontSize: 58, fontWeight: 700, color: '#fff',
            margin: '6px 0 4px', letterSpacing: '-1px', lineHeight: 1,
            textShadow: '0 6px 18px rgba(0,0,0,0.12)' }}>Mimicando</h1>
          <p className="anim-up" style={{ color: 'rgba(255,255,255,0.92)', fontSize: 16,
            fontWeight: 600, maxWidth: 250, margin: 0 }}>
            O jogo de adivinhação mais animado da sala.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Btn full variant="white" size="lg" onClick={() => go('mode')}
            style={{ fontSize: 22, padding: '20px' }}>
            <Icon name="play" size={24} color={T.teal} /> Jogar agora
          </Btn>
          <div style={{ display: 'flex', gap: 12 }}>
            <Btn variant="ghost" size="md" full onClick={() => go('how')}>
              <Icon name="info" size={20} /> Como jogar
            </Btn>
            <Btn variant="ghost" size="md" full onClick={() => go('teams')}>
              <Icon name="users" size={20} /> Times
            </Btn>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── MODE SELECT ───────────────────────────────────────────────────
export function ModeSelect({ go, state, set }) {
  return (
    <Body>
      <TopBar onBack={() => go('home')} title="Modo de jogo" />
      <Eyebrow>Passo 1 de 3</Eyebrow>
      <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: '6px 0 18px' }}>
        Como o time vai dar as dicas?
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {MODES.map((m, i) => {
          const on = state.mode === m.id
          return (
            <button key={m.id} className="anim-up"
              style={{ animationDelay: `${i * 50}ms`, textAlign: 'left', background: '#fff',
                borderRadius: 22, padding: 18, display: 'flex', alignItems: 'center', gap: 16,
                border: `2.5px solid ${on ? m.tint : T.edge}`,
                boxShadow: on ? `0 12px 28px ${m.tint}33` : T.shadowSm,
                transition: 'all .18s' }}
              onClick={() => set({ mode: m.id })}>
              <div style={{ width: 58, height: 58, borderRadius: 17, flexShrink: 0,
                background: `${m.tint}1a`, color: m.tint, display: 'grid', placeItems: 'center' }}>
                <Icon name={m.icon} size={30} />
              </div>
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontSize: 21, fontWeight: 600, color: T.navy }}>{m.name}</div>
                <div style={{ fontSize: 14, color: T.text, fontWeight: 600 }}>{m.desc}</div>
              </div>
              <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                border: `2.5px solid ${on ? m.tint : T.edge}`, background: on ? m.tint : '#fff',
                display: 'grid', placeItems: 'center', color: '#fff' }}>
                {on && <Icon name="check" size={16} stroke={3} />}
              </div>
            </button>
          )
        })}
      </div>
      <div style={{ flex: 1 }} />
      <Btn full variant="primary" style={{ marginTop: 20 }} onClick={() => go('packs')}>
        Escolher temas <Icon name="arrowR" size={22} />
      </Btn>
    </Body>
  )
}

// ── WORD PACKS ────────────────────────────────────────────────────
export function Packs({ go, state, set }) {
  const toggle = (id) => {
    const cur = state.packs
    set({ packs: cur.includes(id) ? cur.filter(p => p !== id) : [...cur, id] })
  }
  // conta as palavras disponíveis por nível (respeitando os temas selecionados)
  const counts = React.useMemo(() => {
    const pool = state.packs.length ? buildDeck(state.packs, 'all') : []
    const c = { all: pool.length, 1: 0, 2: 0, 3: 0 }
    pool.forEach(w => { c[difficultyForWord(w)]++ })
    return c
  }, [state.packs])
  return (
    <Body>
      <TopBar onBack={() => go('mode')} title="Temas" />
      <Eyebrow color={T.sage}>Passo 2 de 3</Eyebrow>
      <p style={{ color: T.text, fontSize: 15, fontWeight: 600, margin: '6px 0 18px' }}>
        Escolha um ou mais baralhos de palavras.
      </p>

      <div style={{ marginBottom: 20 }}>
        <div className="display" style={{ fontSize: 15, fontWeight: 600, color: T.muted,
          marginBottom: 10, letterSpacing: '.5px' }}>DIFICULDADE</div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[{ id: 'all', name: 'Todas', color: T.teal }].concat(
            Object.values(DIFFICULTY).map(d => ({ id: String(d.level), name: d.name, color: d.color }))
          ).map(opt => {
            const on = String(state.difficulty) === opt.id
            return (
              <button key={opt.id} onClick={() => set({ difficulty: opt.id })}
                style={{ flex: 1, padding: '10px 4px', borderRadius: 14,
                  border: `2.5px solid ${on ? opt.color : T.edge}`,
                  background: on ? `${opt.color}1a` : '#fff',
                  fontFamily: 'var(--display)', transition: 'all .18s',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                <span style={{ color: on ? opt.color : T.muted, fontWeight: 700, fontSize: 14 }}>
                  {opt.name}
                </span>
                <span style={{ color: on ? opt.color : T.muted, fontWeight: 700, fontSize: 12,
                  opacity: 0.75 }}>
                  {counts[opt.id]}
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 13 }}>
        {PACKS.map((p, i) => {
          const on = state.packs.includes(p.id)
          return (
            <button key={p.id} className="anim-up"
              style={{ animationDelay: `${i * 40}ms`, position: 'relative', textAlign: 'left',
                background: '#fff', borderRadius: 20, padding: '16px 15px',
                border: `2.5px solid ${on ? T.teal : T.edge}`,
                boxShadow: on ? `0 10px 24px ${T.teal}30` : T.shadowSm, transition: 'all .18s' }}
              onClick={() => toggle(p.id)}>
              {!p.free && (
                <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 16 }}>🔒</div>
              )}
              <div style={{ fontSize: 38, lineHeight: 1, marginBottom: 8 }}>{p.emoji}</div>
              <div className="display" style={{ fontSize: 18, fontWeight: 600, color: T.navy }}>{p.name}</div>
              <div style={{ fontSize: 13, color: T.muted, fontWeight: 700 }}>{p.words.length} palavras</div>
              <div style={{ position: 'absolute', bottom: 14, right: 14, width: 24, height: 24,
                borderRadius: '50%', border: `2.5px solid ${on ? T.teal : T.edge}`,
                background: on ? T.teal : '#fff', display: 'grid', placeItems: 'center', color: '#fff' }}>
                {on && <Icon name="check" size={15} stroke={3} />}
              </div>
            </button>
          )
        })}
      </div>
      <div style={{ flex: 1, minHeight: 16 }} />
      <Btn full variant="primary" disabled={!state.packs.length} style={{ marginTop: 16 }}
        onClick={() => go('teams')}>
        {state.packs.length ? `Continuar · ${state.packs.length} tema(s)` : 'Selecione um tema'}
        <Icon name="arrowR" size={22} />
      </Btn>
    </Body>
  )
}

// ── HOW TO PLAY ───────────────────────────────────────────────────
export function HowToPlay({ go }) {
  const steps = [
    { n: '1', t: 'Monte os times',       d: 'Adicione 2 ou mais times e dê um nome a cada um.' },
    { n: '2', t: 'Escolha o modo',       d: 'Mímica, desenho ou descrição — sem dizer a palavra!' },
    { n: '3', t: 'Atue contra o tempo',  d: 'Acerte o máximo de palavras antes do tempo acabar.' },
    { n: '4', t: 'Marque pontos',        d: 'O primeiro time a bater a meta vence a partida.' },
  ]
  return (
    <Body>
      <TopBar onBack={() => go('home')} title="Como jogar" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {steps.map((s, i) => (
          <div key={i} className="anim-up"
            style={{ animationDelay: `${i * 60}ms`, display: 'flex', gap: 16,
              background: '#fff', borderRadius: 20, padding: 18, boxShadow: T.shadowSm }}>
            <div className="display" style={{ width: 46, height: 46, borderRadius: 14, flexShrink: 0,
              background: T.grad, color: '#fff', display: 'grid', placeItems: 'center',
              fontSize: 22, fontWeight: 700 }}>{s.n}</div>
            <div>
              <div className="display" style={{ fontSize: 19, fontWeight: 600, color: T.navy }}>{s.t}</div>
              <div style={{ fontSize: 14.5, color: T.text, fontWeight: 600, lineHeight: 1.4 }}>{s.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ flex: 1, minHeight: 16 }} />
      <Btn full variant="primary" onClick={() => go('mode')}>
        Bora jogar! <Icon name="arrowR" size={22} />
      </Btn>
    </Body>
  )
}

// ── SETTINGS ─────────────────────────────────────────────────────
export function Settings({ go, state, set }) {
  const Row = ({ label, icon, children }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 0' }}>
      <div style={{ width: 40, height: 40, borderRadius: 12, background: `${T.teal}14`,
        color: T.teal, display: 'grid', placeItems: 'center' }}>
        <Icon name={icon} size={22} />
      </div>
      <div style={{ flex: 1, fontFamily: 'var(--display)', fontWeight: 600, fontSize: 16, color: T.navy }}>{label}</div>
      {children}
    </div>
  )
  const Toggle = ({ on, onClick }) => (
    <button onClick={onClick} style={{ width: 52, height: 30, borderRadius: 999, padding: 3,
      background: on ? T.sage : T.edge, transition: 'background .2s', display: 'flex',
      justifyContent: on ? 'flex-end' : 'flex-start' }}>
      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#fff',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }} />
    </button>
  )
  return (
    <Body>
      <TopBar onBack={() => go('home')} title="Ajustes" />
      <div style={{ background: '#fff', borderRadius: 20, padding: '4px 18px', boxShadow: T.shadowSm }}>
        <Row label="Som e efeitos" icon="bolt">
          <Toggle on={state.sound} onClick={() => set({ sound: !state.sound })} />
        </Row>
        <div style={{ height: 1, background: T.line }} />
        <Row label="Vibração" icon="fire">
          <Toggle on={state.haptics} onClick={() => set({ haptics: !state.haptics })} />
        </Row>
        <div style={{ height: 1, background: T.line }} />
        <Row label="Penalizar ao pular" icon="skipfwd">
          <Toggle on={state.penalty} onClick={() => set({ penalty: !state.penalty })} />
        </Row>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ textAlign: 'center', color: T.muted, fontWeight: 700, fontSize: 13 }}>
        Mimicando · v2.0 · feito para rir
      </div>
    </Body>
  )
}
