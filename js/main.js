const findRandomNumber = function (minValue, maxValue) {
  return Math.random() * (maxValue - minValue) + minValue;
};

export const findRandomIntegerNumber = function (minValue, maxValue) {
  return Math.round(findRandomNumber(minValue, maxValue));
};

export const findRandomCoordinates = function (minValue, maxValue, numberAfterPoint) {
  return findRandomNumber(minValue, maxValue).toFixed([numberAfterPoint]);
};

const TYPES_OF_HOUSES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
const CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
const FEATURES_OF_PLACES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTO_OF_PLACES = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

const COUNT_SIMILAR_ADS = 1;

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

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const addingAds = similarAds();

// Не смог придумать способа адекватнее и в итоге этот тоже работает плохо.
const offerType = () => {
  if (createAds().offer.type === 'flat') {
    return 'Квартира';
  } else if (createAds().offer.type === 'bungalow') {
    return 'Бунгало';
  } else if (createAds().offer.type === 'house') {
    return 'Дом';
  } else if (createAds().offer.type === 'palace') {
    return 'Дворец';
  } else if (createAds().offer.type === 'hotel') {
    return 'Отель';
  }
};

/* let offerType = {
  flat: Квартира,
  bungalow: Бунгало,
  house: Дом,
  palace: Дворец,
  hotel: Отель
};
    Хотел попробовать сделать лаконичнее, но получив ошибку перестал пытаться.
    Ошибка:
      Uncaught ReferenceError: Квартира is not defined
      at main.js:74 */

addingAds.forEach((offer) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = createAds().offer.title;
  cardElement.querySelector('.popup__text--address').textContent = createAds().offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${createAds().offer.price} ₽/ночь`;

  cardElement.querySelector('.popup__type').textContent = offerType(); // Часто не получаю значения.

  cardElement.querySelector('.popup__text--capacity').textContent = `${createAds().offer.rooms} комнат для ${createAds().offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${createAds().offer.checkin}, выезд до ${createAds().offer.checkout}`
  const featureListElement = cardElement.querySelector('.popup__features');
  const modifiers = createAds().offer.features.map((feature) => `popup__feature--${feature}`);
  featureListElement.querySelectorAll('.popup__feature')
    .forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  cardElement.querySelector('.popup__description').textContent = createAds().offer.description;
  createAds().offer.photos.forEach((photo) => {
    cardElement.querySelector('.popup__photo').src = photo;
  });
  cardElement.querySelector('.popup__avatar').src = createAds().author.avatar;
  mapCanvas.appendChild(cardElement);
});

/* "Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается."
    Хотел бы совета по этому пункту.
*/
