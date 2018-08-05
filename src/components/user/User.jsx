import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as userActions from '../../actions/user';

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // this.renderForm = this.renderForm.bind(this);
  }

  renderForm() {
    const { user } = this.props;
    console.error({ user });
    return (
      <div>
        <h1>
          Form User
        </h1>
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
    isFetching: state.user.isFetching,
    users: state.user.users,
    message: state.user.message,
    error: state.user.error,
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(User));
