/**
 * @license
 * Copyright &copy 2018 Cerner Corporation
 *
 * @author Daniel Vu
 */

import React from 'react';
import PropTypes from 'prop-types';

const PaddedPage = ({ children }) => {
  return <div style={{ marginTop: '20px' }}>{children}</div>;
};

PaddedPage.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PaddedPage;
