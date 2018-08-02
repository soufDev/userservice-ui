import React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

const defaultProps = {
  message: null
};

const propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }),
};

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Menu fixed="top" size="huge" inverted color="blue">
        <Container>
          <Menu.Item header name="home" onClick={(e, { name }) => console.log(name)}/>
          <Menu.Item header name="about" onClick={(e, { name }) => console.log(name)}/>
        </Container>
      </Menu>
    )
  }
}

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;
