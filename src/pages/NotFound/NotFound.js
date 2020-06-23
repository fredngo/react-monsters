import React from 'react';

const NotFound = ({location}) => (
  <div>
     <h1>Nothing found for <code>{location.pathname}</code></h1>
  </div>
);

export default NotFound;
