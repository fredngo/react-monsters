import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App';

import dotenv from 'dotenv';
dotenv.config();

console.log('REACT_APP_MONSTERS_API_ID =', process.env.REACT_APP_MONSTERS_API_ID);
console.log('REACT_APP_MONSTERS_API_SECRET =', process.env.REACT_APP_MONSTERS_API_SECRET);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
