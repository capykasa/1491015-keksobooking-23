import { findRandomIntegerNumber, findRandomCoordinates } from './find-random';

const TYPES_OF_HOUSES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_OF_PLACES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_OF_PLACES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const COUNT_SIMILAR_ADS = 10;

const createAds = () => {
  const location = {
    lat: findRandomCoordinates(35.65000, 35.70000, 5),
    lng: findRandomCoordinates(139.70000, 139.80000, 5),
  };
  return {
    author: {
      avatar: `img/avatars/user0${findRandomIntegerNumber(1, 8)}.png`,
    },

    location,

    offer: {
      title: 'Аренда прекрасного места',
      adress: `${location.lat}, ${location.lng}`,
      price: findRandomIntegerNumber(500, 10000),
      type: TYPES_OF_HOUSES[findRandomIntegerNumber(0, TYPES_OF_HOUSES.length - 1)],
      rooms: findRandomIntegerNumber(1, 10),
      guests: findRandomIntegerNumber(1, 10),
      checkin: CHECKIN_TIMES[findRandomIntegerNumber(0, CHECKIN_TIMES.length - 1)],
      checkout: CHECKOUT_TIMES[findRandomIntegerNumber(0, CHECKOUT_TIMES.length - 1)],
      features: FEATURES_OF_PLACES.slice(0, findRandomIntegerNumber(1, FEATURES_OF_PLACES.length - 1)),
      description: 'Жить можно. Недолго, конечно',
      photos: PHOTO_OF_PLACES.slice(0, findRandomIntegerNumber(1, PHOTO_OF_PLACES.length - 1)),
    },
  };
};

const similarAds = () => new Array(COUNT_SIMILAR_ADS).fill(null).map(() => createAds());

export { similarAds };
