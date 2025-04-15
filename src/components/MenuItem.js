import React from 'react'; // Todo componente React precisa importar o React

// Este é um componente funcional. Ele recebe 'props' como argumento.
// 'props' é um objeto que contém todos os dados que passamos para este componente.
function MenuItem(props) {
  return (
    // Usamos className em vez de class para CSS no JSX
    // Usamos a estrutura semântica que você já conhece (article, h3, p, etc.)
    <article className="menu-item">
      <img src={props.imagemUrl} alt={props.nome} className="menu-item-imagem" />
      <div className="menu-item-info">
        <h3 className="menu-item-nome">{props.nome}</h3>
        <p className="menu-item-descricao">{props.descricao}</p>
        <span className="menu-item-preco">R$ {props.preco.toFixed(2)}</span> {/* toFixed(2) formata para 2 casas decimais */}
      </div>
    </article>
  );
}

// Exportamos o componente para que ele possa ser usado em outros lugares (como no App.js)
export default MenuItem;