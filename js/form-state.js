const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const adFormDisabled = 'ad-form--disabled';

const addToForm = (someClass, someElement) => {
  someClass.classList.add(adFormDisabled);
  someClass.querySelectorAll(someElement).forEach((item) => item.setAttribute('disabled', 'disabled'));
};
const removeFromForm = (someClass, someElement) => {
  someClass.classList.remove(adFormDisabled);
  someClass.querySelectorAll(someElement).forEach((item) => item.removeAttribute('disabled', 'disabled'));
};

const inactivateForm = () => {
  addToForm(adForm, 'fieldset');
  addToForm(mapFilters, 'select');
};

const activateForm = () => {
  removeFromForm(adForm, 'fieldset');
  removeFromForm(mapFilters, 'select');
};

inactivateForm();

export { inactivateForm, activateForm };
