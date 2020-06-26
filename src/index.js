import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import App from './App';

import 'bootstrap/dist/css/bootstrap.min.css';
import Parse from 'parse';
import dotenv from 'dotenv';

dotenv.config();

Parse.initialize(process.env.REACT_APP_PARSE_APPLICATION_ID, process.env.REACT_APP_PARSE_JAVASCRIPT_KEY);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
