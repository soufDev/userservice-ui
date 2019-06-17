import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import {
 Message, Grid, Loader, Table, Icon, Button 
} from 'semantic-ui-react';
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

  renderTableData() {
    const { users, isFetching } = this.props;
    return users.map((user, index) => (
      <Table.Row key={index}>
        <Table.Cell>{index + 1}</Table.Cell>
        <Table.Cell>{user.username}</Table.Cell>
        <Table.Cell>{user.email}</Table.Cell>
        <Table.Cell>{user.firstname}</Table.Cell>
        <Table.Cell>{user.lastname}</Table.Cell>
        <Table.Cell>
          <Button color="red" onClick={() => this.props.history.push(`user/delete/${user.id}`)}>
            {!isFetching && <Icon name="remove" />}
            {isFetching && <Icon loading name="spinner" />}
          </Button>
          <Button color="green" onClick={() => this.props.history.push(`user/edit/${user.id}`)}>
            <Icon name="edit" />
          </Button>
          <Button color="blue" onClick={() => this.props.history.push(`user/detail/${user.id}`)}>
            <Icon name="zoom" />
          </Button>
        </Table.Cell>
      </Table.Row>
    ));
  }

  renderTable() {
    const { isFetching, message } = this.props;
    return (
      <Grid centered>
        <Grid.Row>
          <Loader active={isFetching} inline />
          {message && <Message error header={message} />}
        </Grid.Row>
        {!isFetching && (
        <Grid.Row>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>#</Table.HeaderCell>
                <Table.HeaderCell>Username</Table.HeaderCell>
                <Table.HeaderCell>Email</Table.HeaderCell>
                <Table.HeaderCell>First Name</Table.HeaderCell>
                <Table.HeaderCell>Last Name</Table.HeaderCell>
                <Table.HeaderCell />
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.renderTableData()}
            </Table.Body>
          </Table>
        </Grid.Row>
)}
      </Grid>
    );
  }

  renderForm() {
    return (
      <React.Fragment>
        <h1>
          Form User
        </h1>
        {this.renderTable()}
      </React.Fragment>
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
