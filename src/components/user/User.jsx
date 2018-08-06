import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import { Message } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import * as userActions from '../../actions/user';


const defaultProps = {
  isFetching: false,
  message: null,
};

const propTypes = {
  isFetching: PropTypes.bool,
  message: PropTypes.string,
  actions: PropTypes.shape({
    fetchAll: PropTypes.func.isRequired,
  }).isRequired,
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.renderForm = this.renderForm.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    actions.fetchAll();
  }

  renderForm() {
    const { user, message } = this.props;
    return (
      <div>
        <h1>
          Form User
        </h1>
        <h2>
          {message && <Message error header={message} />}
        </h2>
      </div>
    );
  }

  render() {
    return this.renderForm();
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  };
}

function mapStateToProps(state) {
  return {
    isFetching: state.userReducer.isFetching,
    users: state.userReducer.users,
    message: state.userReducer.message,
    error: state.userReducer.error,
  };
}

User.defaultProps = defaultProps;
User.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));
