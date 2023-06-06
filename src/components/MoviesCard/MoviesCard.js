import React from 'react';
import "./MoviesCard.css";
import {useLocation} from "react-router-dom";
import Button from "../Button/Button";
import {serverUrl} from "../../utils/constants";

function MoviesCard({movie, savedMovies, onSave, onRemove}) {
  const location = useLocation();
  const isSaved = savedMovies ? savedMovies.some((i) => i.movieId == movie.id) : false;

  function getDuration(min) {
    let hours = Math.trunc(min/60);
    let minutes = min % 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  function handleMovieSave() {
    onSave(movie);
  }

  function handleMovieRemove() {
    onRemove(movie);
  }

  return (
    <article className="movies__card">
      <div className="movies__group">
        <h2 className="movies__title">{movie.nameRU}</h2>
        <p className="movies__time">{getDuration(movie.duration)}</p>
        {location.pathname === "/movies" ?
          <Button className={`button_like ${isSaved ? 'button_like_active' : ''}`} type='button' event={handleMovieSave}
          /> :
          <Button className='button_remove' type='button' event={handleMovieRemove}
          />
        }
      </div>
      <a href={movie.trailerLink}
         target="_blank"
         rel="noreferrer">
        <img className="movies__img" src={movie.image.url ? serverUrl+movie.image.url : movie.image} alt="Изображение"/>
      </a>
    </article>
  )
}

export default MoviesCard;
