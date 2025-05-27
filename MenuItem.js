// src/components/MenuItem.js
import React from 'react';
import '../App.css'; // Certifique-se que este CSS não está sobrescrevendo as dimensões de forma a causar CLS

function MenuItem(props) {
  // As props que você está usando: nome, descricao, preco, imagemUrl, onAddToCart
  const { nome, descricao, preco, imagemUrl, onAddToCart } = props;
  const precoNumerico = parseFloat(preco);

  return (
    <article className="menu-item">
      <img
        src={imagemUrl}
        alt={`Foto de ${nome}${descricao ? `: ${descricao.substring(0, 50)}...` : ''}`} // ALT TEXT MELHORADO
        className="menu-item-imagem"
        loading="lazy" // SUGIRO RECOLOCAR (se não houver motivo para remover)
        width="300"  // SUBSTITUA PELO VALOR CORRETO APÓS INSPECIONAR
        height="200" // SUBSTITUA PELO VALOR CORRETO APÓS INSPECIONAR
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
        aria-label={`Adicionar ${nome} ao carrinho`} // Adicionei um aria-label para melhor acessibilidade do botão
      >
        Adicionar ao carrinho
      </button>
    </article>
  );
}

export default MenuItem;