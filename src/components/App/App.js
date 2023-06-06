import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useNavigate, useLocation} from 'react-router-dom';

import Login from "../Login/Login";
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import SavedMovies from "../SavedMovies/SavedMovies";
import {getMovies} from "../../utils/MoviesApi";
import authApi from "../../utils/authApi";
import {errorMessages} from "../../utils/constants";
import {
  getProfile,
  getSavedMovies,
  removeSavedMovie,
  addSavedMovie,
  updateProfile
} from "../../utils/MainApi";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setUser] = React.useState({});
  const [isProfileEdit, setIsProfileEdit] = React.useState(false);

  const [windowWidth, setWindowWidth] = useState(getCurrentDimension());
  const [isBurger, setIsBurger] = React.useState(false);
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);

  const [errorText, setErrorText] = React.useState('');
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]); //все
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные
  const [searchResults, setSearchResults] = React.useState([]); //результаты поиска по всем
  const [searchSavedMoviesResults, setSearchSavedMoviesResults] = React.useState([]); //результаты поиска по cj[hfytyysv
  const [searchKeyword, setSearchKeyword] = useState(''); //ключевое слово
  const [isShortMovie, setIsShortMovie] = useState(false); //чекбокс короткометражки

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      authApi.checkToken(jwt).then(user => {
        setIsLoggedIn(true);
        setUser(user);
      }).catch(error => {
        console.log(error);
        handleLogout();
      })
    }
  }, [navigate]);

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([getProfile(), getSavedMovies()]).then(([user, movies]) => {
          setUser(user);
          setSavedMovies(movies);
        })
      .catch((err) => setSearchResults([]));
    }
  }, [isLoggedIn]);


  useEffect(() => {
    const updateDimension = () => {
      setWindowWidth(getCurrentDimension())
      if (windowWidth <= 780){
        setIsBurger(true);
      }
      else{
        setIsBurger(false);
      }
    }
    updateDimension();
    window.addEventListener('resize', updateDimension);
    return(() => {
      window.removeEventListener('resize', updateDimension);
    })
  }, [windowWidth]);

  //в localStorage
  //все фильмы
  useEffect(() => {
    if(isLoggedIn)
      if(movies.length === 0) {
        if ('allMovies' in localStorage) {
          setMovies(JSON.parse(localStorage.getItem('allMovies')).data);
        } else {
          setIsLoading(true);
          Promise.all([getMovies()]).then(([data]) => {
            setMovies(data);
          }).catch((err) => {
            console.error(err);
          }).
          finally(() => setIsLoading(false));
        }
      }
  }, [movies, isLoggedIn]);

  //сохраненные
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
  }, [savedMovies, isLoggedIn]);

  //результаты поиска
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('searchResults', JSON.stringify(searchResults));
  }, [searchResults, isLoggedIn]);

  //результаты поиска по сохраненным
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('searchSavedMoviesResults', JSON.stringify(searchSavedMoviesResults));
  }, [searchSavedMoviesResults, isLoggedIn]);

  //ключевое слово
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('searchKeyword', searchKeyword);
  }, [searchKeyword, isLoggedIn]);

  //фильтр
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('isShortMovie', JSON.stringify(isShortMovie));
  }, [isShortMovie, isLoggedIn]);

  function handleBurger() {
    setIsBurgerActive(!isBurgerActive);
  }

  function getCurrentDimension(){
    return window.innerWidth;
  }

  function handeEditProfile(evt) {
    evt.preventDefault();
    setIsProfileEdit(true);
    setErrorText('');
  }

  function handleProfileUpdate(data) {
    const {name, email} = data;
    updateProfile(name, email).then(user => {
      setUser(user);
      setIsProfileEdit(false);
    }).catch(error => {
      if(error === 409)
        setErrorText(errorMessages.emailError);
      else
        setErrorText(errorMessages.error);
    });
  }

  function handleLogout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('allMovies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchSavedMoviesResults');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('isShortMovie');

    setMovies([]);
    setSavedMovies([]);
    setSearchResults([]);
    setSearchSavedMoviesResults([]);
    setSearchKeyword('');
    setIsShortMovie(false);

    setIsInfoTooltip(false);
    setErrorText('');

    setIsLoggedIn(false);
    setUser({});
    navigate('/');
  }

  function handleLogin(data) {
    const {email, password} = data;
    authApi.loginUser(email, password).then(user => {
      localStorage.setItem('jwt', user.jwt);
      setIsLoggedIn(true);
      setIsInfoTooltip(false);
      setUser(user);
      navigate('/movies');
    }).catch(error => {
      if(error === 400)
        setErrorText(errorMessages.unicError);
      else if(error === 401)
        setErrorText(errorMessages.loginError);
      else
        setErrorText(errorMessages.error);
    });
  }

  function handleRegister(data) {
    const {name, email, password} = data;
    authApi.registerUser(name, email, password).then(user => {
      setIsInfoTooltip(true);
      navigate('/signin');
    }).catch(error => {
      if(error === 409)
        setErrorText(errorMessages.emailError);
      else
        setErrorText(errorMessages.error);
    });
  }

  function removeMovie(movieId) {
    removeSavedMovie(movieId)
      .then(() => {
        setSavedMovies((state) =>
          state.filter((item) => item._id != movieId)
        );
      }).catch(error => {
      if(error === 404)
        setErrorText(errorMessages.notFoundError);
      else
        setErrorText(errorMessages.error);
    });
  }

  function handleRemoveMovieClick(movie) {
    removeMovie(movie._id);
  }

  function saveMovie(movie) {
    addSavedMovie(movie).then((savedMovie) => {
      setSavedMovies([savedMovie, ...savedMovies]);
    }).catch(error => {
      setErrorText(errorMessages.error);
    });
  }

  function handleSaveMovieClick(movie) {
    const isMovieSaved = savedMovies.some((item) => item.movieId === movie.id);
    if(isMovieSaved){
      const savedId = savedMovies.find((item) => item.movieId === movie.id)._id;
      removeMovie(savedId);
    } else
      saveMovie(movie);
  }

  //разделение поиска по всем и сохраненным фильмам
  useEffect(() => {
    if (location.pathname === "/movies" && searchKeyword && movies.length > 0) {
      const moviesResult = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase());
      });
      setSearchResults(moviesResult);
    }
  }, [movies, searchKeyword]);

  useEffect(() => {
    if(location.pathname === "/saved-movies" && searchKeyword && savedMovies.length > 0) {
      const searchedResults = savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchKeyword.toLowerCase());
      });
      setSearchSavedMoviesResults(searchedResults);
    } else {
      setSearchSavedMoviesResults(savedMovies);
    }
  }, [savedMovies, searchKeyword]);

  function handleSearchSubmit(keyword) {
    setSearchKeyword(keyword);
    setIsLoading(true);
    if(location.pathname === "/movies" && movies.length > 0) {
      const searchedResults = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchResults(searchedResults);
    }
    if(location.pathname === "/saved-movies" && savedMovies.length > 0) {
      const searchedResults = savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchSavedMoviesResults(searchedResults);
    }
    setIsLoading(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <Routes>
          <Route path="/">
            <Route index element={
              <Main
                windowWidth={windowWidth}
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
            />}/>
            <Route path="profile" element={
              <ProtectedRoute
                element={Profile}
                isLoggedIn={isLoggedIn}
                onProfileUpdate={handleProfileUpdate}
                onLogout={handleLogout}
                isTooltip={isInfoTooltip}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
                errorText={errorText}
                isEdit={isProfileEdit}
                onEdit={handeEditProfile}
              />
            }/>
            <Route path="movies" element={
              <ProtectedRoute
                element={Movies}
                isLoggedIn={isLoggedIn}
                movies={searchResults}
                savedMovies={savedMovies}
                isLoading={isLoading}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
                onSave={handleSaveMovieClick}
                onRemove={handleRemoveMovieClick}
                onSearchClick={handleSearchSubmit}
                searchKeyword={searchKeyword}
                checkbox={isShortMovie}
                setCheckbox={setIsShortMovie}
              />
            }/>
            <Route path="saved-movies" element={
              <ProtectedRoute
                element={SavedMovies}
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
                savedMovies={searchSavedMoviesResults}
                onSave={handleSaveMovieClick}
                onRemove={handleRemoveMovieClick}
                onSearchClick={handleSearchSubmit}
                searchKeyword={searchKeyword}
                checkbox={isShortMovie}
                setCheckbox={setIsShortMovie}
              />
            }/>
          </Route>

          <Route path="/signup" element={
            <Register
              onRegister={handleRegister}
              isTooltip={isInfoTooltip}
              isAuthError={errorText}
            />
          }/>
          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              isTooltip={isInfoTooltip}
              isAuthError={errorText}
            />
          }/>

          <Route path="/" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
