import React from 'react';
import AuthForm from "../AuthForm/AuthForm";

function Register(props){
  return (
    <AuthForm
      name="signup"
      title="Добро пожаловать!"
      buttonText="Зарегистрироваться"
      isRegister={true}
      isLogin={false}
      onRegister={props.onRegister}
      isTooltip={props.isTooltip}
      isAuthError={props.isAuthError}
    />
  );

}

export default Register;
