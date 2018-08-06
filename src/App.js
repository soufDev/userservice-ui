import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './components/Header/Header';

import configureStore from './store';
import './App.css';
import Home from './components/Home/Home';
import User from './components/user/User';
import UserEdit from './components/user/UserEdit';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    }
  }

  render() {
    const store = configureStore();
    return (
      <Provider store={store}>
        <Router>
          <React.Fragment>
            <Header items={['home', 'about']} />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path="/" component={Home} />
              <Route exact path="/user" component={User} />
              <Route exact path="/user/edit/:id" component={UserEdit} />
              <Route exact path="/user/delete/:id" component={User} />
              <Route exact path="/user/detail/:id" component={User} />
            </Container>
          </React.Fragment>
        </Router>
      </Provider>
    );
  }
}

export default App;
