// Import all packages related to React
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

// Import all frontend-specific files
import App from './App';
import './index.css';

// Import the Provider package 
import { Provider } from 'react-redux';
import store from './Store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Allow for the Redux store to be used
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();