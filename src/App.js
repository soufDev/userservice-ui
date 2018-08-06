import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import Header from './components/Header/Header';

import configureStore from './store';
import './App.css';
import Home from './components/Home/Home';
import User from './components/user/User';

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
          <div>
            <Header items={['home', 'about']} />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/' component={Home} />
              <Route path='/user' component={User} />
            </Container>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
