import React from 'react';
import { Pagination } from 'antd';
import PropTypes from 'prop-types';

const PaginationComponent = ({ current, total, pageSize, onChange }) => {
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={onChange}
      showSizeChanger={false}
    />
  );
};

PaginationComponent.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PaginationComponent;