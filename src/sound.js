// Efeitos sonoros sintetizados via Web Audio API — sem arquivos externos.
let ctx = null

function getCtx() {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || window.webkitAudioContext
  if (!AC) return null
  if (!ctx) ctx = new AC()
  if (ctx.state === 'suspended') ctx.resume()
  return ctx
}

// Um oscilador com envelope de volume (fade in/out) para evitar "clicks".
function blip(c, { type = 'sine', freq = 440, start = 0, dur = 0.2, vol = 0.3, freqEnd = null, fadeOut = true }) {
  const t0 = c.currentTime + start
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t0)
  if (freqEnd != null) osc.frequency.linearRampToValueAtTime(freqEnd, t0 + dur)
  gain.gain.setValueAtTime(0.0001, t0)
  gain.gain.exponentialRampToValueAtTime(vol, t0 + 0.01)
  if (fadeOut) gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  else gain.gain.setValueAtTime(vol, t0 + dur) // segura o volume até o corte
  osc.connect(gain).connect(c.destination)
  osc.start(t0)
  osc.stop(t0 + dur + (fadeOut ? 0.02 : 0)) // stop() sempre depois de start()
}

// Tic-tac de relógio: clique curto. Alterna o tom para soar "tic"/"tac".
export function playTick(high = true) {
  try {
    const c = getCtx(); if (!c) return
    blip(c, { type: 'square', freq: high ? 1600 : 1150, dur: 0.05, vol: 0.4 })
  } catch { /* áudio nunca deve quebrar o jogo */ }
}

// Apito de árbitro: tom agudo com trinado (vibrato). dur = duração em segundos.
export function playWhistle(dur = 1.0) {
  try {
    const c = getCtx(); if (!c) return
    const t0 = c.currentTime
    const osc = c.createOscillator()
    const gain = c.createGain()
    const vib = c.createOscillator()
    const vibGain = c.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(2100, t0)
    osc.frequency.linearRampToValueAtTime(2450, t0 + dur * 0.9)
    vib.type = 'sine'
    vib.frequency.setValueAtTime(30, t0) // trinado do apito
    vibGain.gain.setValueAtTime(70, t0)
    vib.connect(vibGain).connect(osc.frequency)
    gain.gain.setValueAtTime(0.0001, t0)
    gain.gain.exponentialRampToValueAtTime(0.55, t0 + 0.02)
    gain.gain.setValueAtTime(0.55, t0 + dur * 0.8)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
    osc.connect(gain).connect(c.destination)
    osc.start(t0); vib.start(t0)
    osc.stop(t0 + dur + 0.02); vib.stop(t0 + dur + 0.02)
  } catch { /* áudio nunca deve quebrar o jogo */ }
}

// Buzina: um tom grave e áspero, contínuo. dur = duração em segundos.
export function playBuzzer(dur = 2.0) {
  try {
    const c = getCtx(); if (!c) return
    blip(c, { type: 'sawtooth', freq: 165, dur, vol: 0.6, fadeOut: false })
  } catch { /* áudio nunca deve quebrar o jogo */ }
}
