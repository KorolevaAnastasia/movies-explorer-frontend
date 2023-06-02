import React, { useContext } from 'react';
import "./Profile.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useForm } from "react-hook-form";
import { name, email } from "../../hooks/validation";
import Button from "../Button/Button";
import Header from "../Header/Header";
import Tooltip from "../Tooltip/Tooltip";

function Profile({isLoggedIn, onLogout, onProfileUpdate, isBurger, onBurger, isBurgerActive}) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIsEdit] = React.useState(false); //состояния для проверки
  const [isError, setIsError] = React.useState(false); //состояния для проверки
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    /*defaultValues: {
      email: currentUser.email,
      name: currentUser.name,
    },*/
    defaultValues: {
      email: 'a.koroleva@lofice.com',
      name: 'Anastasia',
    },
    mode: "onChange"
  });

  const onSubmit = data => {
    setIsEdit(false);
    onProfileUpdate({
      name: data.name,
      email: data.email,
    });
  };

  function handeEditProfile(evt) {
    evt.preventDefault();
    setIsEdit(true);
  }

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
              <input className="profile__input" type="text"
                     {...register('name', name(!isEdit))}/>
              {errors?.name && (
                <span className="name-input-error profile-field__error">
                  {errors.name.message}
                </span>
              )}
            </div>
            <div className='profile__field'>
              <label className='profile__label'>Email</label>
              <input className="profile__input" type="text"
                     {...register('email', email(!isEdit))}/>
                {errors?.email && (
                <span className="email-input-error profile-field__error">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className='profile__buttons'>
              {!isEdit ?
                (
                  <>
                    <Button
                      name='Редактировать'
                      type='button'
                      event={handeEditProfile}
                    />
                    <Button
                      event={onLogout}
                      name='Выйти из аккаунта'
                      className='button__logout'
                      type='button'
                    />
                  </>
                ) : (
                  <>
                    {isError && <Tooltip type='error' message={'Произошла какая-то ошибка...'}/>}
                    <Button
                      disabled={!isValid}
                      name='Сохранить'
                      type='submit'
                      className={`button__submit ${!isValid || isError ? 'button__disabled' : ''}`}
                    />
                  </>
                )}
            </div>
          </form>
        </section>
      </main>
    </>
  )
}

export default Profile;
