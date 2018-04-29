import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';

const fixedMenuStyle = {
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  boxShadow: '0px 3px 5px rgba(0, 0, 0, 0.2)',
};

const menuContainerStyle = {
  height: '50px',
};

const bodyStyle = {
  flexGrow: 1,
  flexShrink: 1,
  flexBasis: 'auto',
};

class StickyLayout extends Component {
  static propTypes = {
    menu: PropTypes.node.isRequired,
    content: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexFlow: 'column' }}>
        <div style={menuContainerStyle}>
          <Menu borderless fixed="top" style={fixedMenuStyle}>
            {this.props.menu}
          </Menu>
        </div>
        <div className="main-content" style={bodyStyle}>
          {this.props.content}
        </div>
      </div>
    );
  }
}

export default StickyLayout;
