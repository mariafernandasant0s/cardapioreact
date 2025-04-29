
const cardapioCategorizado = {
  entradas: [
    {
      id: 101, // IDs únicos, pode ser bom manter sequenciais ou usar um padrão
      nome: 'Bolinho de Carne Seca',
      descricao: 'Bolinho crocante recheado com carne seca desfiada, perfeito para começar.',
      preco: 15.90,
      imagemUrl: '/images/entrada1.webp' // Use o caminho relativo à pasta public
    },
    {
      id: 102,
      nome: 'Polenta Frita',
      descricao: 'Deliciosa polenta frita sequinha, servida com molho de queijo.',
      preco: 19.00,
      imagemUrl: '/images/entrada2.webp'
    },
    {
      id: 103,
      nome: 'Bruschetta Tradicional',
      descricao: 'Pão italiano torrado com tomate fresco, manjericão, alho e azeite.',
      preco: 19.00,
      imagemUrl: '/images/entrada3.webp'
    },
     {
      id: 104,
      nome: 'Carpaccio de Carne',
      descricao: 'Finas fatias de carne crua, rúcula, alcaparras e lascas de parmesão.',
      preco: 29.00,
      imagemUrl: '/images/entrada4.webp'
    },
    // Adicione mais entradas aqui...
  ],
  'pratos-principais': [ // Use aspas para chaves com hífen
    {
      id: 201,
      nome: 'Filé à Parmegiana',
      descricao: 'Suculento filé empanado, coberto com molho de tomate caseiro e queijo derretido.',
      preco: 45.00,
      imagemUrl: '/images/prato1.webp'
    },
    {
      id: 202,
      nome: 'Risoto de Frutos do Mar',
      descricao: 'Risoto cremoso com camarões, lula, mariscos e um toque de açafrão.',
      preco: 75.00,
      imagemUrl: '/images/prato2.webp'
    },
     {
      id: 203,
      nome: 'Paillard de Filé com Fettuccine',
      descricao: 'Fino filé grelhado coberto com fettuccine ao molho Alfredo.',
      preco: 75.00,
      imagemUrl: '/images/prato3.webp'
    },
     {
      id: 204,
      nome: 'Salmão Grelhado com Purê',
      descricao: 'Posta de salmão grelhado na perfeição, acompanha purê de batata baroa.',
      preco: 79.00,
      imagemUrl: '/images/prato4.webp'
    },
    // Adicione mais pratos principais aqui...
  ],
  sobremesas: [
    {
      id: 301,
      nome: 'Petit Gateau',
      descricao: 'Bolinho quente de chocolate com centro cremoso, servido com sorvete de creme.',
      preco: 26.00,
      imagemUrl: '/images/sobremesa1.webp'
    },
    {
      id: 302,
      nome: 'Palha Italiana',
      descricao: 'Doce cremoso de brigadeiro com biscoito maisena, coberto com açúcar.',
      preco: 14.00,
      imagemUrl: '/images/sobremesa2.webp'
    },
     {
      id: 303,
      nome: 'Tiramisù Clássico',
      descricao: 'Camadas de biscoito champagne, café, creme de mascarpone e cacau.',
      preco: 28.00,
      imagemUrl: '/images/sobremesa3.webp'
    },
     {
      id: 304,
      nome: 'Cheesecake Frutas Vermelhas',
      descricao: 'Base crocante, recheio cremoso de queijo e calda de frutas vermelhas frescas.',
      preco: 24.00,
      imagemUrl: '/images/sobremesa4.webp'
    },
    // Adicione mais sobremesas aqui...
  ],
};

// Exporta o objeto categorizado
export default cardapioCategorizado;