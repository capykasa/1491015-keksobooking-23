import { activeState } from './form-state.js';
import { similarAds } from './create-ads.js';
import { HOUSES_TYPES } from './create-ads.js';

const address = document.querySelector('#address');

const points = similarAds(50);

const map = L.map('map-canvas')
  .on('load', () => {
    activeState();
  })
  .setView({
    lat: 35.685646262993686,
    lng: 139.75273150919134,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const markerIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const marker = L.marker(
  {
    lat: 35.685646262993686,
    lng: 139.75273150919134,
  },
  {
    draggable: true,
    icon: markerIcon,
  },
).addTo(map);

address.value = `${marker._latlng.lat.toFixed(5)}, ${marker._latlng.lng.toFixed(5)}`;

marker.addEventListener('move', () => {
  address.value = `${marker._latlng.lat.toFixed(5)}, ${marker._latlng.lng.toFixed(5)}`;
});

const createPopup = (point) => {
  const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = popupTemplate.cloneNode(true);

  popupElement.querySelector('.popup__avatar').src = point.author.avatar;
  popupElement.querySelector('.popup__title').textContent = point.offer.title;
  popupElement.querySelector('.popup__text--address').textContent = `Координаты: ${point.location.lat}, ${point.location.lng}`;
  popupElement.querySelector('.popup__text--price').textContent = `${point.offer.price} ₽/ночь`;

  const offerType = () => HOUSES_TYPES[point.offer.type].name;
  popupElement.querySelector('.popup__type').textContent = offerType();

  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнат для ${point.offer.guests} гостей`;
  popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  const featureListElement = popupElement.querySelector('.popup__features');
  const modifiers = point.offer.features.map((feature) => `popup__feature--${feature}`);
  featureListElement.querySelectorAll('.popup__feature')
    .forEach((item) => {
      const modifier = item.classList[1];
      if (!modifiers.includes(modifier)) {
        item.remove();
      }
    });
  popupElement.querySelector('.popup__description').textContent = point.offer.description;
  point.offer.photos.forEach((photo) => {
    popupElement.querySelector('.popup__photo').src = photo;
  });

  return popupElement;
};

points.forEach((value) => {
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });
  const similarAdMarker = L.marker(
    [
      value.location.lat,
      value.location.lng,
    ],
    {
      icon,
    });

  similarAdMarker
    .addTo(map)
    .bindPopup(
      createPopup(value));
});
