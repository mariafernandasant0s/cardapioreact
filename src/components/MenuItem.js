// src/components/MenuItem.js
import React from 'react';
import '../App.css';

function MenuItem(props) {
  const { nome, descricao, preco, imagemUrl, onAddToCart } = props;
  const precoNumerico = parseFloat(preco);

  return (
    <article className="menu-item">
      <img
        src={imagemUrl}
        alt={`Imagem de ${nome}`}
        className="menu-item-imagem"
        // loading="lazy" // MANTIDO REMOVIDO
        width="400"    // ATUALIZADO para a largura da sua imagem física
        height="293"   // ATUALIZADO para a altura proporcional (AJUSTE SE NECESSÁRIO)
      />

      <div className="menu-item-info">
        <h3 className="menu-item-nome">{nome}</h3>
        <p className="menu-item-descricao">{descricao}</p>
        <span className="menu-item-preco preco">
          R$ {isNaN(precoNumerico) ? '---' : precoNumerico.toFixed(2)}
        </span>
      </div>

      <button
         className="add-to-cart-btn"
         onClick={onAddToCart}
      >
         Adicionar ao carrinho
      </button>
    </article>
  );
}

export default MenuItem;