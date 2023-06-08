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
import {errorMessages, TABLET_WIDTH} from "../../utils/constants";
import {
  getSavedMovies,
  removeSavedMovie,
  addSavedMovie,
  updateProfile, getProfile,
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
  const [movies, setMovies] = useState([]); //все фильмы
  const [savedMovies, setSavedMovies] = useState([]); //сохраненные фильмы
  const [searchResults, setSearchResults] = React.useState(JSON.parse(localStorage.getItem('searchResults')) ?? []); //результаты поиска по всем фильмам
  const [searchSavedResults, setSearchSavedResults] = React.useState(JSON.parse(localStorage.getItem('searchSavedResults')) ?? []); //результаты поиска по сохраненным

  const [searchKeyword, setSearchKeyword] = useState(localStorage.getItem('searchKeyword') ?? ''); //ключевое слово
  const [searchSavedKeyword, setSearchSavedKeyword] = useState(localStorage.getItem('searchSavedKeyword') ?? ''); //ключевое слово сохраненных

  const [isShortMovie, setIsShortMovie] = useState(JSON.parse(localStorage.getItem('isShortMovie')) ?? false); //чекбокс короткометражки
  const [isShortSavedMovie, setIsShortSavedMovie] = useState(JSON.parse(localStorage.getItem('isShortSavedMovie')) ?? false); //чекбокс сохраненных короткометражек

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const updateDimension = () => {
      setWindowWidth(getCurrentDimension())
      if (windowWidth <= TABLET_WIDTH){
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

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    const currentUrl = location.pathname;

    if (jwt) {
      authApi.checkToken(jwt).then(user => {
        setIsLoggedIn(true);
        setUser(user);
        setErrorText('');
        setIsInfoTooltip(false);
        navigate(currentUrl);
      }).catch(error => {
        console.log(error);
        handleLogout();
      })
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn)
      if(movies.length === 0) {
        if ('movies' in localStorage) {
          setMovies(JSON.parse(localStorage.getItem('movies')));
        } else {
          setIsLoading(true);
          Promise.all([getMovies()]).then(([data]) => {
            setMovies(data);
            localStorage.setItem('movies', JSON.stringify(data));
          }).catch((err) => {
            console.error(err);
          }).
          finally(() => setIsLoading(false));
        }
      }
  }, [movies, isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn)
      if (savedMovies.length === 0) {
        if ('savedMovies' in localStorage) {
          setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
        } else {
          setIsLoading(true);
          Promise.all([getSavedMovies()]).then(([data]) => {
            setSavedMovies(data);
            localStorage.setItem('savedMovies', JSON.stringify(data));
          }).catch((err) => {
            console.error(err);
          }).finally(() => setIsLoading(false));
        }
      }
  }, [isLoggedIn]);

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
      localStorage.setItem('searchSavedResults', JSON.stringify(searchSavedResults));
  }, [searchSavedResults, isLoggedIn]);

  //ключевое слово
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('searchKeyword', searchKeyword);
  }, [searchKeyword, isLoggedIn]);

  //ключевое слово
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('searchSavedKeyword', searchSavedKeyword);
  }, [searchSavedKeyword, isLoggedIn]);

  //фильтр
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('isShortMovie', JSON.stringify(isShortMovie));
  }, [isShortMovie, isLoggedIn]);

  //фильтр
  useEffect(() => {
    if(isLoggedIn)
      localStorage.setItem('isShortSavedMovie', JSON.stringify(isShortSavedMovie));
  }, [isShortSavedMovie, isLoggedIn]);

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
    if(location.pathname === "/saved-movies" && searchSavedKeyword && savedMovies.length > 0) {
      const searchedResults = savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(searchSavedKeyword.toLowerCase());
      });
      setSearchSavedResults(searchedResults);
    } else {
      setSearchSavedResults(savedMovies);
    }
  }, [savedMovies, searchSavedKeyword]);

  function handleBurger() {
    setIsBurgerActive(!isBurgerActive);
  }

  function getCurrentDimension(){
    return window.innerWidth;
  }

  function handeEditProfile() {
    setIsProfileEdit(true);
    setIsInfoTooltip(false);
    setErrorText('');
  }

  function handleProfileUpdate(data) {
    const {name, email} = data;
    updateProfile(name, email).then(user => {
      setUser(user);
      setIsInfoTooltip(true);
    }).catch(error => {
      if(error === 409)
        setErrorText(errorMessages.emailError);
      else
        setErrorText(errorMessages.error);
    }).finally(() => {
      setIsProfileEdit(false);
    });
    setUser(currentUser);
  }

  function getCurrentProfile(jwt) {
    getProfile(jwt).then(user => {
      setUser(user);
    }).catch(error => {
      console.log(error);
    });
  }

  function handleLogin(data) {
    const {email, password} = data;
    authApi.loginUser(email, password).then(data => {
      if(data.jwt){
        localStorage.setItem('jwt', data.jwt);
        setIsLoggedIn(true);
        getCurrentProfile(data.jwt);
        navigate('/movies');
      }
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
    authApi.registerUser(name, email, password).then((user) => {
      if(user)
        handleLogin({email: email, password: password});
    }).catch(error => {
      if(error === 409)
        setErrorText(errorMessages.emailError);
      else
        setErrorText(errorMessages.error);
    });
  }

  function handleLogout(){
    localStorage.removeItem('jwt');
    localStorage.removeItem('movies');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('searchResults');
    localStorage.removeItem('searchSavedResults');
    localStorage.removeItem('searchKeyword');
    localStorage.removeItem('searchSavedKeyword');
    localStorage.removeItem('isShortMovie');
    localStorage.removeItem('isShortSavedMovie');

    setMovies([]);
    setSavedMovies([]);
    setSearchResults([]);
    setSearchSavedResults([]);
    setSearchKeyword('');
    setSearchSavedKeyword('');
    setIsShortMovie(false);
    setIsShortSavedMovie(false);

    setIsInfoTooltip(false);
    setErrorText('');

    setIsLoggedIn(false);
    setUser({});
    navigate('/');
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

  function handleSearchSubmit(keyword) {
    setIsLoading(true);
    if(location.pathname === "/movies" && movies.length > 0) {
      setSearchKeyword(keyword);
      const searchedResults = movies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchResults(searchedResults);
    }
    if(location.pathname === "/saved-movies" && savedMovies.length > 0) {
      setSearchSavedKeyword(keyword);
      const searchedResults = savedMovies.filter((movie) => {
        return movie.nameRU.toLowerCase().includes(keyword.toLowerCase());
      });
      setSearchSavedResults(searchedResults);
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
                savedMovies={searchSavedResults}
                onSave={handleSaveMovieClick}
                onRemove={handleRemoveMovieClick}
                onSearchClick={handleSearchSubmit}
                searchKeyword={searchSavedKeyword}
                checkbox={isShortSavedMovie}
                setCheckbox={setIsShortSavedMovie}
              />
            }/>
          </Route>

          <Route path="/signup" element={!isLoggedIn ?
            <Register
              onRegister={handleRegister}
              isTooltip={isInfoTooltip}
              isAuthError={errorText}
            /> : <Navigate to="/" replace />
          }/>
          <Route path="/signin" element={!isLoggedIn ?
            <Login
              onLogin={handleLogin}
              isTooltip={isInfoTooltip}
              isAuthError={errorText}
            /> : <Navigate to="/" replace />
          }/>

          <Route path="/" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
