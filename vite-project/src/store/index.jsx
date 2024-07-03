import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import logger from 'redux-logger';
import bungieReducer from './bungie_profile_routes';
import bungieItemReducer from './bungie_item_routes';
import playersReducer from './bungie_player_routes';
import authReducer from './bungie_oauth_routes';

const rootReducer = combineReducers({
  //session,
  auth: authReducer,
  bungieData: bungieReducer,
  bungieItemData: bungieItemReducer,
  players: playersReducer,
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