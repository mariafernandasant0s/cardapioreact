// src/App.js
import "./App.css";
import React, { useState, lazy, Suspense } from "react";
import cardapioCategorizado from "./data.js";
import MenuItem from "./components/MenuItem.js";

const ExtraInfo = lazy(() => import("./components/ExtraInfo"));
const CartDetails = lazy(() => import("./components/CartDetails"));

const categoryTitles = {
  all: "Todas as Categorias",
  entradas: "Entradas",
  "pratos-principais": "Pratos Principais",
  sobremesas: "Sobremesas",
  bebidas: "Bebidas",
};

function App() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isFilterListVisible, setIsFilterListVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const categoriasParaFiltro = ["all", ...Object.keys(cardapioCategorizado)];

  const addToCart = (itemToAdd) => {
    setCart((prevCart) => [...prevCart, itemToAdd]);
    console.log("Item adicionado ao carrinho:", itemToAdd.nome);
  };

  const handleFilterButtonClick = () => {
    setIsFilterListVisible((prev) => !prev);
  };

  const handleFilterOptionClick = (categoryId) => {
    setSelectedCategory(categoryId);
    setIsFilterListVisible(false);
  };

  const handleCloseFilter = (e) => {
    if (isFilterListVisible && !e.target.closest(".filter-dropdown")) {
      setIsFilterListVisible(false);
    }
  };

  const handleCartIconClick = () => {
    setShowCartDetails((prev) => !prev);
  };

  const calculateCartTotal = () => {
    return cart.reduce(
      (total, item) => total + (parseFloat(item.preco) || 0),
      0
    );
  };
  const cartTotal = calculateCartTotal();

  const [showExtraInfo, setShowExtraInfo] = useState(false);

  const toggleExtraInfo = () => {
    setShowExtraInfo((prev) => !prev);
  };

  return (
    <div className="app" onClickCapture={handleCloseFilter}>
      <header role="banner">
        <div className="header-content">
          <div className="header-brand">
            <img
              // src/App.js
              // ...

              src="/images/logo.webp" // OU "/images/logo.png" dependendo do que você salvou
              alt="Logo do Restaurante XPTO"
              width="160" // Exatamente como no Squoosh
              height="91" // Exatamente como no Squoosh
            />
            // <h1>Restaurante XPTO</h1>
          </div>
          <div
            className="cart-info"
            onClick={handleCartIconClick}
            tabIndex="0"
            role="button"
            aria-label="Abrir carrinho"
          >
            🛒
            {cart.length > 0 && (
              <span className="cart-count">{cart.length}</span>
            )}
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
            className={
              isFilterListVisible ? "filter-list visible" : "filter-list"
            }
            role="menu"
          >
            {categoriasParaFiltro.map((categoryId) => (
              <li key={categoryId} role="none">
                <button
                  className={
                    selectedCategory === categoryId
                      ? "filter-option active"
                      : "filter-option"
                  }
                  onClick={() => handleFilterOptionClick(categoryId)}
                  role="menuitem"
                >
                  {categoryTitles[categoryId] || categoryId.replace("-", " ")}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="app-container">
        {Object.keys(cardapioCategorizado).map((categoryId, sectionIndex) => {
          // Adicionado sectionIndex
          const isSectionVisible =
            selectedCategory === "all" || selectedCategory === categoryId;

          if (!isSectionVisible) {
            return null;
          }

          return (
            <section
              key={categoryId}
              id={categoryId}
              aria-labelledby={`${categoryId}-heading`}
            >
              <h2 id={`${categoryId}-heading`}>
                {categoryTitles[categoryId] || categoryId.replace("-", " ")}
              </h2>
              <div className="menu-category">
                {cardapioCategorizado[categoryId].map((item, itemIndex) => {
                  // Adicionado itemIndex
                  // Lógica para identificar o primeiro item visível como candidato LCP
                  // Este é um exemplo simples, pode precisar de ajuste mais fino
                  // const isFirstVisibleItem = sectionIndex === 0 && itemIndex === 0 && (selectedCategory === 'all' || selectedCategory === Object.keys(cardapioCategorizado)[0]);

                  return (
                    <MenuItem
                      key={item.id}
                      id={item.id}
                      nome={item.nome}
                      descricao={item.descricao}
                      preco={parseFloat(item.preco)}
                      imagemUrl={item.imagemUrl}
                      onAddToCart={() =>
                        addToCart({ ...item, preco: parseFloat(item.preco) })
                      }
                      // isPriority={isFirstVisibleItem} // Descomente se implementar a lógica de prioridade
                    />
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      <button className="show-info-button" onClick={toggleExtraInfo}>
        {showExtraInfo ? "Esconder Informações" : "Mostrar Informações"}
      </button>

      {showExtraInfo && (
        <Suspense fallback={<div>Carregando informações extras...</div>}>
          <ExtraInfo />
        </Suspense>
      )}

      <footer role="contentinfo">
        <p>© Restaurante - Todos os direitos reservados.</p>
      </footer>

      {showCartDetails && (
        <Suspense
          fallback={
            <div className="cart-overlay">
              <div>Carregando carrinho...</div>
            </div>
          }
        >
          <CartDetails
            cart={cart}
            cartTotal={cartTotal}
            onClose={handleCartIconClick}
          />
        </Suspense>
      )}
    </div>
  );
}

export default App;
