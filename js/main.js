let findRandomNumber = function (minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

/* пытался взять вдохновение, но взял в итоге весь код отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

let findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  let string = 0;
  for (let i = 1; i < numberAfterPoint; i++) {
    string += '0';
  };
  numberAfterPoint = parseInt('1' + string);
  return Math.round((Math.random() * (maxValue - minValue) + minValue) * numberAfterPoint) / numberAfterPoint;
};
