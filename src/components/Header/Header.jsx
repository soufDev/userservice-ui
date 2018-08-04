import React, {
  Component
} from 'react';
import {
  Menu,
  Container
} from 'semantic-ui-react';
import {
  withRouter
} from 'react-router-dom';
import PropTypes from 'prop-types';

const defaultProps = {
  message: null
};

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
};

class Header extends Component {
  constructor(props) {
    super(props);
  }

  menuItemRender(items) {
      return (
        <Container>
          {items.map((item, key) => (<Menu.Item key={key} header name={item} onClick={(e, {name}) => console.log(name)}/>))}
        </Container >
      )
  }
  render() {
    const { items } = this.props;
    return (
      <Menu fixed = "top" size = "huge" inverted color = "blue">
        {this.menuItemRender(items)}
      </Menu>
    )
  }
}

Header.defaultProps = defaultProps;
Header.propTypes = propTypes;

export default Header;
