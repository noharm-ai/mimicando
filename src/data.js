export const MODES = [
  { id: 'mimica',   icon: 'masks',  name: 'Mímica',    desc: 'Atue sem falar nem apontar.',       tint: '#10bcd7' },
  { id: 'desenho',  icon: 'pencil', name: 'Desenho',   desc: 'Desenhe para o time adivinhar.',     tint: '#57bf95' },
  { id: 'descreva', icon: 'speech', name: 'Descreva',  desc: 'Explique sem dizer a palavra.',      tint: '#ff7a3d' },
  { id: 'turbo',    icon: 'bolt',   name: 'Turbo',     desc: 'Rodadas relâmpago de 30 segundos.', tint: '#ffc83d' },
]

export const PACKS = [
  { id: 'animais',    emoji: '🐵', name: 'Animais',     free: true,
    words: ['Macaco','Elefante','Pinguim','Girafa','Golfinho','Camaleão','Preguiça','Tubarão','Coruja','Ouriço',
      'Canguru','Polvo','Leão','Tigre','Zebra','Cavalo','Cachorro','Gato','Coelho','Tartaruga','Cobra','Crocodilo',
      'Rinoceronte','Hipopótamo','Urso','Panda','Coala','Lobo','Raposa','Esquilo','Morcego','Águia','Papagaio',
      'Flamingo','Pavão','Borboleta','Abelha','Aranha','Caranguejo','Baleia','Foca','Formiga','Joaninha','Sapo',
      'Jacaré','Camelo','Avestruz'] },
  { id: 'filmes',     emoji: '🎬', name: 'Filmes',      free: true,
    words: ['Titanic','Rei Leão','Matrix','Toy Story','Vingadores','Jurassic Park','Frozen','Velozes e Furiosos',
      'Avatar','Tubarão','Star Wars','Harry Potter','Senhor dos Anéis','Homem-Aranha','Batman','Procurando Nemo',
      'Divertida Mente','Shrek','Pantera Negra','Piratas do Caribe','De Volta para o Futuro','O Poderoso Chefão',
      'Cidade de Deus','Tropa de Elite','Meu Malvado Favorito','Rocky','Gladiador','Exterminador do Futuro',
      'Homem de Ferro','Coringa','A Bela e a Fera','Aladdin','Cinderela','Os Incríveis','Wall-E','Up: Altas Aventuras',
      'Kung Fu Panda','Madagascar','A Era do Gelo','Interestelar','Jumanji','King Kong','Superman','Mulher-Maravilha'] },
  { id: 'profissoes', emoji: '👩‍🚀', name: 'Profissões', free: true,
    words: ['Astronauta','Bombeiro','Chef','Dentista','Piloto','Mágico','Jardineiro','DJ','Veterinário','Detetive',
      'Médico','Enfermeiro','Professor','Advogado','Juiz','Policial','Cozinheiro','Padeiro','Açougueiro','Pescador',
      'Agricultor','Pintor','Escultor','Músico','Cantor','Ator','Palhaço','Bailarino','Fotógrafo','Jornalista',
      'Escritor','Cientista','Engenheiro','Arquiteto','Eletricista','Encanador','Mecânico','Carteiro','Barbeiro',
      'Cabeleireiro','Costureira','Garçom','Motorista','Marinheiro','Soldado','Astrônomo','Domador','Mergulhador'] },
  { id: 'acoes',      emoji: '🤸', name: 'Ações',       free: true,
    words: ['Dançar','Escalar','Cozinhar','Esquiar','Surfar','Bocejar','Espirrar','Pescar','Costurar','Patinar',
      'Correr','Pular','Nadar','Dormir','Chorar','Rir','Gritar','Assobiar','Aplaudir','Cochichar','Abraçar','Cair',
      'Tropeçar','Dirigir','Voar','Cavar','Martelar','Varrer','Lavar','Escovar os dentes','Amarrar o sapato','Ler',
      'Escrever','Desenhar','Fotografar','Digitar','Telefonar','Cantar','Tocar violão','Boxear','Remar','Pedalar',
      'Meditar','Espreguiçar','Mergulhar','Espiar','Fugir','Rastejar'] },
  { id: 'objetos',    emoji: '🪑', name: 'Objetos',     free: false,
    words: ['Guarda-chuva','Liquidificador','Telescópio','Ampulheta','Despertador','Bússola','Skate','Sanfona',
      'Martelo','Tesoura','Vassoura','Escova','Óculos','Chapéu','Guarda-roupa','Geladeira','Ventilador','Chuveiro',
      'Torradeira','Microfone','Câmera','Violão','Tambor','Piano','Bicicleta','Patins','Balança','Lanterna','Vela',
      'Chave','Cadeado','Escada','Regador','Binóculo','Lupa','Termômetro','Balde','Corda','Pipa','Mochila','Carteira',
      'Relógio','Espelho','Travesseiro','Cobertor','Xícara','Garfo','Colher'] },
  { id: 'famosos',    emoji: '⭐', name: 'Famosos',     free: false,
    words: ['Pelé','Einstein','Chaplin','Frida Kahlo','Mozart','Cleópatra','Newton','Shakespeare','Da Vinci','Picasso',
      'Van Gogh','Beethoven','Gandhi','Napoleão','Nelson Mandela','Michael Jackson','Elvis Presley','Marilyn Monroe',
      'Ayrton Senna','Santos Dumont','Tarsila do Amaral','Machado de Assis','Monteiro Lobato','Carmen Miranda',
      'Tom Jobim','Chico Buarque','Xuxa','Silvio Santos','Neymar','Ronaldo','Marta','Gisele Bündchen','Anitta',
      'Roberto Carlos','Zico','Ronaldinho Gaúcho','Oscar Niemeyer','Getúlio Vargas','Tiradentes','Dom Pedro I',
      'Princesa Isabel','Galileu','Darwin','Marie Curie','Steve Jobs','Walt Disney','Cazuza','Freddie Mercury'] },
  { id: 'comidas',    emoji: '🍕', name: 'Comidas',     free: false,
    words: ['Pizza','Brigadeiro','Sushi','Pipoca','Lasanha','Açaí','Cachorro-quente','Picolé','Hambúrguer','Feijoada',
      'Coxinha','Pão de queijo','Pastel','Tapioca','Churrasco','Farofa','Mandioca','Sorvete','Bolo','Pudim','Beijinho',
      'Cocada','Torta','Salada','Espaguete','Panqueca','Omelete','Sanduíche','Taco','Burrito','Sopa','Risoto','Camarão',
      'Salmão','Chocolate','Chiclete','Bolacha','Rosquinha','Cupcake','Waffle','Milkshake','Suco','Café','Vitamina',
      'Queijo','Ovo frito','Arroz','Feijão'] },
  { id: 'lugares',    emoji: '🗺️', name: 'Lugares',     free: false,
    words: ['Praia','Deserto','Floresta','Vulcão','Museu','Aeroporto','Caverna','Castelo','Montanha','Ilha','Cachoeira',
      'Rio','Lago','Ponte','Farol','Igreja','Estádio','Cinema','Shopping','Hospital','Escola','Biblioteca','Zoológico',
      'Circo','Parque','Fazenda','Selva','Geleira','Pirâmide','Torre Eiffel','Cristo Redentor','Muralha da China',
      'Coliseu','Amazônia','Pantanal','Cataratas','Polo Norte','Lua','Marte','Restaurante','Padaria','Mercado','Teatro',
      'Aquário','Planetário','Deserto do Saara','Praça','Metrô'] },
]

export function buildDeck(packIds) {
  let pool = []
  PACKS.filter(p => packIds.includes(p.id)).forEach(p => { pool = pool.concat(p.words) })
  if (!pool.length) pool = PACKS[0].words.slice()
  pool = [...new Set(pool)] // remove duplicatas entre pacotes (ex.: "Tubarão")
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]]
  }
  return pool
}

// Retorna o tema (pacote) de uma palavra entre os pacotes selecionados.
// Para palavras em mais de um pacote (ex.: "Tubarão"), usa o primeiro na ordem de PACKS.
export function themeForWord(word, packIds) {
  const selected = PACKS.filter(p => packIds.includes(p.id))
  const list = selected.length ? selected : [PACKS[0]]
  const pack = list.find(p => p.words.includes(word))
  return pack ? { name: pack.name, emoji: pack.emoji } : null
}
