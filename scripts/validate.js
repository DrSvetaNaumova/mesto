const obj = {
  formSelector: '.pop-up__form',
  inputSelector: '.pop-up__input',
  submitButtonSelector: '.pop-up__save-button',
  inactiveButtonClass: 'pop-up__save-button_disabled',
  inputErrorClass: 'pop-up__input_type_error',
  spanErrorClass: 'pop-up__error_visible',
};

const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(obj.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(obj.spanErrorClass);
};

const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(obj.inputErrorClass);
  error.classList.remove(obj.spanErrorClass);
  error.textContent = '';
};

const checkInputValidity = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

const hasInvalidInput = (inputs) => {
  return inputs.some((input) => {
    return !input.validity.valid;
  });
};

const toggleButtonState = (inputs, button) => {
  if (hasInvalidInput(inputs)) {
    button.classList.add(obj.inactiveButtonClass);
  } else {
    button.classList.remove(obj.inactiveButtonClass);
  }
};

const setEventListeners = (form) => {
  const inputs = Array.from(form.querySelectorAll(obj.inputSelector));
  const button = form.querySelector(obj.submitButtonSelector);
  console.log(button);
  toggleButtonState(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
};

function enableValidation(obj) {
  const forms = Array.from(document.querySelectorAll(obj.formSelector));
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form);
  });
}

enableValidation(obj);
