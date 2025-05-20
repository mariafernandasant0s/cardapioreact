// src/components/CartDetails.js
import React from 'react';
import '../App.css'; // Para os estilos do modal

function CartDetails({ cart, cartTotal, onClose }) {
  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-details" onClick={e => e.stopPropagation()}>
        <h3>Seu Carrinho</h3>
        <button className="close-cart-btn" onClick={onClose} aria-label="Fechar carrinho">X</button>

        {cart.length === 0 ? (
          <p>Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="cart-items-list">
              {cart.map((item, index) => (
                <li key={item.id ? `${item.id}-${index}` : index} className="cart-item">
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
  );
}

export default CartDetails;