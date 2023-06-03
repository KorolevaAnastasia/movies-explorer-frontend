import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useNavigate} from 'react-router-dom';

import Login from "../Login/Login";
import Main from '../Main/Main';
import Profile from "../Profile/Profile";
import Register from "../Register/Register";
import NotFound from "../NotFound/NotFound";
import Movies from "../Movies/Movies";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import "./App.css";
import SavedMovies from "../SavedMovies/SavedMovies";
import axios from "axios";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setUser] = React.useState({});
  const [isInfoTooltip, setIsInfoTooltip] = React.useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  const [windowWidth, setWindowWidth] = useState(getCurrentDimension());
  const [isBurger, setIsBurger] = React.useState(false);
  const [isBurgerActive, setIsBurgerActive] = React.useState(false);
  const navigate = useNavigate();

  function handleBurger() {
    setIsBurgerActive(!isBurgerActive);
  }

  function getCurrentDimension(){
    return window.innerWidth;
  }

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
  }, [windowWidth])

  useEffect(() => {
      if(movies.length === 0) {
        if ('allMovies' in localStorage) {
          setMovies(JSON.parse(localStorage.getItem('allMovies')).data);
        } else {
          setIsLoading(true);
          axios.get('https://api.nomoreparties.co/beatfilm-movies')
            .then(response => {
              setMovies(response.data);
              localStorage.setItem('allMovies', JSON.stringify(response));
            })
            .finally(() => setIsLoading(false));
        }
      }
  }, [movies])

  useEffect(() => {
    if (isLoggedIn) {
      //temp-data
      setUser({
        name: 'Anastasia',
        email: 'a.koroleva@loftice.com'
      });
    }
  }, [isLoggedIn]);

  function handleProfileUpdate(user) {
    setUser(user);
  }

  function handleLogout(){
    setMovies([]);
    setIsInfoTooltip(false);
    setIsLoggedIn(false);
    navigate('/');
  }

  function handleLogin(data) {
    setIsLoggedIn(true);
    setUser(data);
    navigate('/');
  }

  function handleRegister() {
    setIsInfoTooltip(true);
    navigate('/signin');
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
              <Profile
                isLoggedIn={isLoggedIn}
                onProfileUpdate={handleProfileUpdate}
                onLogout={handleLogout}
                isTooltip={isInfoTooltip}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
              />
            }/>
            <Route path="movies" element={
              <Movies
                isLoggedIn={isLoggedIn}
                movies={movies}
                isLoading={isLoading}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
            />}/>
            <Route path="saved-movies" element={
              <SavedMovies
                isLoggedIn={isLoggedIn}
                isBurger={isBurger}
                isBurgerActive={isBurgerActive}
                onBurger={handleBurger}
            />}/>
          </Route>

          <Route path="/signup" element={
            <Register
              onRegister={handleRegister}
              isTooltip={isInfoTooltip}
            />
          }/>
          <Route path="/signin" element={
            <Login
              onLogin={handleLogin}
              isTooltip={isInfoTooltip}
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
