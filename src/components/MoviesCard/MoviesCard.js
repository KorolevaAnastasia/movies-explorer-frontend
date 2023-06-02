import React from 'react';
import "./MoviesCard.css";
import {useLocation} from "react-router-dom";
import Button from "../Button/Button";

function MoviesCard(props) {
  const location = useLocation();

  return (
    <article className="movies__card">
      <div className="movies__group">
        <h2 className="movies__title">{props.title}</h2>
        <p className="movies__time">{props.time}</p>
        {location.pathname === "/movies" ?
          <Button className={`button__like ${props.like ? 'button__like_active' : ''}`} type='button'
          /> :
          <Button className='button__remove' type='button'
          />
        }
      </div>
      <img className="movies__img" src={props.image} alt="Изображение"/>
    </article>
  )
}

export default MoviesCard;
