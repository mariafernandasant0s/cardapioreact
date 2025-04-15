import './App.css';
import React from 'react';
import cardapioItens from './data.js'; // Importa os dados
import MenuItem from './components/MenuItem.js'; // Importa o componente

// Importaremos o CSS aqui depois
// import './App.css';

function App() {
  return (
    <div className="app-container"> {/* Um container geral */}
      <h1>Cardápio Restaurante</h1>
      <section className="cardapio-lista"> {/* Uma seção para a lista */}
        {/* Usamos .map() para transformar cada item do array em um componente MenuItem */}
        {cardapioItens.map(item => (
          <MenuItem
            key={item.id} // Chave única para o React identificar cada item na lista
            nome={item.nome}
            descricao={item.descricao}
            preco={item.preco}
            imagemUrl={item.imagemUrl}
          />
        ))}
      </section>
    </div>
  );
}

export default App;




// import React from 'react'; // Importa a biblioteca React

// function App() { // Define o componente principal da aplicação
//   return (
//     <div>
//       {/* Nosso cardápio virá aqui! */}
//     </div>
//   );
// }

// export default App; // Torna o componente App disponível para outros arquivos (como o index.js)



// function App() {
//   return (
//     <div className="App">
    
//     </div>
//   );
// }

// export default App;
