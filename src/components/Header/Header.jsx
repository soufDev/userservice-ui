import  React, { Component } from 'react';
import { Menu, Container } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const defaultProps = {
};

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

class Header extends Component {
  menuItemRender() {
    const { history } = this.props;
    return (
      <Container>
        <Menu.Item
          header
          name="Home"
          onClick={() => history.push('/')}
        />
        <Menu.Item
          header
          name="User"
          onClick={() => history.push('/user')}
        />
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

export default withRouter(Header);
