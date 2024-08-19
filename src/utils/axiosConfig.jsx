import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://pokeapi.co/api/v2/',
  timeout: 10000,
});

export const fetchPokemons = async (url) => {
  try {
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export const fetchPokemonDetails = async (name) => {
    try {
      const response = await axiosInstance.get(`/pokemon/${name}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching Pokémon details', error);
      throw error;
    }
  };

export default axiosInstance;