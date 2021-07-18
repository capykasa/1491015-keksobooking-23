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

const resetForm = document.querySelector('.ad-form__reset');

const bodyElement = document.querySelector('body');

const successTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');

const errorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
let minPriceValue = 1000;
const titleInput = document.querySelector('#title');

const priceInput = document.querySelector('#price');

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const typeOfHouse = document.querySelector('#type');

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

const publishForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const housingTypeElement = document.querySelector('#housing-type');
const housingPriceElement = document.querySelector('#housing-price');
const housingRoomsElement = document.querySelector('#housing-rooms');
const housingGuestsElement = document.querySelector('#housing-guests');

const adWiFiInput = document.querySelector('#filter-wifi');
const adDishwasherInput = document.querySelector('#filter-dishwasher');
const adParkingInput = document.querySelector('#filter-parking');
const adWasherInput = document.querySelector('#filter-washer');
const adElevatorInput = document.querySelector('#filter-elevator');
const adConditionerInput = document.querySelector('#filter-conditioner');

const housingTypeChange = (cb) => {
  housingTypeElement.addEventListener('change', (evt) => {
    const selectedType = evt.target.value;
    selectedType;
    cb();
  });
};

const housingPriceChange = (cb) => {
  housingPriceElement.addEventListener('change', (evt) => {
    const selectedPrice = evt.target.value;
    selectedPrice;
    cb();
  });
};

const housingRoomsChange = (cb) => {
  housingRoomsElement.addEventListener('change', (evt) => {
    const selectedRooms = evt.target.value;
    selectedRooms;
    cb();
  });
};

const housingGuestsChange = (cb) => {
  housingGuestsElement.addEventListener('change', (evt) => {
    const selectedGuests = evt.target.value;
    selectedGuests;
    cb();
  });
};

const adWiFiChange = (cb) => {
  adWiFiInput.addEventListener('change', (evt) => {
    const selectWiFi = evt.target.checked;
    selectWiFi;
    cb();
  });
};

const adDishwasherChange = (cb) => {
  adDishwasherInput.addEventListener('change', (evt) => {
    const selectDishwasher = evt.target.checked;
    selectDishwasher;
    cb();
  });
};

const adParkingChange = (cb) => {
  adParkingInput.addEventListener('change', (evt) => {
    const selectParking = evt.target.checked;
    selectParking;
    cb();
  });
};

const adWasherChange = (cb) => {
  adWasherInput.addEventListener('change', (evt) => {
    const selectWasher = evt.target.checked;
    selectWasher;
    cb();
  });
};

const adElevatorChange = (cb) => {
  adElevatorInput.addEventListener('change', (evt) => {
    const selectElevator = evt.target.checked;
    selectElevator;
    cb();
  });
};

const adConditionerChange = (cb) => {
  adConditionerInput.addEventListener('change', (evt) => {
    const selectConditioner = evt.target.checked;
    selectConditioner;
    cb();
  });
};


typeOfHouse.addEventListener('change', () => {
  minPriceValue = HOUSES_TYPES[typeOfHouse.value].minPrice;
  priceInput.placeholder = minPriceValue;
});

const setValidity = (element, item) => {
  element.setCustomValidity(item);
  element.reportValidity();
};

const checkingRoomsAndGuests = function () {
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

roomNumber.addEventListener('change', checkingRoomsAndGuests);
capacity.addEventListener('change', checkingRoomsAndGuests);

titleInput.addEventListener('input', () => {
  let message = '';
  if (titleInput.value.length < MIN_TITLE_LENGTH) {
    message = `Минимум 30 символов. Еще ${MIN_TITLE_LENGTH - titleInput.value.length} симв.`;
  } else if (titleInput.value.length > MAX_TITLE_LENGTH) {
    message = `Максимум 100 символов. Удалите ${titleInput.value.length - MAX_TITLE_LENGTH} симв.`;
  }
  setValidity(titleInput, message);
});

priceInput.addEventListener('input', () => {
  let message = '';
  if (priceInput.value > MAX_PRICE_VALUE) {
    message = `Максимальное значение: ${MAX_PRICE_VALUE}`;
  } else if (priceInput.value < minPriceValue) {
    message = `Минимальное значение: ${minPriceValue}`;
  }
  setValidity(priceInput, message);
});

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

const successMessage = () => {
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

const errorMessage = () => {
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

setFormSubmit(successMessage, errorMessage);

export { HOUSES_TYPES, housingTypeChange, housingPriceChange, housingRoomsChange, housingGuestsChange, adWiFiChange, adDishwasherChange, adParkingChange, adWasherChange, adElevatorChange, adConditionerChange };
