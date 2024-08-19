import React, { useEffect, useState } from 'react';
import { Modal, Descriptions, Image, Spin, Alert } from 'antd';
import { fetchPokemonDetails } from '../utils/axiosConfig';
import PropTypes from 'prop-types';

const PokemonModal = ({ pokemon, onClose }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
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

  if (loading) return <Spin size="large" />;
  if (error) return <Alert message="Error" description={error} type="error" />;

  return (
    <Modal open={!!pokemon} onCancel={onClose} title={pokemon?.name} footer={null}>
      {details && (
        <>
          <Image src={details.sprites.front_default} alt={details.name} />
          <Descriptions column={2} bordered>
            <Descriptions.Item label="Name">{details.name}</Descriptions.Item>
            <Descriptions.Item label="Height">{details.height}</Descriptions.Item>
            <Descriptions.Item label="Weight">{details.weight}</Descriptions.Item>
            <Descriptions.Item label="Base Experience">{details.base_experience}</Descriptions.Item>
          </Descriptions>
        </>
      )}
    </Modal>
  );
};

PokemonModal.propTypes = {
  pokemon: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default PokemonModal;