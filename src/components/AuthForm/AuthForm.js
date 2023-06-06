import React from "react";
import {Link} from "react-router-dom";
import {email, name, password} from "../../hooks/validation";
import {useForm} from "react-hook-form";
import "./AuthForm.css";
import Button from "../Button/Button";
import Tooltip from "../Tooltip/Tooltip";

function AuthForm(props){
  const { register, handleSubmit, formState: { errors , isValid } } = useForm({
    mode: "onChange"
  });

  const onSubmit = data => {
    if(props.isLogin)
      props.onLogin({
        email: data.email,
        password: data.password
      });
    if(props.isRegister)
      props.onRegister({
        name: data.name,
        email: data.email,
        password: data.password
      });
  };

  return(
    <main className="auth">
      <div className='auth__header-block'>
        <Link to='/' className="auth__header-logo"/>
        <h1 className="auth__title">{props.title}</h1>
      </div>
      <form name={props.name} className="auth__form" onSubmit={handleSubmit(onSubmit)}>
        {props.isRegister ? (
          <div className='auth__field'>
            <label className='auth__label'>Имя</label>
            <input className={`auth__input ${errors?.name ? 'auth__input_error' : ''}`} type="text" required={true}
            {...register('name', name(false))}/>
            {errors?.name && (
              <span className="name-input-error auth-field__error">
                {errors.name.message}
              </span>
            )}
          </div>
        ) : ''}
        <div className='auth__field'>
          <label className='auth__label'>Email</label>
          <input className={`auth__input ${errors?.email ? 'auth__input_error' : ''}`} type="text" required={true}
            {...register('email', email(false))}/>
            {errors?.email && (
              <span className="email-input-error auth-field__error">
                {errors.email.message}
              </span>
            )}
        </div>
        <div className='auth__field'>
          <label className='auth__label'>Пароль</label>
          <input className={`auth__input ${errors?.password ? 'auth__input_error' : ''}`} type="password" required={true}
          {...register('password', password())}/>
          {errors?.password && (
            <span className="password-input-error auth-field__error">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className='auth__buttons'>
          {props.isAuthError && <Tooltip type='error' message={props.isAuthError}/>}
          {props.isTooltip && <Tooltip type='message' message={'Регистрация успешно пройдена!'}/>}
          <Button
            name={props.buttonText}
            className={`button_submit ${!isValid ? 'button_disabled' : ''}`}
            disabled={!isValid}
            type='submit'
          />
        </div>
      </form>
      {props.isLogin && <Link className="auth__link" to="/signup">Ещё не зарегистрированы? {<span className="auth__link auth__link_accent">Регистрация</span>}</Link>}
      {props.isRegister && <Link className="auth__link" to="/signin">Уже зарегистрированы? {<span className="auth__link auth__link_accent">Войти</span>}</Link>}
    </main>
  )
}

export default AuthForm;
