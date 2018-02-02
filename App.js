import React from 'react';
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

import DefaultNavigator from './src/navigations/DefaultNavigator';
import reducers from './src/reducers';

const store = createStore(reducers, applyMiddleware(logger));

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <DefaultNavigator />
      </Provider>
    );
  }
}