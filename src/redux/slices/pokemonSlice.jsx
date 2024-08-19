import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPokemons } from '../../utils/axiosConfig';

export const getPokemons = createAsyncThunk('pokemon/getPokemons', async (url) => {
  const data = await fetchPokemons(url);
  return data;
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    list: [],
    selected: null,
    status: 'idle',
    error: null,
    totalCount: 0
  },
  reducers: {
    selectPokemon: (state, action) => {
      state.selected = action.payload;
    },
    clearSelection: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPokemons.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getPokemons.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.list = action.payload.results;
        state.totalCount = action.payload.count;
      })
      .addCase(getPokemons.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { selectPokemon, clearSelection } = pokemonSlice.actions;
export default pokemonSlice.reducer;