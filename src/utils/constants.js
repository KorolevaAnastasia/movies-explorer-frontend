export const regExpEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
export const regExpName = /^[a-яё]+|[a-z]+(?:[ -][a-яё]+|[a-z]+)*$/
export const serverUrl = 'https://api.nomoreparties.co';

export const errorMessages = {
  'error': 'Что-то пошло не так...',
  'emailError': 'Пользователь с таким email уже существует.',
  'loginError': 'Неверные имя пользователя или пароль.',
  'unicError': 'Пользователь с таким email не существует.',
  'notFoundError': 'Запись не найдена.',
  'authError': 'Ошибка авторизации'
}


export const DESKTOP_WIDTH = 1280;
export const TABLET_WIDTH = 768;
export const MOBILE_WIDTH = 480;
