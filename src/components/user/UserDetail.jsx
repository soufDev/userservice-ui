import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import * as userActions from '../../actions/user';
import UserDetailForm from "./UserDetailForm";


const defaultProps = {
  message: null,
  error: null,
  isFetching: null,
  user: {},
};

const propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  message: PropTypes.string,
  error: PropTypes.bool,
  isFetching: PropTypes.bool,
  user: PropTypes.object,
};

class UserDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { actions } = this.props;
    const { id } = this.props.match.params;
    actions.getUser(id).then(() => {
      const { user } = this.props;
      console.log('getUser', user);
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.props;
    console.log('render', user);
    return (
      <React.Fragment>
        <h1>USER DETAILS</h1>
        <UserDetailForm defaultValue={this.props.user} />
      </React.Fragment>
    )
  }
}

UserDetail.defaultProps = defaultProps;
UserDetail.propTypes = propTypes;

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch),
  }
}

function mapStateToProps(state) {
  return {
    message: state.userReducer.message,
    isFetching: state.userReducer.isFetching,
    error: state.userReducer.error,
    user: state.userReducer.user,
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDetail));
