import { HOUSES_TYPES } from './create-ads.js';

const titleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const priceInput = document.querySelector('#price');
const typeOfHouse = document.querySelector('#type');
const MAX_PRICE_VALUE = 1000000;
let minPriceValue = 1000;

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

typeOfHouse.addEventListener('change', () => {
  minPriceValue = HOUSES_TYPES[typeOfHouse.value].minPrice;
});

titleInput.addEventListener('input', () => {
  let message = '';
  if (titleInput.value.length < MIN_TITLE_LENGTH) {
    message = `Минимум 30 символов. Еще ${MIN_TITLE_LENGTH - titleInput.value.length} симв.`;
  } else if (titleInput.value.length > MAX_TITLE_LENGTH) {
    message = `Максимум 100 символов. Удалите ${titleInput.value.length - MAX_TITLE_LENGTH} симв.`;
  }
  titleInput.setCustomValidity(message);
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  let message = '';
  if (priceInput.value > MAX_PRICE_VALUE) {
    message = `Максимальное значение: ${MAX_PRICE_VALUE}`;
  } else if (priceInput.value < minPriceValue) {
    message = `Минимальное значение: ${minPriceValue}`;
  }
  priceInput.setCustomValidity(message);
  priceInput.reportValidity();
});

roomNumber.addEventListener('change', () => {
  capacity.value = roomNumber.value;
});

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});
