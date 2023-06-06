import React, { useContext } from 'react';
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import { name, email } from "../../hooks/validation";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Tooltip from "../Tooltip/Tooltip";

function Profile({isLoggedIn, onLogout, onProfileUpdate, isBurger, onBurger, isBurgerActive, errorText, isEdit, onEdit, isTooltip}) {
  const currentUser = useContext(CurrentUserContext);
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: currentUser.email,
      name: currentUser.name,
    },
    mode: "onChange"
  });

  const onSubmit = data => {
    onProfileUpdate({
      name: data.name,
      email: data.email,
    });
  };

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isBurger={isBurger}
        onBurger={onBurger}
        isBurgerActive={isBurgerActive}
      />
      <main className="profile">
        <section className="profile__container">
          <h2 className="profile__title">Привет, {currentUser.name}!</h2>
          <form name='profile' onSubmit={handleSubmit(onSubmit)} className='profile__fields'>
            <div className='profile__field'>
              <label className='profile__label'>Имя</label>
              <input className="profile__input" type="text" required={true}
                     {...register('name', name(!isEdit))}/>
              {errors?.name && (
                <span className="name-input-error profile-field__error">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='profile__field'>
              <label className='profile__label'>Email</label>
              <input className="profile__input" type="text" required={true}
                     {...register('email', email(!isEdit))}/>
                {errors?.email && (
                <span className="email-input-error profile-field__error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='profile__buttons'>
              {isTooltip && <Tooltip type='message' message={'Данные профиля успешно обновлены!'}/>}
              {errorText && <Tooltip type='error' message={errorText}/>}
              {!isEdit ?
                (
                  <>
                    <Button
                      name='Редактировать'
                      type='button'
                      event={onEdit}
                    />
                    <Button
                      event={onLogout}
                      name='Выйти из аккаунта'
                      className='button_logout'
                      type='button'
                    />
                  </>
                ) :
                  <Button
                    disabled={!isValid}
                    name='Сохранить'
                    type='submit'
                    className={`button_submit ${!isValid ? 'button_disabled' : ''}`}
                  />
                }
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile;
