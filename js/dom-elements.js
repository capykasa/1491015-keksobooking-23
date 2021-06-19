import { similarAds } from './create-ads';

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
