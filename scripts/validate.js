const objectValidation = {
  formSelector: ".form",
  inputSelector: ".form__field",
  submitButtonSelector: ".button-submit",
  inactiveButtonClass: "button-submit_disabled",
  inputErrorClass: "form__field_type_error",
  errorClass: "error_visible",
};

/* Функция валидации */
const enableValidation = (object) => {
  const forms = document.querySelectorAll(object.formSelector);
  forms.forEach((form) => {
    const inputs = form.querySelectorAll(object.inputSelector);
    const button = form.querySelector(object.submitButtonSelector);
    setEventListeners(
      inputs,
      button,
      objectValidation.inactiveButtonClass,
      objectValidation.inputErrorClass,
      objectValidation.errorClass
    );
  });
};

enableValidation(objectValidation);

/* Навешиваем слушателей ввода на инпуты */
function setEventListeners(
  inputsObj,
  button,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) {
  inputsObj.forEach((input) => {
    input.addEventListener("input", () => {
      checkInputValidity(input, inputErrorClass, errorClass);
      toggleButton(inputsObj, button, inactiveButtonClass);
    });
  });
}

function toggleButton(inputs, button, inactiveButtonClass) {
  if (hasInvalidInput(inputs)) {
    disableButtonSubmit(button, inactiveButtonClass);
  } else {
    enableButtonSubmit(button, inactiveButtonClass);
  }
}

/* Функция проверки поля на валидность */
function checkInputValidity(input, inputErrorClass, errorClass) {
  const errorContainer = document.querySelector(`#${input.id}-error`);
  if (input.validity.valid) {
    hideError(input, errorContainer, inputErrorClass, errorClass);
  } else {
    showError(input, errorContainer, inputErrorClass, errorClass);
  }
}

function showError(input, errorContainer, inputErrorClass, errorClass) {
  errorContainer.textContent = input.validationMessage;
  input.classList.add(inputErrorClass);
  errorContainer.classList.add(errorClass);
}

function hideError(input, errorContainer, inputErrorClass, errorClass) {
  input.classList.remove(inputErrorClass);
  errorContainer.classList.remove(errorClass);
  errorContainer.textContent = "";
}

/* Функция проверки всех полей формы на валидность*/
function hasInvalidInput(inputs) {
  return Array.from(inputs).some((input) => !input.validity.valid);
}

/* Функция включения активной кнопки */
function enableButtonSubmit(button, inactiveButtonClass) {
  button.classList.remove(inactiveButtonClass);
  // button.setAttribute("disabled", false);
  button.disabled = false;
}
/* Функция выключения активной кнопки*/
function disableButtonSubmit(button, inactiveButtonClass) {
  button.classList.add(inactiveButtonClass);
  // button.setAttribute("disabled", true);
  button.disabled = true;
}

/*Сброс невалидности инпутов */
function resetErrorInput(form) {
  form.querySelectorAll(objectValidation.inputSelector).forEach((input) => {
    const errorInputText = document.querySelector(`#${input.id}-error`);
    if (!input.validity.valid) {
      hideError(
        input,
        errorInputText,
        objectValidation.inputErrorClass,
        objectValidation.errorClass
      );
    }
  });
}
