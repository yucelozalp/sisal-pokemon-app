import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemons, selectPokemon, clearSelection } from '../redux/slices/pokemonSlice';
import { Card, Col, Row, Spin, Alert } from 'antd';
import SearchComponent from './Search';
import PaginationComponent from './Pagination';
import PokemonModal from './PokemonModal';

const PokemonList = () => {
  const dispatch = useDispatch();
  const { list, status, selected, error, totalCount } = useSelector(state => state.pokemon);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  const limit = 12;

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    dispatch(getPokemons(`pokemon?limit=${limit}&offset=${offset}`));
  }, [dispatch, currentPage]);

  const handleSearch = useCallback((value) => {
    setSearchTerm(value.toLowerCase());
  }, []);

  const handlePaginationChange = useCallback((page) => {
    setCurrentPage(page);
    setSearchTerm('');
  }, []);

  const handlePokemonClick = useCallback((pokemon) => {
    dispatch(selectPokemon(pokemon));
  }, [dispatch]);

  const handleCloseModal = useCallback(() => {
    dispatch(clearSelection());
  }, [dispatch]);

  const filteredPokemons = useMemo(() => {
    return list.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  }, [list, searchTerm]);

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      {status === 'loading' && <Spin size="large" />}
      {status === 'failed' && <Alert message="Error" description={error} type="error" />}
      <Row gutter={[16, 16]}>
        {filteredPokemons.map(pokemon => (
          <Col span={8} key={pokemon.name}>
            <Card
              title={pokemon.name}
              onClick={() => handlePokemonClick(pokemon)}
              hoverable
            />
          </Col>
        ))}
      </Row>
      <PaginationComponent
        current={currentPage}
        total={totalCount}
        pageSize={limit}
        onChange={handlePaginationChange}
      />
      {selected && <PokemonModal pokemon={selected} onClose={handleCloseModal} />}
    </div>
  );
};

export default PokemonList;