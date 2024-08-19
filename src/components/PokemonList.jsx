import React, { useEffect, useState } from 'react';
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

  const limit = 10;

  useEffect(() => {
    const offset = (currentPage - 1) * limit;
    dispatch(getPokemons(`pokemon?limit=${limit}&offset=${offset}`));
  }, [dispatch, currentPage]);

  const handleSearch = (value) => {
    setSearchTerm(value.toLowerCase());
  };

  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const handlePokemonClick = (pokemon) => {
    dispatch(selectPokemon(pokemon));
  };

  const handleCloseModal = () => {
    dispatch(clearSelection());
  };

  const filteredPokemons = list.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
  const totalPokemons = totalCount;

  return (
    <div>
      <SearchComponent onSearch={handleSearch} />
      {status === 'loading' && <Spin size="large" />}
      {status === 'failed' && <Alert message="Error" description={error} type="error" />}
      <Row gutter={16}>
        {filteredPokemons.map(pokemon => (
          <Col span={8} key={pokemon.name}>
            <Card
              title={pokemon.name}
              onClick={() => handlePokemonClick(pokemon)}
              hoverable
            >
            </Card>
          </Col>
        ))}
      </Row>
      <PaginationComponent
        current={currentPage}
        total={totalPokemons}
        pageSize={limit}
        onChange={handlePaginationChange}
      />
      {selected && <PokemonModal pokemon={selected} onClose={handleCloseModal} />}
    </div>
  );
};

export default PokemonList;