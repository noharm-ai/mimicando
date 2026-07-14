import React from 'react'
import { T } from './theme.jsx'
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
  cursor: 0,
  lastRound: null,
})

const DARK_STATUS = ['home', 'ready', 'play', 'winner']

export default function App() {
  const [st, setSt] = React.useState(DEFAULT)
  const set = (patch) => setSt(s => ({ ...s, ...patch }))
  const go = (screen) => set({ screen })

  // `shown` = palavras exibidas na rodada (inclui a que ficou na tela ao acabar
  // o tempo, mesmo não resolvida) para não repetir para o próximo time.
  const finishRound = (team, results, shown = results.length) => {
    const gained = results.filter(r => r.got).length - (st.penalty ? results.filter(r => !r.got).length : 0)
    const scores = { ...st.scores, [team.id]: Math.max(0, (st.scores[team.id] || 0) + gained) }
    setSt(s => ({ ...s, scores, cursor: s.cursor + shown,
      lastRound: { team, results, gained }, screen: 'roundresult' }))
  }

  const nextTurn = () => {
    const champ = st.teams.find(t => (st.scores[t.id] || 0) >= st.target)
    if (champ) { go('winner'); return }
    // mantém o mesmo baralho e avança pelo cursor: sem repetir palavras no jogo
    setSt(s => ({ ...s, turn: s.turn + 1, screen: 'ready' }))
  }

  const reset = () => setSt(s => ({
    ...DEFAULT(), teams: s.teams, mode: s.mode, packs: s.packs,
    roundTime: s.roundTime, target: s.target, sound: s.sound, haptics: s.haptics, penalty: s.penalty,
    screen: 'ready', turn: 0, scores: {}, deck: buildDeck(s.packs), cursor: 0,
  }))

  const goReady = () => setSt(s => ({ ...s, deck: buildDeck(s.packs), cursor: 0, screen: 'ready' }))
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

  return (
    <div style={{ minHeight: '100vh', width: '100%', position: 'relative', overflow: 'hidden' }}>
      <div key={screen} className="anim-in"
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {view}
      </div>
    </div>
  )
}
