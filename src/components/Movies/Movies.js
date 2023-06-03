import React, {useCallback, useEffect, useState} from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";
import Button from "../Button/Button";

function Movies({isLoggedIn, isLoading, movies, isBurger, onBurger, isBurgerActive}) {
  const [isSearchResults, setIsSearchResults] = React.useState(['test']);
  const [paginate, setPaginate] = useState(12);
  const [paginateButton, setPaginateButton] = useState(false);

  useEffect(() => {
    if (movies.length === 0) {
      setPaginateButton(false);
    }
    if (paginate >= movies.length)
      setPaginateButton(false);
    else
      return setPaginateButton(true);
  }, [movies, paginate]);

  function changePaginate() {
    setPaginate(paginate + 3);
  }

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isBurger={isBurger}
        onBurger={onBurger}
        isBurgerActive={isBurgerActive}
      />
      <main className="movies">
        <SearchForm/>
        {isLoading ?
          <Preloader /> :
          <section className="movies__block">
            <MoviesCardList
              movies={movies.slice(0, paginate)}
            />
          </section>
        }
        {isSearchResults.length === 0 && <MoviesNotFound/>}
        {paginateButton &&
          <div className='movies__button'>
            <Button
              name='Ещё'
              type='button'
              className='button_more'
              event={changePaginate}
            />
          </div>
        }
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
