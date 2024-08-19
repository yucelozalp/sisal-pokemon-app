import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from '../redux/slices/pokemonSlice';
import PokemonList from '../components/PokemonList';
import { fetchPokemons } from '../services/pokemonService';

const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
  },
});

const mockPokemons = {
  results: [
    { name: 'bulbasaur', id: 1 },
    { name: 'ivysaur', id: 2 },
  ],
  count: 2,
};

jest.mock('../services/pokemonService', () => ({
  fetchPokemons: jest.fn(() => Promise.resolve(mockPokemons)),
}));

describe('PokemonList', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );
  });

  test('renders Pokémon list', async () => {
    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('ivysaur')).toBeInTheDocument();
    });
  });

  test('opens and closes modal', async () => {
    fireEvent.click(screen.getByText('bulbasaur'));

    expect(await screen.findByText('bulbasaur')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    await waitFor(() => {
      expect(screen.queryByText('bulbasaur')).not.toBeInTheDocument();
    });
  });

  test('displays error message on API failure', async () => {
    jest.mock('../services/pokemonService', () => ({
      fetchPokemons: jest.fn(() => Promise.reject(new Error('Failed to fetch'))),
    }));

    render(
      <Provider store={store}>
        <PokemonList />
      </Provider>
    );

    expect(await screen.findByText('Error')).toBeInTheDocument();
  });
});