import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'semantic-ui-react';

const defaultProps = {
  isFetching: false,
  edit: false,
  defaultValue: {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    about: '',
    password: ''
  }
};

const propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultValue: PropTypes.shape({
    username: PropTypes.string,
    lastname: PropTypes.string,
    firstname: PropTypes.string,
    email: PropTypes.string,
    about: PropTypes.string,
    password: PropTypes.string
  }),
  edit: PropTypes.bool,
  isFetching: PropTypes.bool,
};

const UserForm = ({ defaultValue, onChange, isFetching, edit }) => (
  <div>
    <Form loading={isFetching}>
      <Form.Field required>
        <label htmlFor="username">Username</label>
        <input type="text" onChange={onChange} name="username" value={defaultValue.username} />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="firstname">First Name</label>
        <input type="text" onChange={onChange} name="firstname" value={defaultValue.firstname} />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="lastname">Last Name</label>
        <input type="text" onChange={onChange} name="lastname" value={defaultValue.lastname} />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="email">email</label>
        <input type="email" onChange={onChange} name="email" value={defaultValue.email} />
      </Form.Field>
      <Form.Field required>
        <label htmlFor="about">About</label>
        <input type="text" onChange={onChange} name="text" value={defaultValue.text} />
      </Form.Field>
      {!edit && (
        <Form.Field required>
          <label htmlFor="password">Password</label>
          <input type="password" onChange={onChange} name="password" value={defaultValue.password} />
        </Form.Field>
      )}
    </Form>
  </div>
);

UserForm.propTypes = propTypes;
UserForm.defaultProps = defaultProps;
export default UserForm;
