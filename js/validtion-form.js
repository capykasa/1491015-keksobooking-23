import { HOUSES_TYPES } from './create-ads.js';

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
