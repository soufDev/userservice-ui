import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const defaultProps = {
  items: [],
};

const propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
};

class Header extends Component {
  menuItemRender() {
    const { items } = this.props;
    return (
      <Container>
        {items.map((item, index) => (
          <Menu.Item
            key={index + 1}
            header
            name={item}
            onClick={(e, { name }) => console.log(name)}
          />
        ))}
      </Container>
    );
  }

  render() {
    return (
      <Menu fixed="top" size="huge" inverted color="blue">
        {this.menuItemRender()}
      </Menu>
    );
  }
}

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;
