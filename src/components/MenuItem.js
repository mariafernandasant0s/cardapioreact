import React from 'react';
// Importa o CSS. O '../' significa "suba um nível de pasta".
// De src/components/MenuItem.js, '../' leva para src/
// Então, '../App.css' se refere a src/App.css
import '../App.css';

// Este componente renderiza um único item do cardápio
// Recebe os dados do item (nome, descricao, preco, imagemUrl)
// e a função onAddToCart via props
function MenuItem(props) {
  // Desestrutura as props para facilitar o uso
  // 'id' não está sendo usado diretamente no HTML do componente, então não precisa desestruturar
  const { nome, descricao, preco, imagemUrl, onAddToCart } = props;

  // Garante que preco é um número antes de tentar formatar ou usar em cálculos
  // Embora App.js já envie como número, esta é uma camada de segurança
  const precoNumerico = parseFloat(preco);

  return (
    // O ARTICLE será um container flexível. A descrição aparecerá no hover deste article.
    <article className="menu-item"> {/* Classe principal do item */}

      {/* Imagem do item */}
      {/* A classe menu-item-imagem no CSS cuida do tamanho, object-fit e border-radius */}
      <img src={imagemUrl} alt={`Imagem de ${nome}`} className="menu-item-imagem" /> {/* Alt mais descritivo para acessibilidade */}

      {/* Div para as informações de texto (nome, descrição, preço) */}
      {/* Esta div usa flex-grow para empurrar o botão para baixo */}
      <div className="menu-item-info"> {/* Classe para info */}

        {/* Nome do item */}
        <h3 className="menu-item-nome">{nome}</h3> {/* Classe para nome */}

        {/* Descrição do item - Escondida por padrão, visível no hover via CSS */}
        <p className="menu-item-descricao">{descricao}</p> {/* Classe para descrição */}

        {/* Preço do item - Formatado para 2 casas decimais APENAS para exibição */}
        <span className="menu-item-preco preco"> {/* Classes para preço */}
          {/* Verifica se precoNumerico é um número válido antes de formatar */}
          R$ {isNaN(precoNumerico) ? '---' : precoNumerico.toFixed(2)}
        </span>
      </div>

      {/* Botão Adicionar ao Carrinho - Todo estilo vem do App.css */}
      <button
         className="add-to-cart-btn"
         onClick={onAddToCart} // Chama a função addToCart passada do componente pai (App.js)
         // REMOVIDO O ATRIBUTO style={} QUE TINHA AQUI!
      >
         Adicionar ao carrinho
      </button>
    </article>
  );
}

// Exporta o componente para ser usado em outros arquivos
export default MenuItem;