import React from 'react';

import UserForm from '../../components/UserForm/UserForm';

const Signup = ({user, setUser, setRedirect, toggleModal}) => {

  const callApi = () => {
    console.log('Signing Up via API');

    return {
      errors: ["Some Error", "Another Error"]
    }
  }

  return (
    <UserForm
      user={user}
      setUser={setUser}
      callApi={callApi}
      toggleModal={toggleModal}
      modalName='signup'
      headerText='Get an Account'
      buttonText='Sign up!'
      redirectNotice='Signup successful'
      redirectTo='/'
      setRedirect={setRedirect}
    />
  );
}

export default Signup;
