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
  bebidas: 'Bebidas', // Exemplo: se tiver mais categorias
  // Adicione outras categorias aqui se tiver no data.js
};

function App() {
  // >>> ESTADO PARA O FILTRO <<<
  // selectedCategory guarda a chave da categoria selecionada (ou 'all')
  const [selectedCategory, setSelectedCategory] = useState('all'); // Começa mostrando 'all'
  // Estado para controlar se a lista de filtro está visível (para fechar ao clicar fora)
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);


  // >>> ESTADO PARA O CARRINHO <<<
  // cart guarda um array dos itens que foram adicionados
  const [cart, setCart] = useState([]); // Carrinho começa vazio
  // TODO: Implementar agrupamento de itens no carrinho e quantidade
  // >>> ESTADO PARA MOSTRAR/ESCONDER OS DETALHOS DO CARRINHO <<<
  const [showCartDetails, setShowCartDetails] = useState(false); // Começa escondido

  // Pega as chaves das categorias do objeto de dados, incluindo 'all' para o filtro dropdown
  const categoriasParaFiltro = ['all', ...Object.keys(cardapioCategorizado)];

  // >>> FUNÇÃO PARA ADICIONAR ITENS AO CARRINHO <<<
  const addToCart = (itemToAdd) => {
    // TODO: Melhorar lógica para agrupar itens
    setCart([...cart, itemToAdd]);
    console.log('Item adicionado ao carrinho:', itemToAdd.nome);
    // Opcional: Mostrar uma confirmação visual rápida
  };

   // >>> FUNÇÃO PARA REMOVER ITENS DO CARRINHO (BÁSICO) <<<
   // TODO: Implementar a exibição dos itens e botões de remover
   const removeFromCart = (itemToRemoveId) => {
       const newCart = cart.filter(item => item.id !== itemToRemoveId);
       setCart(newCart);
       console.log('Item removido do carrinho com ID:', itemToRemoveId);
   };
   // TODO: Implementar lógica para remover apenas UMA unidade se houver várias do mesmo item

  // >>> FUNÇÃO PARA LIDAR COM O CLIQUE NO FILTRO (Botão principal) <<<
  const handleFilterButtonClick = () => {
      setIsFilterListVisible(!isFilterListVisible); // Alterna a visibilidade da lista
  };

  // >>> FUNÇÃO PARA LIDAR COM O CLIQUE EM UMA OPÇÃO DO FILTRO <<<
  const handleFilterOptionClick = (categoryId) => {
    setSelectedCategory(categoryId); // Atualiza o estado da categoria selecionada
    setIsFilterListVisible(false); // Esconde a lista depois de selecionar
  };

    // Função para fechar o filtro se clicar fora da lista ou no botão
    const handleCloseFilter = (e) => {
        // Verifica se o clique foi fora do container do dropdown
        // Usamos .closest para ver se o clique *não* foi dentro do .filter-dropdown
        if (isFilterListVisible && !e.target.closest('.filter-dropdown')) {
            setIsFilterListVisible(false);
        }
         // Se o clique foi no botão do filtro, a função handleFilterButtonClick já cuidou de alternar
    };

   // >>> FUNÇÃO PARA LIDAR COM O CLIQUE NO ÍCONE DO CARRINHO <<<
   const handleCartIconClick = () => {
       setShowCartDetails(!showCartDetails); // Inverte o estado (mostra se escondido, esconde se mostrando)
   };

   // >>> FUNÇÃO PARA CALCULAR O TOTAL DO CARRINHO <<<
   const calculateCartTotal = () => {
       // Certifica que o preco é um número antes de somar
       return cart.reduce((total, item) => total + (parseFloat(item.preco) || 0), 0);
   };
   const cartTotal = calculateCartTotal();


  return (
    // Adiciona um event listener no container principal para fechar o filtro ao clicar fora
    // Capture phase (true) ajuda a garantir que ele roda antes dos eventos internos se propagarem
    <div className="app" onClickCapture={handleCloseFilter}> {/* Container principal adicionado */}

      {/* >>> CABEÇALHO - Com Logo e Carrinho <<< */}
      <header role="banner">
          <div className="header-content"> {/* Container para centralizar o conteúdo do header */}

              {/* Container para agrupar Logo e Título */}
              <div className="header-brand">
                  {/* Logo - Certifique-se de ter a imagem em public/images/logo.png */}
                  <img src="/images/logo.png" alt="Logo do Restaurante XPTO" width="100"/>
                  <h1>Restaurante XPTO</h1>
              </div>

              {/* ÍCONE E CONTAGEM DO CARRINHO */}
              <div className="cart-info" onClick={handleCartIconClick}>
                  🛒 {/* Ícone de carrinho - estilize no CSS! */}
                  {/* Mostra a contagem apenas se o carrinho não estiver vazio */}
                  {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </div>
           </div>
      </header>

      {/* >>> FILTRO DROPDOWN <<< */}
      <div className="filter-container">
          <div className="filter-dropdown" role="navigation">
              <button
                  className="filter-button"
                  onClick={handleFilterButtonClick}
                  aria-haspopup="true"
                  aria-expanded={isFilterListVisible}
              >
                  Filtro <span className="arrow">▼</span>
              </button>
              {/* Lista de opções do filtro - Visibilidade controlada pelo estado 'isFilterListVisible' */}
              <ul
                  className={isFilterListVisible ? 'filter-list visible' : 'filter-list'}
                  role="menu"
              >
                  {categoriasParaFiltro.map(categoryId => (
                      <li key={categoryId} role="none">
                          <button
                              className={selectedCategory === categoryId ? 'filter-option active' : 'filter-option'}
                              onClick={() => handleFilterOptionClick(categoryId)}
                              role="menuitem"
                          >
                              {categoryTitles[categoryId]}
                          </button>
                      </li>
                  ))}
              </ul>
          </div>
      </div>


      {/* >>> CONTEÚDO PRINCIPAL DO CARDÁPIO - CENTRALIZADO <<< */}
       <div className="app-container">

          {/* >>> SEÇÕES DO CARDÁPIO - RENDERIZAÇÃO CONDICIONAL <<< */}
          {Object.keys(cardapioCategorizado).map(categoryId => {
              const isSectionVisible = selectedCategory === 'all' || selectedCategory === categoryId;

              if (!isSectionVisible) {
                  return null;
              }

              return (
                  <section
                      key={categoryId}
                      id={categoryId}
                      aria-labelledby={`${categoryId}-heading`}
                  >
                      <h2 id={`${categoryId}-heading`}>{categoryTitles[categoryId]}</h2>

                      <div className="menu-category">
                          {cardapioCategorizado[categoryId].map(item => (
                            <MenuItem
                              key={item.id}
                              id={item.id}
                              nome={item.nome}
                              descricao={item.descricao}
                              // CORREÇÃO: Passa o preco como NÚMERO para o componente MenuItem
                              preco={parseFloat(item.preco)} // <--- CORRIGIDO!
                              imagemUrl={item.imagemUrl}
                              // Passa o item (com preço como número) para a função addToCart
                              onAddToCart={() => addToCart({...item, preco: parseFloat(item.preco)})}
                            />
                          ))}
                      </div>
                  </section>
              );
          })}

       </div> {/* Fim do app-container */}


       {/* >>> RODAPÉ <<< */}
       <footer role="contentinfo">
         <p>© Restaurante - Todos os direitos reservados.</p>
       </footer>

       {/* >>> DETALHOS DO CARRINHO (Modal/Sidebar) <<< */}
       {/* Renderiza este bloco SOMENTE se showCartDetails for true */}
       {showCartDetails && (
           <div className="cart-overlay" onClick={handleCartIconClick}> {/* Clicar no overlay fecha o carrinho */}
               {/* Impede que o clique dentro do modal feche o carrinho */}
               <div className="cart-details" onClick={e => e.stopPropagation()}>
                   <h3>Seu Carrinho</h3>
                   <button className="close-cart-btn" onClick={handleCartIconClick} aria-label="Fechar carrinho">X</button>

                   {cart.length === 0 ? (
                       <p>Seu carrinho está vazio.</p>
                   ) : (
                       <> {/* Usa fragmento para agrupar a lista e o total */}
                           <ul className="cart-items-list">
                               {/* TODO: Agrupar itens iguais e mostrar quantidade e botão de remover */}
                               {/* Usando item.id como key, mas para múltiplos do mesmo item, precisaria de uma key mais robusta ou agrupar primeiro */}
                               {cart.map((item, index) => ( // Usando index temporariamente se item.id não for suficiente para chaves únicas no carrinho
                                   <li key={index} className="cart-item">
                                       <span>{item.nome}</span>
                                       {/* Formata o preço para string no carrinho */}
                                       <span>R$ {parseFloat(item.preco).toFixed(2)}</span>
                                        {/* TODO: Adicionar botão para remover este item */}
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

    </div> 
  );
}

export default App;