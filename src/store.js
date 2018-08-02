import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import reducers from './reducers';

export default function configureStore(initialState) {
  return createStore(
    reducers,
    initialState,
    compose(
      applyMiddleware(thunk, reduxImmutableStateInvariant),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  )
}
