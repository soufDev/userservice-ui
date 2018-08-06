import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, Grid, Message } from "semantic-ui-react";

import * as userActions from '../../actions/user';
import UserForm from "./UserForm";

const defaultValue = {
  message: undefined,
  isFetching: null,
  history: null,
};

const propTypes = {
  message: PropTypes.string,
  isFetching: PropTypes.bool,
  actions: PropTypes.shape({
    getUser: PropTypes.func,
    updateUser: PropTypes.func,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

class UserEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.onChange = this.onChange.bind(this);
    this.renderForm = this.renderForm.bind(this);
    this.checkResult = this.checkResult.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.cancelUpdate = this.cancelUpdate.bind(this);
  }

  componentDidMount() {
    const { actions } = this.props;
    const { params } = this.props.match;
    actions.getUser(params.id).then(() => {
      const { user } = this.props;
      this.setState({ user: {...user} });
    });
  }

  onChange(e) {
    let { user } = this.state;
    user[`${e.target.name}`] = e.target.value;
    this.setState({ user });
  }

  updateUser() {
    const { user } = this.state;
    console.log(user);
    console.log(this.state.user);
    const { actions } = this.props;
    actions.updateUser(user).then(() => {
      this.checkResult();
    });
  }

  checkResult() {
    const { error } = this.props;
    if (!error) this.props.history.push('/user');
  }

  cancelUpdate() {
    this.props.history.push('/user');
  }
  renderForm() {
    const { isFetching, message } = this.props;
    const { user } = this.state;
    return (
      <React.Fragment>
        {message && <Message error header={message} />}
        <hr/>
        <UserForm defaultValue={user} edit={true} isFetching={isFetching} onChange={this.onChange} />
        <hr/>
        <Grid>
          <Grid.Column width={2} floated="right">
            <Button color="green" loading={isFetching} onClick={this.updateUser}>Submit</Button>
          </Grid.Column>
          <Grid.Column width={6} floated="right">
            <Button loading={isFetching} onClick={this.cancelUpdate}>Cancel</Button>
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }

  render() {
    return (
      <div>
        <h1>USER EDIT</h1>
        {this.renderForm()}
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    error: state.userReducer.error,
    user: state.userReducer.user,
    users: state.userReducer.users,
    isFetching: state.userReducer.isFetching,
  }
}
UserEdit.defaultProps = defaultValue;
UserEdit.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserEdit));
