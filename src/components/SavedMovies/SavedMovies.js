import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import "./SavedMovies.css";

function SavedMovies({isLoggedIn, isBurger, onBurger, isBurgerActive}) {
  const tempMoviesCards = [
    {
      "id": 1,
      "nameRU": "«Роллинг Стоунз» в изгнании",
      "nameEN": "Stones in Exile",
      "director": "Стивен Кайак ",
      "country": "США",
      "year": "2010",
      "duration": 61,
      "like": true,
      "image": {
        "url": "/uploads/stones_in_exile_b2f1b8f4b7.jpeg",
      }
    },
    {
      "id": 2,
      "nameRU": "All Tomorrow's Parties",
      "nameEN": "All Tomorrow's Parties",
      "director": " Джонатан Кауэтт",
      "country": "Великобритания",
      "year": "2009",
      "duration": 82,
      "like": true,
      "image": {
        "url": "/uploads/all_tommoros_parties_33a125248d.jpeg",
      }
    },
    {
      "id": 3,
      "nameRU": " Без обратного пути",
      "nameEN": "No Distance Left to Run",
      "director": "Уилл Лавлейс, Дилан Сотерн",
      "country": "Великобритания",
      "year": "2010",
      "duration": 104,
      "like": true,
      "image": {
        "url": "/uploads/blur_a43fcf463d.jpeg",
      }
    }
  ]

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        isBurger={isBurger}
        onBurger={onBurger}
        isBurgerActive={isBurgerActive}
      />
      <main className="saved-movies__content">
        <SearchForm/>
        <section className="movies">
          <MoviesCardList
            movies={tempMoviesCards}
          />
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default SavedMovies;
