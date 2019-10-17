'use strict';

(function () {
  let elNicknameInput = document.querySelector('#nickname');
  let elEmailInput = document.querySelector('#email');
  let elPasswordInput = document.querySelector('#password');

  let elNicknameError = document.querySelector('.error__title-nick');
  let elEmailError = document.querySelector('.error__title-email');
  let elPasswordError = document.querySelector('.error__title-password');
  let elPasswordCharsError = document.querySelector('.errors__name--chars');
  let elPasswordNumbersError = document.querySelector('.errors__name--numbers');
  let elPasswordCaseError = document.querySelector('.errors__name--case');

  let isNicknameLengthCorrect = function () {
    return (elNicknameInput.value.length > 0 && elNicknameInput.value.length < 3) || elNicknameInput.value > 40;
  };

  let doesContainCorrectChars = function () {
    let pattern = /^[a-z0-9|_|;]+$/i;

    return !pattern.test(elNicknameInput.value);
  };

  let doesStartWithNumber = function () {
    let pattern = /^[0-9|_|;]+$/i;

    return pattern.test(elNicknameInput.value.substring(0, 1));
  };

  let isEmailValid = function () {
    let pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return !pattern.test(elEmailInput.value.toLowerCase());
  };

  let doesPasswordContainDigit = function () {
    let pattern = /.*[0-9].*/;

    return pattern.test(elPasswordInput.value);
  };

  let doesPasswordContainLowercaseAndUppercaseChar = function () {
    let pattern = /(?=.*[a-z])(?=.*[A-Z])/;

    return pattern.test(elPasswordInput.value);
  };

  let isPasswordLengthCorrect = function () {
    return elPasswordInput.value.length < 6 || elPasswordInput.value > 32;
  };

  let isNickNameEmpty = function () {
    return elNicknameInput.value.length === 0;
  };

  let isEmailEmpty = function () {
    return elEmailInput.value.length === 0;
  };

  let isPasswordEqualToEmailOrNickname = function () {
    let password = elPasswordInput.value;

    if (!isNickNameEmpty() && password.length !== 0) {
      return password === elNicknameInput.value;
    }

    if (!isEmailEmpty() && password.length !== 0) {
      return password === elEmailInput.value;
    }

    return false;
  };

  let checkPasswordWithEmailAndNickName = function () {
    elPasswordInput.classList.toggle('modal__input--error', !doesPasswordContainDigit() || !doesPasswordContainLowercaseAndUppercaseChar() || isPasswordLengthCorrect() || isPasswordEqualToEmailOrNickname());
    elPasswordError.classList.toggle('errors__title--show', isPasswordEqualToEmailOrNickname());
  };

  window.validation = {
    checkNameHandler: function () {
      let message = '';

      if (isNicknameLengthCorrect()) {
        message = 'Никнейм должен содержать от 3 до 40 символов';
      }

      if (doesContainCorrectChars()) {
        message = 'Никнейм должен содержать только латинские буквы, цифры, символ подчёркивания (_) или символ (;)';
      }

      if (doesStartWithNumber()) {
        message = 'Никнейм должен начинаться только с буквы';
      }

      elNicknameInput.classList.toggle('modal__input--error', message !== '');
      elNicknameError.classList.toggle('errors__title--show', message !== '');
      elNicknameError.innerText = message;

      checkPasswordWithEmailAndNickName();
    },
    checkEmailHandler: function () {
      let message = '';

      if (isEmailValid()) {
        message = 'Некорректный email';
      }

      elEmailInput.classList.toggle('modal__input--error', message !== '');
      elEmailError.classList.toggle('errors__title--show', message !== '');
      elEmailError.innerText = message;

      checkPasswordWithEmailAndNickName();
    },
    checkPasswordHandler: function () {
      elPasswordNumbersError.classList.toggle('errors__name--error', !doesPasswordContainDigit());
      elPasswordNumbersError.classList.toggle('errors__name--success', doesPasswordContainDigit());

      elPasswordCaseError.classList.toggle('errors__name--error', !doesPasswordContainLowercaseAndUppercaseChar());
      elPasswordCaseError.classList.toggle('errors__name--success', doesPasswordContainLowercaseAndUppercaseChar());

      elPasswordCharsError.classList.toggle('errors__name--error', isPasswordLengthCorrect());
      elPasswordCharsError.classList.toggle('errors__name--success', !isPasswordLengthCorrect());

      checkPasswordWithEmailAndNickName();
    }
  };
})();
