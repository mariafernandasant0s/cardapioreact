import './App.css';
import React, { useState, lazy, Suspense } from 'react';
import cardapioCategorizado from './data.js';
import MenuItem from './components/MenuItem.js';

const ExtraInfo = lazy(() => import('./components/ExtraInfo'));

const categoryTitles = {
  all: 'Todas as Categorias',
  entradas: 'Entradas',
  'pratos-principais': 'Pratos Principais',
  sobremesas: 'Sobremesas',
  bebidas: 'Bebidas',
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const categoriasParaFiltro = ['all', ...Object.keys(cardapioCategorizado)];

  const addToCart = (itemToAdd) => {
    setCart([...cart, itemToAdd]);
    console.log('Item adicionado ao carrinho:', itemToAdd.nome);
  };

  const removeFromCart = (itemToRemoveId) => {
    const newCart = cart.filter(item => item.id !== itemToRemoveId);
    setCart(newCart);
    console.log('Item removido do carrinho com ID:', itemToRemoveId);
  };

  const handleFilterButtonClick = () => {
      setIsFilterListVisible(!isFilterListVisible);
  };

  const handleFilterOptionClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsFilterListVisible(false);
  };

    const handleCloseFilter = (e) => {
        if (isFilterListVisible && !e.target.closest('.filter-dropdown')) {
            setIsFilterListVisible(false);
        }
    };

   const handleCartIconClick = () => {
       setShowCartDetails(!showCartDetails);
   };

   const calculateCartTotal = () => {
       return cart.reduce((total, item) => total + (parseFloat(item.preco) || 0), 0);
   };
   const cartTotal = calculateCartTotal();

    const [showExtraInfo, setShowExtraInfo] = useState(false);

  const toggleExtraInfo = () => {
    setShowExtraInfo(!showExtraInfo);
  };

  return (
    <div className="app" onClickCapture={handleCloseFilter}>
      <header role="banner">
          <div className="header-content">
              <div className="header-brand">
                  <img src="/images/logo.png" alt="Logo do Restaurante XPTO" width="100"/>
                  <h1>Restaurante XPTO</h1>
              </div>
              <div className="cart-info" onClick={handleCartIconClick}>
                  🛒
                  {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
              </div>
           </div>
      </header>

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

       <div className="app-container">
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
                              preco={parseFloat(item.preco)}
                              imagemUrl={item.imagemUrl}
                              onAddToCart={() => addToCart({...item, preco: parseFloat(item.preco)})}
                            />
                          ))}
                      </div>
                  </section>
              );
          })}
       </div>

      <button className="show-info-button" onClick={toggleExtraInfo}>
        {showExtraInfo ? 'Esconder Informações' : 'Mostrar Informações'}
      </button>

      {showExtraInfo && (
        <Suspense fallback={<div>Carregando informações...</div>}>
          <ExtraInfo />
        </Suspense>
      )}

       <footer role="contentinfo">
         <p>© Restaurante - Todos os direitos reservados.</p>
       </footer>

       {showCartDetails && (
           <div className="cart-overlay" onClick={handleCartIconClick}>
               <div className="cart-details" onClick={e => e.stopPropagation()}>
                   <h3>Seu Carrinho</h3>
                   <button className="close-cart-btn" onClick={handleCartIconClick} aria-label="Fechar carrinho">X</button>

                   {cart.length === 0 ? (
                       <p>Seu carrinho está vazio.</p>
                   ) : (
                       <>
                           <ul className="cart-items-list">
                               {cart.map((item, index) => (
                                   <li key={index} className="cart-item">
                                       <span>{item.nome}</span>
                                       <span>R$ {parseFloat(item.preco).toFixed(2)}</span>
                                   </li>
                               ))}
                           </ul>
                           <div className="cart-total">
                               <strong>Total:</strong> <span>R$ {cartTotal.toFixed(2)}</span>
                           </div>
                       </>
                   )}
               </div>
           </div>
       )}
    </div>
  );
}

export default App;