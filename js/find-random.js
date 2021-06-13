const findRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

export const findRandomIntegerNumber = function (minValue, maxValue) {
  return Math.round(findRandomNumber(minValue, maxValue));
};

export const findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  return findRandomNumber(minValue, maxValue).toFixed([numberAfterPoint]);
};
