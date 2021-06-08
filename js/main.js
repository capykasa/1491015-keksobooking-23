const findRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

const findRandomIntegerNumber = function (minValue, maxValue) {
  return Math.round(findRandomNumber(minValue, maxValue));
};

const findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  return findRandomNumber(minValue, maxValue).toFixed([numberAfterPoint]);
};

/* //////////////////////   ADVERTISEMENTS   ////////////////////////// */

const SIMILAR_ADS_COUNT = 10;

const typeHouse = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkinTime = ['12:00', '13:00', '14:00'];
const checkoutTime = ['12:00', '13:00', '14:00'];
const featuresPlace = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosPlace = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const createAds = () => {
  const location = {
    lat: findRandomCoordinates(35.65000, 35.70000, 5),
    lng: findRandomCoordinates(139.70000, 139.80000, 5),
  }
  return {
    author: {
      avatar: 'img/avatars/user' + 0 + findRandomIntegerNumber(1, 8) + '.png',
    },

    location,

    offer: {
      title: 'Квартира',
      adress: location.lat + ', ' + location.lng,
      price: findRandomIntegerNumber(500, 10000),
      type: typeHouse[findRandomIntegerNumber(0, typeHouse.length - 1)],
      rooms: findRandomIntegerNumber(1, 10),
      guests: findRandomIntegerNumber(1, 10),
      checkin: checkinTime[findRandomIntegerNumber(0, checkinTime.length - 1)],
      checkout: checkoutTime[findRandomIntegerNumber(0, checkoutTime.length - 1)],
      features: featuresPlace.slice(0, findRandomIntegerNumber(1, featuresPlace.length - 1)).join(', '),
      description: 'Жить можно. Недолго, конечно',
      photos: photosPlace.slice(0, findRandomIntegerNumber(1, photosPlace.length - 1)).join(', '),
    },
  };
};

const similarAds = new Array(SIMILAR_ADS_COUNT).fill(null).map(() => createAds());

console.log(similarAds);
