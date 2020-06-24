import React from 'react';
import {Link} from 'react-router-dom';

const NotFound = ({location}) => (
  <>
    <Link to='/'>Home</Link>
    <h1>404 Not Found</h1>
  </>
);

export default NotFound;
