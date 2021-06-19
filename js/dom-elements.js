import { similarAds } from './create-ads.js';

const mapCanvas = document.querySelector('#map-canvas');
const cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const addingAds = similarAds();

addingAds.forEach((ad) => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = ad.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = ad.offer.adress;
  cardElement.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;

  const offerType = () => {
    if (ad.offer.type === 'flat') {
      return 'Квартира';
    } else if (ad.offer.type === 'bungalow') {
      return 'Бунгало';
    } else if (ad.offer.type === 'house') {
      return 'Дом';
    } else if (ad.offer.type === 'palace') {
      return 'Дворец';
    } else if (ad.offer.type === 'hotel') {
      return 'Отель';
    }
  };
  cardElement.querySelector('.popup__type').textContent = offerType();

  cardElement.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} комнат для ${ad.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  const featureListElement = cardElement.querySelector('.popup__features');
  const modifiers = ad.offer.features.map((feature) => `popup__feature--${feature}`);
  featureListElement.querySelectorAll('.popup__feature')
    .forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  cardElement.querySelector('.popup__description').textContent = ad.offer.description;
  ad.offer.photos.forEach((photo) => {
    cardElement.querySelector('.popup__photo').src = photo;
  });
  cardElement.querySelector('.popup__avatar').src = ad.author.avatar;
  mapCanvas.appendChild(cardElement);
});

/* "Предусмотрите ситуацию, когда данных для заполнения не хватает. Например, отсутствует описание. В этом случае соответствующий блок в карточке скрывается."
    Хотел бы совета по этому пункту.
*/
