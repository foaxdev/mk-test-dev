'use strict';

(function () {
  let elForm = document.querySelector('.modal__form');

  let formToJSON = function (form) {
    let data = {};
    let elsFormInputs = form.querySelectorAll('input');
    for (let i = 0; i < elsFormInputs.length; ++i) {
      let element = elsFormInputs[i];
      let name = element.name;
      let value = element.value;

      if (name) {
        data[name] = value;
      }
    }
    return data;
  };

  window.data = {
    getData: function () {
      console.log(formToJSON(elForm));
    }
  };
})();
