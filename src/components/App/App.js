import React, {useState} from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';

import Login from "../Login/Login";
import Header from '../Header/Header';
import Main from '../Main/Main';
import Register from "../Register/Register";
import Footer from "../Footer/Footer";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="app">
      <Header/>
      <Routes>
        <Route path="/" element={
          <Main/>
        }/>
        <Route path="/signup" element={
          <Register/>
        }/>
        <Route path="/signin" element={
          <Login/>
        }/>
        <Route path="/" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/signin" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
