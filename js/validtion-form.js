import { sendData } from './api.js';
import { CENTER_TOKYO, map, marker } from './map.js';
import { closedWindow, isEnterEvent, isEscEvent } from './util.js';

const HOUSES_TYPES = {
  'palace': { name: 'Дворец', minPrice: 10000 },
  'flat': { name: 'Квартира', minPrice: 1000 },
  'house': { name: 'Дом', minPrice: 5000 },
  'bungalow': { name: 'Бунгало', minPrice: 0 },
  'hotel': { name: 'Отель', minPrice: 3000 },
};

const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TYPES = ['type', 'price', 'rooms', 'guests'];

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

let minPriceValue = 5000;

const resetForm = document.querySelector('.ad-form__reset');

const bodyElement = document.querySelector('body');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const titleInput = document.querySelector('#title');

const priceInput = document.querySelector('#price');

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const typeOfHouse = document.querySelector('#type');

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const publishForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const featuresNodes = FEATURES.map((feature) => ({
  feature,
  node: document.querySelector(`#filter-${feature}`),
}));
const typesNodes = TYPES.map((type) => ({
  feature: type,
  node: document.querySelector(`#housing-${type}`),
}));

const allFilters = [...featuresNodes, ...typesNodes];

const setValidity = (element, item) => {
  element.setCustomValidity(item);
  element.reportValidity();
};


const checkRoomsAndGuests = function () {
  let message = '';
  if (roomNumber.value === '1' && capacity.value !== '1') {
    message = `Доступно только для ${capacity[2].textContent}`;
  } else if (roomNumber.value === '2' && capacity.value !== '2' && capacity.value !== '1') {
    message = `Доступно только для ${capacity[1].textContent} или ${capacity[2].textContent}`;
  } else if (roomNumber.value === '3' && capacity.value !== '3' && capacity.value !== '2' && capacity.value !== '1') {
    message = `Доступно только для ${capacity[2].textContent}, ${capacity[1].textContent} или ${capacity[0].textContent}`;
  } else if (roomNumber.value === '100' && capacity.value !== '0') {
    message = `${capacity[3].textContent}`;
  } else {
    message = '';
  }
  setValidity(roomNumber, message);
};

const roomNumberHandler = () => {
  checkRoomsAndGuests();
};

const capacityHandler = () => {
  checkRoomsAndGuests();
};

roomNumber.addEventListener('change', roomNumberHandler);
capacity.addEventListener('change', capacityHandler);

titleInput.addEventListener('input', () => {
  let message = '';
  if (titleInput.value.length < MIN_TITLE_LENGTH) {
    message = `Минимум 30 символов. Еще ${MIN_TITLE_LENGTH - titleInput.value.length} симв.`;
  } else if (titleInput.value.length > MAX_TITLE_LENGTH) {
    message = `Максимум 100 символов. Удалите ${titleInput.value.length - MAX_TITLE_LENGTH} симв.`;
  }
  setValidity(titleInput, message);
});

const priceInputChange = () => {
  let message = '';
  if (priceInput.value > MAX_PRICE_VALUE) {
    message = `Максимальное значение: ${MAX_PRICE_VALUE}`;
  } else if (priceInput.value < minPriceValue) {
    message = `Минимальное значение: ${minPriceValue}`;
  }
  setValidity(priceInput, message);
};

typeOfHouse.addEventListener('change', () => {
  minPriceValue = HOUSES_TYPES[typeOfHouse.value].minPrice;
  priceInput.placeholder = minPriceValue;
  priceInputChange();
});

priceInput.addEventListener('input', priceInputChange);

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

resetForm.addEventListener('click', () => {
  mapFilters.reset();
  marker.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, 16);
});

const reportSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  bodyElement.appendChild(successElement);
  closedWindow(successElement);
  isEscEvent(successElement);
  isEnterEvent(successElement);
  publishForm.reset();
  mapFilters.reset();
  marker.setLatLng(CENTER_TOKYO);
  map.setView(CENTER_TOKYO, 16);
};

const reportError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  bodyElement.appendChild(errorElement);
  closedWindow(errorElement);
  isEscEvent(errorElement);
  isEnterEvent(errorElement);
};

const setFormSubmit = (onSuccess, onFail) => {
  publishForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

setFormSubmit(reportSuccess, reportError);

export { featuresNodes, typesNodes, allFilters, HOUSES_TYPES };
