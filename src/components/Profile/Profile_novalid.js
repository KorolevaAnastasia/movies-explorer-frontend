import React, {useContext} from 'react';
import "./Profile.css";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
import {Link} from "react-router-dom";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [isEdit, setIdEdit] = React.useState(false);
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleEmailChange(evt) {
    setEmail(evt.target.value);
  }

  function handeEditProfile(evt) {
    evt.preventDefault();
    setIdEdit(true);
  }

  function handeSubmitProfile(evt) {
    evt.preventDefault();
    setIdEdit(false);
    props.onProfileUpdate({
      name: name,
      email: email,
    });
  }

  return (
    <section className="profile">
      <div className="profile__container">
        <h2 className="profile__title">Привет, {currentUser.name}!</h2>
        <form name={props.name} onSubmit={handeSubmitProfile} className='profile__fields'>
          <div className='profile__field'>
            <label className='profile__label'>Имя</label>
            <input
              name='name'
              type="text"
              className='profile__input'
              disabled={!isEdit}
              value={name ?? ''}
              required
              minLength="2" maxLength="30"
              onChange={handleNameChange}/>
          </div>
          <span className="name-input-error profile-field__error"/>
          <div className='profile__field'>
            <label className='profile__label'>Email</label>
            <input
              name='email'
              type="text"
              className='profile__input'
              disabled={!isEdit}
              value={email ?? ''}
              required
              minLength="2" maxLength="200"
              onChange={handleEmailChange}/>
          </div>
          <span className="email-input-error profile-field__error"/>
          <div className='profile__buttons'>
            {!isEdit ?
              (<button
                className='profile__button'
                aria-label="Редактировать"
                value="Редактировать"
                onClick={handeEditProfile}
              >Редактировать</button>) :
              (<button
                className='profile__button'
                type="submit"
                aria-label="Сохранить"
                value="Сохранить"
              >Сохранить</button>)}
            <Link
              onClick={props.onLogout}
              className='profile__button profile__button_logout'
              to='/signin'>
              Выйти из аккаунта
            </Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default Profile;
