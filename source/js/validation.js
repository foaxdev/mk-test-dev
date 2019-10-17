'use strict';

(function () {
  let elNicknameInput = document.querySelector('#nickname');
  let elEmailInput = document.querySelector('#email');
  let elPasswordInput = document.querySelector('#password');
  let elPasswordRepeatInput = document.querySelector('#password-repeat');
  let elCheckboxInput = document.querySelector('.modal__checkbox-input');

  let elNicknameError = document.querySelector('.error-title-nick');
  let elEmailError = document.querySelector('.error-title-email');
  let elPasswordError = document.querySelector('.error-title-password');
  let elPasswordRepeatError = document.querySelector('.error-title-repeat');
  let elPasswordCharsError = document.querySelector('.errors__name--chars');
  let elPasswordNumbersError = document.querySelector('.errors__name--numbers');
  let elPasswordCaseError = document.querySelector('.errors__name--case');
  let elsInputs = document.querySelectorAll('.modal__input');
  let elsPasswordChecks = document.querySelectorAll('.errors__name');
  let elModalButton = document.querySelector('.modal__button');

  let isPasswordDigitsCheckPassed = false;
  let isPasswordLengthCheckPassed = false;
  let isPasswordCharsCheckPassed = false;

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
    return !(elPasswordInput.value.length < 6 || elPasswordInput.value.length > 32);
  };

  let isNickNameEmpty = function () {
    return elNicknameInput.value.length === 0;
  };

  let isEmailEmpty = function () {
    return elEmailInput.value.length === 0;
  };

  let isPasswordEmpty = function () {
    return elPasswordInput.value.length === 0;
  };

  let isPasswordRepeatEmpty = function () {
    return elPasswordRepeatInput.value.length === 0;
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
    elPasswordInput.classList.toggle('modal__input--error', isPasswordEqualToEmailOrNickname());
    elPasswordError.classList.toggle('error-title--show', isPasswordEqualToEmailOrNickname());
  };

  let doPasswordsMatch = function () {
    return elPasswordInput.value === elPasswordRepeatInput.value;
  };

  let doAllInputsHaveNoErrors = function () {
    for (let i = 0; i < elsInputs.length; i++) {
      if (elsInputs[i].classList.contains('modal__input--error')) {
        return false;
      }
    }
    return true;
  };

  let isPasswordPassed = function () {
    for (let i = 0; i < elsPasswordChecks.length; i++) {
      if (!elsPasswordChecks[i].classList.contains('errors__name--success')) {
        return false;
      }
    }
    return true;
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
      elNicknameError.classList.toggle('error-title--show', message !== '');
      elNicknameError.innerText = message;

      checkPasswordWithEmailAndNickName();
      window.validation.checkAllValues();
    },
    checkEmailHandler: function () {
      let message = '';

      if (isEmailValid()) {
        message = 'Некорректный email';
      }

      elEmailInput.classList.toggle('modal__input--error', message !== '');
      elEmailError.classList.toggle('error-title--show', message !== '');
      elEmailError.innerText = message;

      checkPasswordWithEmailAndNickName();
      window.validation.checkAllValues();
    },
    checkPasswordHandler: function () {
      if (doesPasswordContainDigit()) {
        isPasswordDigitsCheckPassed = true;
      }
      if (doesPasswordContainLowercaseAndUppercaseChar()) {
        isPasswordCharsCheckPassed = true;
      }
      if (isPasswordLengthCorrect()) {
        isPasswordLengthCheckPassed = true;
      }

      if (isPasswordDigitsCheckPassed) {
        elPasswordNumbersError.classList.toggle('errors__name--error', !doesPasswordContainDigit());
        elPasswordNumbersError.classList.toggle('errors__name--success', doesPasswordContainDigit());
        elPasswordInput.classList.toggle('modal__input--error', !doesPasswordContainDigit());
      }

      if (isPasswordCharsCheckPassed) {
        elPasswordCaseError.classList.toggle('errors__name--error', !doesPasswordContainLowercaseAndUppercaseChar());
        elPasswordCaseError.classList.toggle('errors__name--success', doesPasswordContainLowercaseAndUppercaseChar());
        elPasswordInput.classList.toggle('modal__input--error', !doesPasswordContainLowercaseAndUppercaseChar());
      }

      if (isPasswordLengthCheckPassed) {
        elPasswordCharsError.classList.toggle('errors__name--error', !isPasswordLengthCorrect());
        elPasswordCharsError.classList.toggle('errors__name--success', isPasswordLengthCorrect());
        elPasswordInput.classList.toggle('modal__input--error', !isPasswordLengthCorrect());
      }

      checkPasswordWithEmailAndNickName();
      window.validation.checkPasswordRepeatHandler();
      window.validation.checkAllValues();
    },
    checkPasswordRepeatHandler: function () {
      if (!isPasswordEmpty() && !isPasswordRepeatEmpty()) {
        elPasswordRepeatInput.classList.toggle('modal__input--error', !doPasswordsMatch());
        elPasswordRepeatError.classList.toggle('error-title--show', !doPasswordsMatch());
      }
      window.validation.checkAllValues();
    },
    checkAllValues: function () {
      if (
        doAllInputsHaveNoErrors()
        &&
        !isNickNameEmpty()
        &&
        !isEmailEmpty()
        &&
        !isPasswordEmpty()
        &&
        !isPasswordRepeatEmpty()
        &&
        elCheckboxInput.checked
        &&
        isPasswordPassed()
      ) {
        elModalButton.classList.remove('button--disabled');
      } else {
        elModalButton.classList.add('button--disabled');
      }
    },
    checkFormHandler: function (evt) {
      evt.preventDefault();
      if (
        doAllInputsHaveNoErrors()
        &&
        !isNickNameEmpty()
        &&
        !isEmailEmpty()
        &&
        !isPasswordEmpty()
        &&
        !isPasswordRepeatEmpty()
        &&
        elCheckboxInput.checked
        &&
        isPasswordPassed()
      ) {
        window.modal.send();
      }
    }
  };
})();
