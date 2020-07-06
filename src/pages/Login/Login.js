import React from 'react';
import UserForm from '../../components/UserForm/UserForm';
import ParseService from "../../services/ParseService";

const Login = ({setCurrentUser, setRedirect, toggleModal}) => {

  const callApi = user => ParseService.login(user);

  return (
    <UserForm
      setCurrentUser={setCurrentUser}
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
