import React from 'react';
import {Link} from 'react-router-dom';

const InternalServerError = ({location}) => (
  <>
    <Link to='/'>Home</Link>
    <h1>Internal Server Error</h1>
  </>
);

export default InternalServerError;
