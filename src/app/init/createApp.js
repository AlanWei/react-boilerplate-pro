import React from 'react';
import { Provider } from 'react-redux';
import Router from './router';

const createApp = (store, history) => (
  <Provider store={store}>
    <Router history={history} />
  </Provider>
);

export default createApp;
