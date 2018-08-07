import React from 'react';
import {Button, Form, Grid, Image, TextArea} from 'semantic-ui-react';

const defaultProps = {
  values: {
    picture: '//placehold.it/250'
  }
}
const DetailForm = (
  values,
  onNext,
  onPrevious,
  onCancel,
  isFetching,
) => {
  const { defaultValue } = values;
  return (
    <React.Fragment>
      <hr />
      <Grid>
        <Grid.Column width={5}>
          <Grid.Row>
            <Image src={'//placehold.it/250'} />
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={11}>
          <h2>{defaultValue.firstname} {defaultValue.lastname}</h2>
          <Form>
            <Form.Field>
              <label htmlFor="firstname">First Name</label>
              <input type="text" name="firstname" value={defaultValue.firstname} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="lastname">Last Name</label>
              <input type="text" name="lastname" value={defaultValue.lastname} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="company">Company</label>
              <input type="text" name="company" value={defaultValue.company} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={defaultValue.username} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="email">Email</label>
              <input type="text" name="email" value={defaultValue.email} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="phone">Phone</label>
              <input type="text" name="phone" value={defaultValue.phone} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="address">Address</label>
              <input type="text" name="address" value={defaultValue.address} disabled />
            </Form.Field>
            <Form.Field>
              <label htmlFor="about">About</label>
              <TextArea name="address" value={defaultValue.about} disabled />
            </Form.Field>
            <Form.Field>
              <Button onClick={onPrevious} loading={isFetching} color="blue">Previous</Button>
              <span />
              <Button onClick={onNext} loading={isFetching} color="green">Next</Button>
              <span />
              <Button onClick={onCancel} loading={isFetching} default>Cancel</Button>
            </Form.Field>
          </Form>
        </Grid.Column>
      </Grid>
    </React.Fragment>
  )
}

DetailForm.defaultProps = defaultProps;

export default DetailForm;
