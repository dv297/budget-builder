import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

class StickyLayout extends Component {
  static propTypes = {
    menu: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div>
        <Menu borderless fixed="top" style={fixedMenuStyle}>
          {this.props.menu}
        </Menu>
        <div style={{ paddingTop: '55px' }}>{this.props.content}</div>
      </div>
    );
  }
}

export default StickyLayout;
