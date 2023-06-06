const baseUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export function getMovies() {
  return request(
    baseUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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
