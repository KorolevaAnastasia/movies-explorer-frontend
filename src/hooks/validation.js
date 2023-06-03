import {regExpEmail} from "../utils/constants";

export const name = (disabled) => (
  {
    disabled: disabled,
    required: 'Поле Имя обязательно для заполнения',
    maxLength: {
      value: 20,
      message: 'Максимум 20 символов.'
    },
    minLength: {
      value: 2,
      message: 'Минимум 2 символа.'
    }
  }
);

export const email = (disabled) => (
  {
    required: 'Поле Email обязательно для заполнения.',
    disabled: disabled,
    maxLength: {
      value: 200,
      message: 'Максимум 200 символов.'
    },
    pattern: {
      value: regExpEmail,
      message: 'Неверный формат электронной почты.'
    }
  }
);

export const password = () => (
  {
    required: 'Поле Пароль обязательно для заполнения.',
    minLength: {
      value: 8,
      message: 'Минимум 8 символа.'
    }
  }
);

