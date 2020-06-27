import React from 'react';

import UserForm from '../../components/UserForm/UserForm';

const Login = ({user, setUser, setRedirect}) => {

  const callApi = () => {

  }

  return (
    <UserForm
      user={user}
      setUser={setUser}
      callApi={callApi}
      headerText='Login to your Account'
      buttonText='Login'
      redirectNotice='Login successful'
      redirectTo='/'
      setRedirect={setRedirect}
    />
  );
}

export default Login;
