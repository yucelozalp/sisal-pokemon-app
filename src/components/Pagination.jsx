import React, { useCallback } from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationComponent = ({ total, pageSize, current, onChange }) => {
  const handlePageChange = useCallback((page) => {
    onChange(page);
  }, [onChange]);

  return (
    <Pagination
      pageSize={pageSize}
      total={total}
      current={current}
      onChange={handlePageChange}
      showSizeChanger={false}
      style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}
    />
  );
};

PaginationComponent.propTypes = {
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaginationComponent;