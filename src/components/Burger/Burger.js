import React from 'react';
import "./Burger.css";
import Button from "../Button/Button";
import {NavLink} from "react-router-dom";

function Burger({onClick, isBurgerActive}) {
  return (
    <section className={`burger ${!isBurgerActive ? 'burger_inactive' : ''}`}>
      <div className='burger__overlay'></div>
      <div className='burger__content'>
        <div className='burger__header'>
          <Button
            type='button'
            event={onClick}
            className='button__nav-close'
          />
        </div>
        <div className='burger__menu'>
          <nav className="burger__navigation">
            <div className='burger__navigation-movies'>
              <NavLink to="/" onClick={onClick} className={({isActive}) => `burger__link ${isActive ? "burger__link_active" : ''}`}>Главная</NavLink>
              <NavLink to="/movies" onClick={onClick} className={({isActive}) => `burger__link ${isActive ? "burger__link_active" : ''}`}>Фильмы</NavLink>
              <NavLink to="/saved-movies" onClick={onClick} className={({isActive}) => `burger__link ${isActive ? "burger__link_active" : ''}`}>Сохранённые фильмы</NavLink>
            </div>
            <div className='burger__navigation-profile'>
              <NavLink to="/profile" onClick={onClick} className="navigation__link navigation__link_profile">Аккаунт</NavLink>
            </div>
          </nav>
        </div>
      </div>
    </section>
  )
}

export default Burger;
