import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';


import configureStore from './store';
import './App.css';

const Header = React.lazy(() => import('./components/Header/Header'));
const Home = React.lazy(() => import('./components/Home/Home'));
const User = React.lazy(() => import('./components/user/User'));
const UserEdit = React.lazy(() => import('./components/user/UserEdit'));
const UserDelete = React.lazy(() => import('./components/user/UserDelete'));
const UserDetail = React.lazy(() => import('./components/user/UserDetail'));


function App () {
    const store = configureStore();
    return (
        <Provider store={store}>
            <Router>
                <React.Suspense fallback={<h1>Loading...</h1>}>
                    <Header items={['home', 'about']} />
                    <Container style={{ marginTop: '7em' }}>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/user" component={User} />
                        <Route exact path="/user/edit/:id" component={UserEdit} />
                        <Route exact path="/user/delete/:id" component={UserDelete} />
                        <Route exact path="/user/detail/:id" component={UserDetail} />
                    </Container>
                </React.Suspense>
            </Router>
        </Provider>
    );
}

export default App;
