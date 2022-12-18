import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import './index.css';
import App from './App';
import { store } from './redux/store';
import { Login } from "./pages"

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    {/* <React.StrictMode> */}
    {/* // Provider is a component of react-redux
        // this wraps the APP component so anywhere in my app can access redux
    */}
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
    {/* </React.StrictMode>, */}
  </>
);
