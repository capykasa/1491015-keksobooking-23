const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');
const adFormDisabled = 'ad-form--disabled';

const adToForm = (someClass, someElement) => {
  someClass.classList.add(adFormDisabled);
  someClass.querySelectorAll(someElement).forEach((item) => item.setAttribute('disabled', 'disabled'));
};
const removeToForm = (someClass, someElement) => {
  someClass.classList.remove(adFormDisabled);
  someClass.querySelectorAll(someElement).forEach((item) => item.removeAttribute('disabled', 'disabled'));
};

const inactiveState = () => {
  adToForm(adForm, 'fieldset');
  adToForm(mapFilters, 'select');
};

const activeState = () => {
  removeToForm(adForm, 'fieldset');
  removeToForm(mapFilters, 'select');
};

inactiveState();
activeState();
