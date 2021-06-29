const titleInput = document.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const priceInput = document.querySelector('#price');
const MAX_PRICE_VALUE = 1000000;

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

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
  roomNumber.setCustomValidity(message);
  roomNumber.reportValidity();
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
  titleInput.setCustomValidity(message);
  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  let message = '';
  if (priceInput.value > MAX_PRICE_VALUE) {
    message = `Максимальное значение: ${MAX_PRICE_VALUE}`;
  }
  priceInput.setCustomValidity(message);
  priceInput.reportValidity();
});
