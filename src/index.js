import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import config from './reducers/auth'
import { createStore } from 'redux'
import { Provider } from 'react-redux';

// Create a store to store user information
const store = createStore(config)

// Open the socket channel between the client and the server
ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
