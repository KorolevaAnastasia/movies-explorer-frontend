import React, {useEffect, useState} from 'react';
import MoviesCard from "../MoviesCard/MoviesCard";
import Button from "../Button/Button";
import "./MoviesCardList.css";
import {DESKTOP_WIDTH, MOBILE_WIDTH, TABLET_WIDTH} from "../../utils/constants";

function MoviesCardList({movies, savedMovies, searchResults, checkbox, onSave, onRemove}) {
  const [paginate, setPaginate] = useState(0);
  const [paginateButton, setPaginateButton] = useState(false);
  const shortMovies = movies.filter((movie) => movie.duration <= 40);
  const moviesToRender = checkbox ? shortMovies : movies;

  useEffect(() => {
    changePaginate()
  }, [])

  useEffect(() => {
    if (moviesToRender.length === 0) {
      setPaginateButton(false);
    }
    if (paginate >= moviesToRender.length)
      setPaginateButton(false);
    else
      return setPaginateButton(true);
  }, [moviesToRender, paginate]);

  function changePaginate() {
    if(window.innerWidth > 1280)
      return setPaginate(12);
    else if(window.innerWidth >= TABLET_WIDTH && window.innerWidth <= DESKTOP_WIDTH)
      return setPaginate(8);
    else if(window.innerWidth < MOBILE_WIDTH)
      return setPaginate(5);
  }

  function handlePaginate() {
    if(window.innerWidth > 1280)
      return setPaginate(paginate + 3);
    else if(window.innerWidth <= DESKTOP_WIDTH)
      return setPaginate(paginate + 2);
  }

  return (
    <>
      <section className="movies__block">
        {moviesToRender.slice(0, paginate).map((movie) => (
          <MoviesCard
            key={movie.id ?? movie.movieId}
            movie={movie}
            searchResults={searchResults}
            savedMovies={savedMovies}
            onSave={onSave}
            onRemove={onRemove}
          />))}
      </section>
      {paginateButton &&
        <div className='movies__button'>
          <Button
            name='Ещё'
            type='button'
            className='button_more'
            event={handlePaginate}
          />
        </div>}
    </>
  )
}

export default MoviesCardList;
