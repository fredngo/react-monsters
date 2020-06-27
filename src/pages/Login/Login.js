import React from 'react';

import UserForm from '../../components/UserForm/UserForm';

const Login = ({user, setUser, setRedirect, toggleModal}) => {

  const callApi = () => {
    console.log('Logging In via API');
  }

  return (
    <UserForm
      user={user}
      setUser={setUser}
      callApi={callApi}
      toggleModal={toggleModal}
      modalName='login'
      headerText='Login to your Account'
      buttonText='Login'
      redirectNotice='Login successful'
      redirectTo='/'
      setRedirect={setRedirect}
    />
  );
}

export default Login;
