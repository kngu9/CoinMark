import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { PersistGate } from 'redux-persist/lib/integration/react'
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import DefaultNavigator from './src/navigations/DefaultNavigator';
import rootReducer from './src/reducers';

const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <DefaultNavigator />
        </PersistGate>
      </Provider>
    );
  }
}