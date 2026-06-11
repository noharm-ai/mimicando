export const MODES = [
  { id: 'mimica',   icon: 'masks',  name: 'Mímica',    desc: 'Atue sem falar nem apontar.',       tint: '#10bcd7' },
  { id: 'desenho',  icon: 'pencil', name: 'Desenho',   desc: 'Desenhe para o time adivinhar.',     tint: '#57bf95' },
  { id: 'descreva', icon: 'speech', name: 'Descreva',  desc: 'Explique sem dizer a palavra.',      tint: '#ff7a3d' },
  { id: 'turbo',    icon: 'bolt',   name: 'Turbo',     desc: 'Rodadas relâmpago de 30 segundos.', tint: '#ffc83d' },
]

export const PACKS = [
  { id: 'animais',    emoji: '🐵', name: 'Animais',     n: 60,  free: true,
    words: ['Macaco','Elefante','Pinguim','Girafa','Golfinho','Camaleão','Preguiça','Tubarão','Coruja','Ouriço','Canguru','Polvo'] },
  { id: 'filmes',     emoji: '🎬', name: 'Filmes',      n: 80,  free: true,
    words: ['Titanic','Rei Leão','Matrix','Toy Story','Vingadores','Jurassic Park','Frozen','Velozes e Furiosos','Avatar','Tubarão'] },
  { id: 'profissoes', emoji: '👩‍🚀', name: 'Profissões', n: 50,  free: true,
    words: ['Astronauta','Bombeiro','Chef','Dentista','Piloto','Mágico','Jardineiro','DJ','Veterinário','Detetive'] },
  { id: 'acoes',      emoji: '🤸', name: 'Ações',       n: 70,  free: true,
    words: ['Dançar','Escalar','Cozinhar','Esquiar','Surfar','Bocejar','Espirrar','Pescar','Costurar','Patinar'] },
  { id: 'objetos',    emoji: '🪑', name: 'Objetos',     n: 65,  free: false,
    words: ['Guarda-chuva','Liquidificador','Telescópio','Ampulheta','Despertador','Bússola','Skate','Sanfona'] },
  { id: 'famosos',    emoji: '⭐', name: 'Famosos',     n: 90,  free: false,
    words: ['Pelé','Einstein','Chaplin','Frida Kahlo','Mozart','Cleópatra','Newton','Shakespeare'] },
  { id: 'comidas',    emoji: '🍕', name: 'Comidas',     n: 55,  free: false,
    words: ['Pizza','Brigadeiro','Sushi','Pipoca','Lasanha','Açaí','Cachorro-quente','Picolé'] },
  { id: 'lugares',    emoji: '🗺️', name: 'Lugares',     n: 48,  free: false,
    words: ['Praia','Deserto','Floresta','Vulcão','Museu','Aeroporto','Caverna','Castelo'] },
]

export function buildDeck(packIds) {
  let pool = []
  PACKS.filter(p => packIds.includes(p.id)).forEach(p => { pool = pool.concat(p.words) })
  if (!pool.length) pool = PACKS[0].words.slice()
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool
}
