const findRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

const findRandomIntegerNumber = function (minValue, maxValue) {
  return Math.round(findRandomNumber(minValue, maxValue));
};

const findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  return findRandomNumber(minValue, maxValue).toFixed([numberAfterPoint]);
};

const isEscEvent = (value) => {
  addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      value.classList.add('hidden');
    }
  });
};

const isEnterEvent = (value) => {
  addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      value.classList.add('hidden');
    }
  });
};

const closedWindow = (value) => {
  value.addEventListener('click', () => {
    value.classList.add('hidden');
  });
};

export { findRandomIntegerNumber, findRandomCoordinates, closedWindow, isEscEvent, isEnterEvent };
