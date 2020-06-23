import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = ({location}) => (
  <>
    <p id="notice">{location.state?.notice ? location.state.notice : ''}</p>
    <Link to='/'>Home</Link>
    <h1>404 Not Found</h1>
  </>
);

export default NotFound;
