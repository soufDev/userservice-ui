import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Message, Modal } from "semantic-ui-react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as userActions from '../../actions/user';

const defaultProps = {
  headerText: 'Delete User',
  contentText: 'Are you sure, you want to delete this User ?',
  message: null,
  error: null,
  status: null,
};

const propTypes = {
  headerText: PropTypes.string,
  contentText: PropTypes.string,
  actions: PropTypes.shape({
    deleteUser: PropTypes.func,
  }).isRequired,
  error: PropTypes.bool,
  match: PropTypes.shape({
    param: PropTypes.object,
  }).isRequired,
  isFetching: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  message: PropTypes.string,
  status: PropTypes.number,
}
class UserDelete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true,
    };
    this.onClose = this.onClose.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onClose() {
    this.props.history.push('/user');
  }

  async onDelete() {
    const { actions, history } = this.props;
    const { id } = this.props.match.params;
    await actions.deleteUser(id);
    const { status } = this.props;
    if (status === 200) {
      history.push('/user');
    }
  }
  render() {
    const { isFetching, error, message, headerText, contentText } = this.props;
    return (
      <Modal open closeOnEscape closeOnRootNodeClick={false} onClose={this.onClose}>
        <Modal.Header>{headerText}</Modal.Header>
        <Modal.Content>
          {error && (
            <Message negative>
              <Message.Header>{message}</Message.Header>
            </Message>
          )}
          <h3>{contentText}</h3>
        </Modal.Content>
        <Modal.Actions>
          <Button default onClick={this.onClose}>No</Button>
          <Button
            negative
            labelPosition="right"
            icon="x"
            content="Yes"
            onClick={this.onDelete}
            loading={isFetching}
          />
        </Modal.Actions>
      </Modal>
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
    error: state.userReducer.error,
    isFetching: state.userReducer.isFetching,
    message: state.userReducer.message,
    status: state.userReducer.status,
  }
}

UserDelete.defaultProps = defaultProps;
UserDelete.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UserDelete));
