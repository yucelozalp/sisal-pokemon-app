import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PokemonList from './components/PokemonList';

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ padding: 20, maxWidth:"800px", margin: "0 auto" }}>
        <h1>Pokémon List</h1>
        <PokemonList />
      </div>
    </Provider>
  );
};

export default App;