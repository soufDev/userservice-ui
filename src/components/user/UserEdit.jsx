import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Grid, Message } from 'semantic-ui-react';

import * as userActions from '../../actions/user';
import UserForm from './UserForm';

const defaultValue = {
    history: null,
    match: null
};

const propTypes = {
    match: PropTypes.shape({
        params: PropTypes.shape({})
    }),
    history: PropTypes.shape({
        push: PropTypes.func
    })
};

const initialState = {
    user: {
        firstname: '',
        lastname: '',
        email: '',
        username: '',
        about: ''
    }
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT':
            return {
                ...state,
                user: { ...action.user }
            };
        case 'UPDATE':
            return {
                ...state,
                user: {
                    ...state.user,
                    [action.name]: action.value
                }
            };
        default: return state;
    }
};

export function useActions (actions, deps) {
    const dispatch = useDispatch();
    return React.useMemo(() => {
        if (Array.isArray(actions)) {
            return actions.map(a => bindActionCreators(a, dispatch));
        }
        return bindActionCreators(actions, dispatch);
    }, deps ? [dispatch, ...deps] : deps);
}

const UserEdit = (props) => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const {
        message, error, isFetching, user
    } = useSelector(({ userReducer }) => userReducer);
    const actions = useActions(userActions);
    const { match: { params } } = props;
    React.useEffect(() => {
        actions.getUser(params.id);
    }, []);

    React.useEffect(() => {
        dispatch({ type: 'INIT', user });
    }, [user]);
    function onChange (e) {
        const { name, value } = e.target;
        dispatch({ type: 'UPDATE', value, name });
    }

    function checkResult () {
        if (!error) props.history.push('/user');
    }

    function updateUser () {
        actions.updateUser(state.user).then(() => {
            checkResult();
        });
    }


    function cancelUpdate () {
        props.history.push('/user');
    }

    return (
        <div>
            <h1>Edit</h1>
            <Form
                message={message}
                user={state.user}
                isFetching={isFetching}
                onChange={onChange}
                updateUser={updateUser}
                cancelUpdate={cancelUpdate}
            />
        </div>
    );
};

function Form ({
    message, user, isFetching, onChange, updateUser, cancelUpdate
}) {
    return (
        <React.Fragment>
            {message && <Message error header={message} />}
            <hr />
            <UserForm defaultValue={user} edit isFetching={isFetching} onChange={onChange} />
            <hr />
            <Grid>
                <Grid.Column width={2} floated="right">
                    <Button color="green" loading={isFetching} onClick={updateUser}>Submit</Button>
                </Grid.Column>
                <Grid.Column width={6} floated="right">
                    <Button loading={isFetching} onClick={cancelUpdate}>Cancel</Button>
                </Grid.Column>
            </Grid>
        </React.Fragment>
    );
}

Form.defaultProps = {
    message: null,
    isFetching: null
};
Form.propTypes = {
    message: PropTypes.string,
    user: PropTypes.shape({}).isRequired,
    isFetching: PropTypes.bool,
    onChange: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    cancelUpdate: PropTypes.func.isRequired
};

UserEdit.defaultProps = defaultValue;
UserEdit.propTypes = propTypes;

export default withRouter(UserEdit);
