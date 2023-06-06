import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./Movies.css";
import Preloader from "../Preloader/Preloader";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";

function Movies({isLoggedIn, isLoading, movies, savedMovies, isBurger, onBurger, isBurgerActive, searchResults, onSave, onRemove, onSearchClick, searchKeyword, checkbox, setCheckbox}) {

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isBurger={isBurger}
        onBurger={onBurger}
        isBurgerActive={isBurgerActive}
      />
      <main className="movies">
        <SearchForm
          onSearchClick={onSearchClick}
          searchKeyword={searchKeyword}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
        {isLoading && <Preloader/>}
        {searchKeyword && movies.length === 0 ? <MoviesNotFound/> :
          <MoviesCardList
            movies={movies}
            searchResults={searchResults}
            savedMovies={savedMovies}
            checkbox={checkbox}
            onSave={onSave}
            onRemove={onRemove}
          />
        }
      </main>
      <Footer/>
    </>
  );
}

export default Movies;
