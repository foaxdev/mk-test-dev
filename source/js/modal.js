'use strict';

(function () {
  let elModalStepOne = document.querySelector('.modal--step-1');
  let elRegisterButton = document.querySelector('.register__button');
  let elCloseButton = document.querySelector('.modal__close-button');

  let elNicknameInput = document.querySelector('#nickname');

  let hideModal = function () {
    elModalStepOne.classList.remove('modal--show');
    elCloseButton.removeEventListener('click', hideModal);
  };

  let hideModalByKeyHandler = function (evt) {
    if (evt.key === window.constants.Key.ESCAPE) {
      hideModal();
      document.removeEventListener('keydown', hideModalByKeyHandler);
    }
  };

  let showModal = function (modalWindow) {
    modalWindow.classList.add('modal--show');
    document.addEventListener('keydown', hideModalByKeyHandler);
    elCloseButton.addEventListener('click', hideModal);
    window.checkbox.setCheckboxes();
  };

  let openModalByClickHandler = function () {
    showModal(elModalStepOne);
  };

  let openModalByKeyHandler = function (evt) {
    if (evt.key === window.constants.Key.ENTER) {
      showModal(elModalStepOne);
    }
  };

  let nicknameListenersHandler = function () {

  };

  hideModal();

  elRegisterButton.addEventListener('click', openModalByClickHandler);
  elRegisterButton.addEventListener('keydown', openModalByKeyHandler);
  elNicknameInput.addEventListener('keydown', nicknameListenersHandler);
})();
