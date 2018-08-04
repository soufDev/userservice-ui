import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {HashRouter as Router, Route} from 'react-router-dom';
import {Container} from 'semantic-ui-react';

import Header from './components/Header/Header'

import configureStore from './store';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header items={['home', 'about']}/>
        </div>
      </Router>
    );
  }
}

export default App;
