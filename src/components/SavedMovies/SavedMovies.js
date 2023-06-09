import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import "./SavedMovies.css";
import MoviesNotFound from "../MoviesNotFound/MoviesNotFound";

function SavedMovies({isLoggedIn, isBurger, onBurger, isBurgerActive, savedMovies, searchResults, isLoading, onSave, onRemove, onSearchClick, searchKeyword, checkbox, setCheckbox}) {

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isBurger={isBurger}
        onBurger={onBurger}
        isBurgerActive={isBurgerActive}
      />
      <main className="saved-movies__content">
        <SearchForm
          onSearchClick={onSearchClick}
          searchKeyword={searchKeyword}
          checkbox={checkbox}
          setCheckbox={setCheckbox}
        />
        {isLoading && <Preloader/>}
        {searchKeyword && savedMovies.length === 0 ? <MoviesNotFound/> :
          <MoviesCardList
            movies={savedMovies}
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

export default SavedMovies;
