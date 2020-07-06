import React from 'react';
import UserForm from '../../components/UserForm/UserForm';
import ParseService from "../../services/ParseService";

const Signup = ({setCurrentUser, setRedirect, toggleModal}) => {

  const callApi = user => ParseService.signup(user);

  return (
    <UserForm
      setCurrentUser={setCurrentUser}
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
