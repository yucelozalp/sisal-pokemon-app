import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Modal, Descriptions, Image, Spin, Alert } from 'antd';
import { fetchPokemonDetails } from '../utils/axiosConfig';
import PropTypes from 'prop-types';

const PokemonModal = ({ pokemon, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null); // Clear any existing errors before fetching

      try {
        const data = await fetchPokemonDetails(pokemon.name);
        setDetails(data);
      } catch (err) {
        setError('Failed to fetch Pokémon details');
      } finally {
        setLoading(false);
      }
    };

    if (pokemon) {
      fetchDetails();
    }
  }, [pokemon]);

  const memoizedDetails = useMemo(() => details, [details]);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  if (loading) {
    return (
      <Spin
        size="large"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
        }}
      />
    );
  }

  return (
    <Modal open={!!pokemon} onCancel={handleClose} title={pokemon?.name} footer={null}>
      {error ? (
        <Alert message="Error" description={error} type="error" />
      ) : (
        memoizedDetails && (
          <>
            <Image src={memoizedDetails.sprites.front_default} alt={memoizedDetails.name} />
            <Descriptions column={2} bordered>
              <Descriptions.Item label="Name">{memoizedDetails.name}</Descriptions.Item>
              <Descriptions.Item label="Height">{memoizedDetails.height}</Descriptions.Item>
              <Descriptions.Item label="Weight">{memoizedDetails.weight}</Descriptions.Item>
              <Descriptions.Item label="Base Experience">{memoizedDetails.base_experience}</Descriptions.Item>
            </Descriptions>
          </>
        )
      )}
    </Modal>
  );
};

PokemonModal.propTypes = {
  pokemon: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PokemonModal;