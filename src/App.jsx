import React from 'react'
import { T, Phone } from './theme.jsx'
import { buildDeck } from './data.js'
import { Home, ModeSelect, Packs, HowToPlay, Settings } from './screens/Setup.jsx'
import { Teams, Ready } from './screens/Teams.jsx'
import { Play, RoundResult, Winner } from './screens/Play.jsx'

const DEFAULT = () => ({
  screen: 'home',
  mode: 'mimica',
  packs: ['animais', 'filmes'],
  teams: T.teams.slice(0, 2).map((p, i) => ({
    id: i + 1, name: p.name, palette: p.id, c1: p.c1, c2: p.c2, emoji: p.emoji,
  })),
  roundTime: 60,
  target: 20,
  sound: true, haptics: true, penalty: false,
  turn: 0,
  scores: {},
  deck: [],
  lastRound: null,
})

const DARK_STATUS = ['home', 'ready', 'play', 'winner']

export default function App() {
  const [st, setSt] = React.useState(DEFAULT)
  const set = (patch) => setSt(s => ({ ...s, ...patch }))
  const go = (screen) => set({ screen })

  const finishRound = (team, results) => {
    const gained = results.filter(r => r.got).length - (st.penalty ? results.filter(r => !r.got).length : 0)
    const scores = { ...st.scores, [team.id]: Math.max(0, (st.scores[team.id] || 0) + gained) }
    setSt(s => ({ ...s, scores, lastRound: { team, results, gained }, screen: 'roundresult' }))
  }

  const nextTurn = () => {
    const champ = st.teams.find(t => (st.scores[t.id] || 0) >= st.target)
    if (champ) { go('winner'); return }
    setSt(s => ({ ...s, turn: s.turn + 1, deck: buildDeck(s.packs), screen: 'ready' }))
  }

  const reset = () => setSt(s => ({
    ...DEFAULT(), teams: s.teams, mode: s.mode, packs: s.packs,
    roundTime: s.roundTime, target: s.target, sound: s.sound, haptics: s.haptics, penalty: s.penalty,
    screen: 'ready', turn: 0, scores: {}, deck: buildDeck(s.packs),
  }))

  const goReady = () => setSt(s => ({ ...s, deck: buildDeck(s.packs), screen: 'ready' }))
  const enhancedGo = (screen) => {
    if (screen === 'ready') { goReady(); return }
    go(screen)
  }

  const screen = st.screen
  let view
  if      (screen === 'home')        view = <Home         go={enhancedGo} />
  else if (screen === 'mode')        view = <ModeSelect   go={enhancedGo} state={st} set={set} />
  else if (screen === 'packs')       view = <Packs        go={enhancedGo} state={st} set={set} />
  else if (screen === 'teams')       view = <Teams        go={enhancedGo} state={st} set={set} />
  else if (screen === 'ready')       view = <Ready        go={enhancedGo} state={st} />
  else if (screen === 'play')        view = <Play         go={enhancedGo} state={st} finishRound={finishRound} />
  else if (screen === 'roundresult') view = <RoundResult  go={enhancedGo} state={st} nextTurn={nextTurn} />
  else if (screen === 'winner')      view = <Winner       go={enhancedGo} state={st} reset={reset} />
  else if (screen === 'how')         view = <HowToPlay    go={enhancedGo} />
  else if (screen === 'settings')    view = <Settings     go={enhancedGo} state={st} set={set} />

  const dark = DARK_STATUS.includes(screen)

  const [scale, setScale] = React.useState(1)
  React.useEffect(() => {
    const fit = () => {
      const s = Math.min((window.innerHeight - 40) / 864, (window.innerWidth - 32) / 410, 1.15)
      setScale(Math.max(0.4, s))
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [])

  return (
    <div className="stage">
      <div style={{ width: 390 * scale, height: 844 * scale }}>
        <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
          <Phone statusDark={dark} statusTint="transparent">
            <div key={screen} className="anim-in"
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
              {view}
            </div>
          </Phone>
        </div>
      </div>
    </div>
  )
}
