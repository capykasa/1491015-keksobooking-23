const findRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

const findRandomIntegerNumber = function (minValue, maxValue) {
  return Math.round(findRandomNumber(minValue, maxValue));
};

/* пытался взять вдохновение, но взял в итоге весь код отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  return findRandomNumber(minValue, maxValue).toFixed([numberAfterPoint]);
};

findRandomNumber(5, 12);
findRandomIntegerNumber(2, 13);
findRandomCoordinates(1.110, 1.112, 4);

/* воспользовался этим прекрасным методом: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed */
