import React from 'react';

// Este componente renderiza um único item do cardápio
// Recebe os dados do item E a função onAddToCart via props
function MenuItem(props) {
  // Desestrutura as props para facilitar o uso
  const { nome, descricao, preco, imagemUrl, onAddToCart } = props;

  return (
    // O ARTICLE será um container flexível para alinhar a imagem, info e botão
    <article className="menu-item"> {/* Classe principal do item */}
      {/* Imagem do item */}
      <img src={imagemUrl} alt={nome} className="menu-item-imagem" />

      {/* Div para as informações de texto (nome, descrição, preço) */}
      {/* Esta div vai crescer para empurrar o botão para baixo */}
      <div className="menu-item-info"> {/* Classe para info */}
        {/* Nome do item */}
        <h3 className="menu-item-nome">{nome}</h3> {/* Classe para nome */}

        {/* Descrição do item */}
        <p className="menu-item-descricao">{descricao}</p> {/* Classe para descrição */}

        {/* Preço do item (com a classe 'preco' do seu CSS HTML) */}
        <span className="menu-item-preco preco"> {/* Classes para preço */}
          R$ {preco.toFixed(2)} {/* Formata o preço */}
        </span>
      </div>

      {/* >>> BOTÃO ADICIONAR AO CARRINHO <<< */}
      {/* Colocamos o botão FORA da div .menu-item-info, mas DENTRO do article */}
      {/* Isso, combinado com o Flexbox no article e em .menu-item-info, alinha ele embaixo */}
      {/* Adicione estilos para a classe 'add-to-cart-btn' no seu App.css! */}
      <button
         className="add-to-cart-btn"
         onClick={onAddToCart} // Chama a função que foi passada do App.js
         // REMOVA estes estilos inline depois que estilizar no App.css:
         style={{ display: 'block', width: 'calc(100% - 30px)', margin: '10px auto 15px auto', padding: '10px', backgroundColor: '#ccc', color: '#333', border: 'none', borderRadius: '5px', cursor: 'pointer' }} // << Mudei a cor para cinza básico
      >
         Adicionar ao carrinho
      </button>
    </article>
  );
}

// Exporta o componente
export default MenuItem;