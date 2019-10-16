'use strict';

(function () {
  var INTERVAL = 100;

  let addListenersForCheckboxes = function (checkboxes) {
    checkboxes.forEach(function (checkbox) {
      checkbox.addEventListener('keydown', window.debounce(
        function (evt) {
          if (evt.key === window.constants.Key.SPACEBAR) {
            evt.preventDefault();
            changeCheckbox(checkbox, checkbox.querySelector('input'), checkbox.querySelector('.modal__checkbox-indicator'));
          }
        },
        INTERVAL));
      checkbox.addEventListener('click', window.debounce(
        function () {
          changeCheckbox(checkbox, checkbox.querySelector('input'), checkbox.querySelector('.modal__checkbox-indicator'));
        },
        INTERVAL
      ));
    });
  };

  let changeCheckbox = function (checkbox, input, indicator) {
    switch (checkbox.getAttribute('aria-checked')) {
      case 'true':
        checkbox.setAttribute('aria-checked', 'false');
        input.removeAttribute('checked');
        indicator.classList.remove('modal__checkbox-indicator--selected');
        break;
      case 'false':
        checkbox.setAttribute('aria-checked', 'true');
        input.setAttribute('checked', 'checked');
        indicator.classList.add('modal__checkbox-indicator--selected');
        break;
    }
  };

  window.checkbox = {
    setCheckboxes: function () {
      let elsCheckboxes = document.querySelectorAll('.modal__checkbox');
      addListenersForCheckboxes(elsCheckboxes);
    }
  };
})();
