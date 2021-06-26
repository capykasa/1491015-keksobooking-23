const titleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const priceInput = document.querySelector('#price');
const typeOfHouse = document.querySelector('#type');
const MAX_PRICE_VALUE = 1000000;
let minPriceValue = 1000;

/*const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');*/

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

typeOfHouse.addEventListener('change', () => {
  if (typeOfHouse.value === 'bungalow') {
    minPriceValue = 0;
  } else if (typeOfHouse.value === 'flat') {
    minPriceValue = 1000;
  } else if (typeOfHouse.value === 'hotel') {
    minPriceValue = 3000;
  } else if (typeOfHouse.value === 'house') {
    minPriceValue = 5000;
  } else if (typeOfHouse.value === 'palace') {
    minPriceValue = 10000;
  }
  console.log(minPriceValue);
});

titleInput.addEventListener('input', () => {
  if (titleInput.value.length < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Минимум 30 символов. Еще ${MIN_TITLE_LENGTH - titleInput.value.length} симв.`)
  } else if (titleInput.value.length > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Максимум 100 символов. Удалите ${titleInput.value.length - MAX_TITLE_LENGTH} симв.`)
  } else {
    titleInput.setCustomValidity('')
  }
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  if (priceInput.value > MAX_PRICE_VALUE) {
    priceInput.setCustomValidity(`Максимальное значение: 1 000 000`)
  } else if (priceInput.value < minPriceValue) {
    priceInput.setCustomValidity(`Минимальное значение: ${minPriceValue}`)
  } else {
    priceInput.setCustomValidity('')
  }
  priceInput.reportValidity();
});

/*roomNumber.addEventListener('change', () => {
  capacity.value = roomNumber.value;
});*/

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});
