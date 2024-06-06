import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import bungieReducer from './bungie_routes';
import bungieItemReducer from './bungie_item_routes';
import manifestReducer from './bungie_manifest_routes';

const rootReducer = combineReducers({
  //session,
  bungieData: bungieReducer,
  bungieItemData: bungieItemReducer,
  manifest: manifestReducer,
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  //const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;