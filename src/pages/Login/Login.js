import React from 'react';

import UserForm from '../../components/UserForm/UserForm';

const Login = ({user, setUser, setRedirect}) => {

  const callApi = () => {

  }

  return (
    <div className="container">
      <div className="row">
        <h1 className="mt-4">Login</h1>
      </div>
      <div className="row">
        <UserForm
          user={user}
          setUser={setUser}
          callApi={callApi}
          redirectNotice='Login successful'
          redirectTo='/'
          setRedirect={setRedirect}
        />
      </div>
    </div>
  );
}

export default Login;
