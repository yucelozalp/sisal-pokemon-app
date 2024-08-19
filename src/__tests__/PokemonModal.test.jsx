import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { Modal, Descriptions, Image, Spin } from 'antd';
import { fetchPokemonDetails } from '../services/pokemonService';
import PokemonModal from '../components/PokemonModal';

jest.mock('../services/pokemonService', () => ({
  fetchPokemonDetails: jest.fn(() => Promise.resolve({
    name: 'bulbasaur',
    height: 7,
    weight: 69,
    base_experience: 64,
    sprites: { front_default: 'https://pokeapi.co/api/v2/sprite.png' },
  })),
}));

describe('PokemonModal', () => {
  test('renders Pokémon details in modal', async () => {
    render(<PokemonModal pokemon={{ name: 'bulbasaur' }} onClose={() => {}} />);

    expect(screen.getByRole('status')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('bulbasaur')).toBeInTheDocument();
      expect(screen.getByText('7')).toBeInTheDocument();
      expect(screen.getByText('69')).toBeInTheDocument();
      expect(screen.getByText('64')).toBeInTheDocument();
      expect(screen.getByRole('img', { name: 'bulbasaur' })).toHaveAttribute('src', 'https://pokeapi.co/api/v2/sprite.png');
    });
  });

  test('displays error message on fetch failure', async () => {
    jest.mock('../services/pokemonService', () => ({
      fetchPokemonDetails: jest.fn(() => Promise.reject(new Error('Failed to fetch'))),
    }));

    render(<PokemonModal pokemon={{ name: 'bulbasaur' }} onClose={() => {}} />);

    expect(await screen.findByText('Error')).toBeInTheDocument();
  });

  test('closes modal on close button click', async () => {
    const handleClose = jest.fn();
    render(<PokemonModal pokemon={{ name: 'bulbasaur' }} onClose={handleClose} />);

    fireEvent.click(screen.getByRole('button', { name: /Close/i }));

    expect(handleClose).toHaveBeenCalled();
  });
});