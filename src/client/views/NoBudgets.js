/**
 * @license
 * Copyright &copy 2018 Cerner Corporation
 *
 * @author Daniel Vu
 */

import React from 'react';
import { Container, Header, Icon } from 'semantic-ui-react';

const NoBudgets = () => {
  return (
    <div
      style={{
        position: 'absolute',
        width: '100%',
        bottom: 0,
        top: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container textAlign="center">
        <Icon color="green" name="add circle" size="huge" />
        <Header as="h1">You have no budgets!</Header>
        <Header as="h2">Click the "Add Budget" button to create one!</Header>
      </Container>
    </div>
  );
};

NoBudgets.propTypes = {};

export default NoBudgets;
