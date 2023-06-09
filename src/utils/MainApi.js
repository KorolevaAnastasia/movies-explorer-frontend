import {serverUrl} from "./constants";

const baseUrl = 'https://api.movie-akoroleva.nomoredomains.monster';

export function getProfile() {
  return request(
    baseUrl + '/users/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      }
    });
}

export function updateProfile(name, email) {
  return request(
    baseUrl + '/users/me', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    });
}

export function getSavedMovies(){
  return request(
    baseUrl + '/movies', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    });
}

export function addSavedMovie(data){
  return request(
    baseUrl + `/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        country: data.country,
        director: data.director,
        duration: data.duration,
        description: data.description,
        year: data.year,
        image: serverUrl+data.image.url,
        trailerLink: data.trailerLink,
        movieId: data.id,
        thumbnail: serverUrl+data.image.formats.thumbnail.url
      })
    });
}

export function removeSavedMovie(movieId){
  return request(
    baseUrl + `/movies/${movieId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
    });
}


function checkStatus(res) {
  if (res.ok)
    return res.json();

  return Promise.reject(res.status);
}

function request(url, options) {
  return fetch(url, options).then(checkStatus);
}
