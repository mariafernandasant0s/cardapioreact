import './App.css'; // Importa o CSS para estilizar TUDO
import React, { useState } from 'react'; // Importa React e useState
import cardapioCategorizado from './data.js'; // Importa os dados categorizados
import MenuItem from './components/MenuItem.js'; // Importa o componente de item individual

// Ajuda para exibir os títulos das categorias na tela e no filtro
const categoryTitles = {
  all: 'Todas as Categorias', // Adicionado 'Todas' para o filtro
  entradas: 'Entradas',
  'pratos-principais': 'Pratos Principais',
  sobremesas: 'Sobremesas',
  // Adicione outras categorias aqui se tiver no data.js
};

function App() {
  // >>> ESTADO PARA O FILTRO <<<
  // selectedCategory guarda a chave da categoria selecionada (ou 'all')
  const [selectedCategory, setSelectedCategory] = useState('all'); // Começa mostrando 'all'

  // >>> ESTADO PARA O CARRINHO <<<
  // cart guarda um array dos itens que foram adicionados
  const [cart, setCart] = useState([]); // Carrinho começa vazio
  // >>> ESTADO PARA MOSTRAR/ESCONDER OS DETALHES DO CARRINHO <<<
  const [showCartDetails, setShowCartDetails] = useState(false); // Começa escondido

  // Pega as chaves das categorias do objeto de dados, incluindo 'all' para o filtro dropdown
  const categoriasParaFiltro = ['all', ...Object.keys(cardapioCategorizado)];

  // >>> FUNÇÃO PARA ADICIONAR ITENS AO CARRINHO <<<
  const addToCart = (itemToAdd) => {
    // TODO: Implementar lógica para verificar se o item já está no carrinho e talvez aumentar a quantidade
    // Por enquanto, apenas adiciona o item ao final do array
    setCart([...cart, itemToAdd]);
    console.log('Item adicionado ao carrinho:', itemToAdd.nome); // Mensagem no console (opcional)
    // Opcional: Mostrar uma confirmação visual rápida (ex: "Item adicionado!")
  };

   // >>> FUNÇÃO PARA REMOVER ITENS DO CARRINHO (BÁSICO) <<<
   // TODO: Implementar a exibição dos itens e botões de remover
   const removeFromCart = (itemToRemoveId) => {
       const newCart = cart.filter(item => item.id !== itemToRemoveId);
       setCart(newCart);
       console.log('Item removido do carrinho com ID:', itemToRemoveId);
   };
   // TODO: Implementar lógica para remover apenas UMA unidade se houver várias do mesmo item

  // >>> FUNÇÃO PARA LIDAR COM O CLIQUE NO FILTRO <<<
  const handleFilterClick = (categoryId) => {
    setSelectedCategory(categoryId); // Atualiza o estado da categoria selecionada
    // TODO: Implementar lógica para fechar o dropdown depois de clicar
  };

   // >>> FUNÇÃO PARA LIDAR COM O CLIQUE NO ÍCONE DO CARRINHO <<<
   const handleCartIconClick = () => {
       setShowCartDetails(!showCartDetails); // Inverte o estado (mostra se escondido, esconde se mostrando)
   };

   // >>> FUNÇÃO PARA CALCULAR O TOTAL DO CARRINHO <<<
   const calculateCartTotal = () => {
       return cart.reduce((total, item) => total + item.preco, 0); // Soma os preços de todos os itens no array 'cart'
   };
   const cartTotal = calculateCartTotal(); // Calcula o total sempre que o componente renderiza (o estado 'cart' muda)


  return (
    // Remove o app-container principal aqui para que header e footer fiquem full width
    <> {/* Usamos um Fragmento <> </> porque queremos múltiplos elementos no nível raiz (header, filtro, sections, footer) */}

      {/* >>> CABEÇALHO - Com Logo e Carrinho <<< */}
      {/* O cabeçalho agora vai ocupar a largura total */}
      <header role="banner">
          <div className="header-content"> {/* Container para centralizar o conteúdo do header */}
              <h1>Restaurante XPTO</h1>
              {/* Logo - Verifique se a imagem está em public/images e o caminho correto */}
              <img src="/images/logo.png" alt="Logo do Restaurante XPTO" width="150"/>

              {/* >>> ÍCONE E CONTAGEM DO CARRINHO <<< */}
              {/* Adicione estilos para a classe 'cart-info' no seu App.css! */}
              <div className="cart-info" onClick={handleCartIconClick}> {/* Adicionado onClick */}
                  {/* Ícone de carrinho (pode ser um emoji 🛒 ou uma imagem <img src="/images/cart.png" alt="Carrinho"/> ) */}
                  🛒 {/* Usando emoji por enquanto - estilize no CSS! */}
                   {/* Contagem de itens no carrinho */}
                  {/* Adicione estilos para a classe 'cart-count' no seu App.css! */}
                  {cart.length > 0 && <span className="cart-count">{cart.length}</span>} {/* Mostra a contagem apenas se for maior que 0 */}
              </div>
           </div> {/* Fim do header-content */}
      </header>

      {/* >>> FILTRO DROPDOWN - NOVO ELEMENTO <<< */}
      {/* Este container também pode ocupar a largura total se estilizado */}
      <div className="filter-container"> {/* Novo container para o filtro */}
          <div className="filter-dropdown"> {/* Container principal do dropdown - pode ser centralizado dentro de filter-container */}
              <button className="filter-button"> {/* Botão que aciona o dropdown */}
                  Filtro <span className="arrow">▼</span> {/* Símbolo de seta para baixo, estilize a classe arrow! */}
              </button>
              {/* Lista de opções do filtro - ESTILIZE PARA APARECER NO HOVER/CLICK DO .filter-dropdown! */}
              <ul className="filter-list">
                  {/* Mapeia as categorias para criar os itens do dropdown */}
                  {categoriasParaFiltro.map(categoryId => (
                      <li key={categoryId}>
                          <button
                              // Adiciona uma classe 'active' se esta for a categoria selecionada atualmente
                              className={selectedCategory === categoryId ? 'filter-option active' : 'filter-option'}
                              onClick={() => handleFilterClick(categoryId)} // Chama a função ao clicar
                          >
                              {categoryTitles[categoryId]} {/* Ex: Todas as Categorias, Entradas, etc. */}
                          </button>
                      </li>
                  ))}
              </ul>
          </div> {/* Fim do filter-dropdown */}
      </div> {/* Fim do filter-container */}


      {/* >>> CONTEÚDO PRINCIPAL DO CARDÁPIO - CENTRALIZADO <<< */}
       <div className="app-container"> {/* O container centralizado para as seções */}

          {/* >>> SEÇÕES DO CARDÁPIO - RENDERIZAÇÃO CONDICIONAL <<< */}
          {/* Mapeia as chaves das categorias (entradas, pratos-principais, sobremesas) */}
          {/* Object.keys(cardapioCategorizado) retorna ['entradas', 'pratos-principais', 'sobremesas'] */}
          {Object.keys(cardapioCategorizado).map(categoryId => {
              // Decide se esta seção deve ser exibida:
              // 1. Se selectedCategory é 'all' (mostra tudo)
              // OU
              // 2. Se selectedCategory é igual ao categoryId desta seção
              const isSectionVisible = selectedCategory === 'all' || selectedCategory === categoryId;

              // Renderiza a seção SOMENTE se ela for visível
              if (!isSectionVisible) {
                  return null; // Se não for visível, não renderiza nada para esta seção/categoria
              }

              // Se a seção é visível, renderiza a estrutura completa da seção
              return (
                  <section
                      key={categoryId} // key para a seção
                      id={categoryId} // ID para links (se necessário, embora o filtro substitua a navegação principal)
                      aria-labelledby={`${categoryId}-heading`} // Para acessibilidade
                  >
                      {/* Título da Seção (Ex: Entradas) */}
                      <h2 id={`${categoryId}-heading`}>{categoryTitles[categoryId]}</h2>

                      {/* Container para os itens DENTRO desta categoria - Usa a classe do seu CSS HTML */}
                      <div className="menu-category">
                          {/* Mapeia os ITENS dentro desta categoria específica e renderiza MenuItem */}
                          {cardapioCategorizado[categoryId].map(item => (
                            <MenuItem
                              key={item.id} // Chave única para CADA item
                              nome={item.nome}
                              descricao={item.descricao}
                              preco={item.preco}
                              imagemUrl={item.imagemUrl}
                              // >>> PASSA A FUNÇÃO addToCart para o MenuItem <<<
                              // Quando o botão no MenuItem for clicado, ele vai chamar essa função
                              onAddToCart={() => addToCart(item)} // Passa o item atual para a função
                            />
                          ))}
                      </div>
                  </section>
              );
          })}

       </div> {/* Fim do app-container */}


       {/* >>> RODAPÉ <<< */}
       {/* O rodapé também vai ocupar a largura total */}
       <footer role="contentinfo">
         <p>© Restaurante - Todos os direitos reservados.</p>
       </footer>

       {/* >>> DETALHES DO CARRINHO (Modal/Sidebar) <<< */}
       {/* Renderiza este bloco SOMENTE se showCartDetails for true */}
       {/* Adicione estilos para as classes 'cart-details', 'cart-overlay', etc. no App.css! */}
       {showCartDetails && (
           // Este overlay escurece o fundo
           <div className="cart-overlay" onClick={handleCartIconClick}> {/* Clicar no overlay fecha o carrinho */}
               <div className="cart-details" onClick={e => e.stopPropagation()}> {/* Impede que o clique dentro feche o carrinho */}
                   <h3>Seu Carrinho</h3>
                   <button className="close-cart-btn" onClick={handleCartIconClick}>X</button> {/* Botão para fechar */}

                   {cart.length === 0 ? (
                       <p>Seu carrinho está vazio.</p>
                   ) : (
                       <> {/* Usa fragmento para agrupar a lista e o total */}
                           <ul className="cart-items-list">
                               {/* TODO: Agrupar itens iguais e mostrar quantidade */}
                               {/* Para simplificar, key usando index é temporário. O ideal é key única por item no carrinho, considerando múltiplos. */}
                               {cart.map((item, index) => (
                                   <li key={index} className="cart-item">
                                       <span>{item.nome}</span>
                                       <span>R$ {item.preco.toFixed(2)}</span>
                                       {/* TODO: Adicionar botão para remover item */}
                                        {/* <button onClick={() => removeFromCart(item.id)}>Remover</button> */}
                                   </li>
                               ))}
                           </ul>
                           <div className="cart-total">
                               <strong>Total:</strong> <span>R$ {cartTotal.toFixed(2)}</span>
                           </div>
                           {/* TODO: Adicionar botão de Finalizar Compra */}
                       </>
                   )}
               </div>
           </div>
       )}

    </> // Fim do Fragmento raiz
  );
}

export default App;