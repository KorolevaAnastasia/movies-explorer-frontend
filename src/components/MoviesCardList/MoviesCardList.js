import React from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";
import {serverUrl} from "../../utils/constants";

function MoviesCardList({movies}) {

  function getDuration(min) {
    let hours = Math.trunc(min/60);
    let minutes = min % 60;
    return hours ? `${hours}ч ${minutes}м` : `${minutes}м`;
  }

  return (
    <>
      {movies.map((movie) => (
        <MoviesCard
          key={movie.id}
          title={movie.nameRU}
          image={serverUrl+movie.image.url}
          time={getDuration(movie.duration)}
          like={movie.like}
        />))}
    </>
  )
}

export default MoviesCardList;
