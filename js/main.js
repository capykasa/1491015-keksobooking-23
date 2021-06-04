const findRandomNumber = function (minValue, maxValue) {
  return Math.round(Math.random() * (maxValue - minValue) + minValue);
};

/* пытался взять вдохновение, но взял в итоге весь код отсюда: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random */

const findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  return (Math.random() * (maxValue - minValue) + minValue).toFixed([numberAfterPoint]);
}

findRandomNumber(5, 12);
findRandomCoordinates(1.110, 1.112, 4);

/* воспользовался этим прекрасным методом: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
но я не смог вызвать первую функцию во второй, потому что Math.round в первой функции дает на выходе второй просто много нулей после точки */
