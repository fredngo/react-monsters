import React from 'react';

import UserForm from '../../components/UserForm/UserForm';

const Signup = ({user, setUser, setRedirect}) => {

  const callApi = () => {

  }

  return (
    <UserForm
      user={user}
      setUser={setUser}
      callApi={callApi}
      headerText='Get an Account'
      buttonText='Sign up!'
      redirectNotice='Signup successful'
      redirectTo='/'
      setRedirect={setRedirect}
    />
  );
}

export default Signup;
