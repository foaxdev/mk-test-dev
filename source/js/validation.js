'use strict';

(function () {
  let elNicknameInput = document.querySelector('#nickname');
  let elNicknameError = document.querySelector('.error__title-nick');

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
    }
  };
})();