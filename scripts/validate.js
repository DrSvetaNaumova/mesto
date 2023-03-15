const showInputError = (form, input, errorMessage) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(validationConfig.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(validationConfig.spanErrorClass);
};

const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(validationConfig.inputErrorClass);
  error.classList.remove(validationConfig.spanErrorClass);
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
    button.classList.add(validationConfig.inactiveButtonClass);
    button.disabled = true;
  } else {
    button.classList.remove(validationConfig.inactiveButtonClass);
    button.disabled = false;
  }
};

const setEventListeners = (form) => {
  const inputs = Array.from(
    form.querySelectorAll(validationConfig.inputSelector)
  );
  const button = form.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputs, button);
  inputs.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input);
      toggleButtonState(inputs, button);
    });
  });
};

function enableValidation(validationConfig) {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );
  forms.forEach((form) => {
    form.addEventListener('submit', (evt) => evt.preventDefault());
    setEventListeners(form);
  });
}


