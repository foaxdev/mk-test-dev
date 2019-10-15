'use strict';

(function () {
  let elModalStepOne = document.querySelector('.modal--step-1');
  let elRegisterButton = document.querySelector('.register__button');

  let hideModal = function () {
    elModalStepOne.classList.remove('modal--show');
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
  };

  let openModalByClickHandler = function () {
    showModal(elModalStepOne);
  };

  let openModalByKeyHandler = function (evt) {
    if (evt.key === window.constants.Key.ENTER) {
      showModal(elModalStepOne);
    }
  };

  hideModal();

  elRegisterButton.addEventListener('click', openModalByClickHandler);
  elRegisterButton.addEventListener('keydown', openModalByKeyHandler);
})();
