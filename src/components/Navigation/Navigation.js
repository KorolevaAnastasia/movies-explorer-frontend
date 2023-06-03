import React from 'react';
import "./Navigation.css";
import {NavLink} from "react-router-dom";
import Burger from "../Burger/Burger";

function Navigation({isBurger, onBurger, isBurgerActive}) {
  return (
    !isBurger ?
    <nav className="navigation">
      <div className='navigation__movies'>
        <NavLink to="/movies" className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ''}`}>Фильмы</NavLink>
        <NavLink to="/saved-movies" className={({isActive}) => `navigation__link ${isActive ? "navigation__link_active" : ''}`}>Сохранённые фильмы</NavLink>
      </div>
      <div className='navigation__profile'>
        <NavLink to="/profile" className="navigation__link navigation__link_profile">Аккаунт</NavLink>
      </div>
    </nav>
    :
    <>
      <button className="navigation__button" onClick={onBurger} />
      <Burger onClick={onBurger} isBurgerActive={isBurgerActive}/>
    </>
  )
}

export default Navigation;
