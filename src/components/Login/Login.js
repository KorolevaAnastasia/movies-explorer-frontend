import React from 'react';
import AuthForm from "../AuthForm/AuthForm";

function Login(props){
  return (
    <AuthForm
      name="signin"
      title="Рады видеть!"
      buttonText="Войти"
      isRegister={false}
      isLogin={true}
      onLogin={props.onLogin}
      isTooltip={props.isTooltip}
      isAuthError={props.isAuthError}
    />
  )

}

export default Login;
