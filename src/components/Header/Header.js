import React from 'react';
import "./Header.css";
import {Link} from "react-router-dom";
import Navigation from "../Navigation/Navigation";

function Header({isLoggedIn, isBurger, onBurger, isBurgerActive}) {
  return (
      <header className="header">
        <Link className="header__logo" to="/"/>
        <div className={`header__block ${!isLoggedIn || isBurger ? 'header__block_reverse' : ''}`}>
          {isLoggedIn ?
            <Navigation
              isBurger={isBurger}
              onBurger={onBurger}
              isBurgerActive={isBurgerActive}
            />
            :
            <div className="header__auth">
              <Link to="/signup" className="header__link">Регистрация</Link>
              <Link to="/signin" className="header__link header__link_auth">Войти</Link>
            </div>
          }
        </div>
      </header>
  )
}

export default Header;
