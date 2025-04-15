// Array de objetos, onde cada objeto representa um item do cardápio
const cardapioItens = [
    {
      id: 1, // É bom ter um ID único para cada item
      nome: 'Pizza Margherita',
      descricao: 'Molho de tomate fresco, muçarela de búfala, manjericão e azeite.',
      preco: 35.50,
      imagemUrl: 'public/images/pizza.jpg' // Exemplo de URL
    },
    {
      id: 2,
      nome: 'Hambúrguer Clássico',
      descricao: 'Pão brioche, hambúrguer bovino 180g, queijo cheddar, alface, tomate e molho especial.',
      preco: 28.00,
      imagemUrl: 'public/images/hamburguer.jpg' // Exemplo de URL
    },
    {
      id: 3,
      nome: 'Salada Caesar',
      descricao: 'Alface romana, croutons, parmesão ralado e molho Caesar tradicional.',
      preco: 22.00,
      imagemUrl: 'public/images/saladacaeser.webp' // Exemplo de URL
    },
    // Adicione mais pratos aqui...
  ];
  
  // Exporta o array para que possa ser importado em outros arquivos
  export default cardapioItens;