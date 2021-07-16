import { activeState, inactiveState } from './form-state.js';
import { HOUSES_TYPES } from './create-ads.js';
import { getData } from './api.js';
import { adConditionerChange, adDishwasherChange, adElevatorChange, adParkingChange, adWasherChange, adWiFiChange, housingGuestsChange, housingPriceChange, housingRoomsChange, housingTypeChange } from './validtion-form.js';
import { debounce } from './utils/debounce.js';

const RERENDER_DELAY = 500;

const CENTER_TOKYO = {
  lat: 35.685646262993686,
  lng: 139.75273150919134,
};

const MAIN_MARKER = {
  url: 'img/main-pin.svg',
  size: [52, 52],
  anchor: [26, 52],
};

const SIMILAR_MARKER = {
  url: 'img/pin.svg',
  size: [40, 40],
  anchor: [20, 40],
};

const address = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activeState();
  })
  .setView(CENTER_TOKYO, 16);

const titleLayer = L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
);

titleLayer.addTo(map);

const markerIcon = L.icon({
  iconUrl: MAIN_MARKER.url,
  iconSize: MAIN_MARKER.size,
  iconAnchor: MAIN_MARKER.anchor,
});

const marker = L.marker(
  CENTER_TOKYO,
  {
    draggable: true,
    icon: markerIcon,
  },
).addTo(map);

const addressValue = () => `${marker._latlng.lat.toFixed(5)}, ${marker._latlng.lng.toFixed(5)}`;

address.value = addressValue();

marker.addEventListener('move', () => {
  address.value = addressValue();
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
  if (point.offer.features === undefined) {
    featureListElement.classList.add('hidden');
  } else {
    const modifiers = point.offer.features.map((feature) => `popup__feature--${feature}`);
    featureListElement.querySelectorAll('.popup__feature')
      .forEach((item) => {
        const modifier = item.classList[1];
        if (!modifiers.includes(modifier)) {
          item.remove();
        }
      });
  }

  popupElement.querySelector('.popup__description').textContent = point.offer.description;

  const photosListElement = popupElement.querySelector('.popup__photos');
  if (point.offer.photos === undefined) {
    photosListElement.classList.add('hidden');
  }
  else {
    const photoElement = photosListElement.querySelector('.popup__photo');
    point.offer.photos.forEach((photo) => {
      const photoElementCopy = photoElement.cloneNode(true);
      photoElementCopy.src = photo;
      photosListElement.appendChild(photoElementCopy);
    });
    photoElement.remove();
  }
  return popupElement;
};

const getAdRank = (ad) => {
  const adWiFiInput = document.querySelector('#filter-wifi');
  const adDishwasherInput = document.querySelector('#filter-dishwasher');
  const adParkingInput = document.querySelector('#filter-parking');
  const adWasherInput = document.querySelector('#filter-washer');
  const adElevatorInput = document.querySelector('#filter-elevator');
  const adConditionerInput = document.querySelector('#filter-conditioner');

  const housingTypeElement = document.querySelector('#housing-type');
  const housingPriceElement = document.querySelector('#housing-price');
  const housingRoomsElement = document.querySelector('#housing-rooms');
  const housingGuestsElement = document.querySelector('#housing-guests');

  let rank = 0;

  if (ad.offer.features !== undefined) {

    if (adWiFiInput.checked) {
      if (ad.offer.features.includes(adWiFiInput.value)) { rank += 1; }
    }
    if (adDishwasherInput.checked) {
      if (ad.offer.features.includes(adDishwasherInput.value)) { rank += 1; }
    }
    if (adParkingInput.checked) {
      if (ad.offer.features.includes(adParkingInput.value)) { rank += 1; }
    }
    if (adWasherInput.checked) {
      if (ad.offer.features.includes(adWasherInput.value)) { rank += 1; }
    }
    if (adElevatorInput.checked) {
      if (ad.offer.features.includes(adElevatorInput.value)) { rank += 1; }
    }
    if (adConditionerInput.checked) {
      if (ad.offer.features.includes(adConditionerInput.value)) { rank += 1; }
    }
  } else {
    rank = 0;
  }

  if (ad.offer.type === housingTypeElement.value) { rank += 3; }

  const priceValue = () => {
    if (ad.offer.price >= 10000 && ad.offer.price <= 50000) {
      return 'middle';
    }
    if (ad.offer.price < 10000) {
      return 'low';
    }
    if (ad.offer.price > 50000) {
      return 'high';
    }
  };
  if (priceValue() === housingPriceElement.value) { rank += 2; }
  if (ad.offer.rooms === Number(housingRoomsElement.value)) {
    rank += 2;
  } else if (ad.offer.rooms > Number(housingRoomsElement.value)) { rank += 1; }
  if (ad.offer.guests <= housingGuestsElement.value) { rank += 2; }

  return rank;
};

const compareAds = (adA, adB) => {
  const rankA = getAdRank(adA);
  const rankB = getAdRank(adB);

  return rankB - rankA;
};

const markerGroup = L.layerGroup().addTo(map);

const addSimilarMarker = (item) => {
  inactiveState();
  markerGroup.clearLayers();
  item
    .slice()
    .sort(compareAds)
    .slice(0, 10)
    .forEach((value) => {
      const icon = L.icon({
        iconUrl: SIMILAR_MARKER.url,
        iconSize: SIMILAR_MARKER.size,
        iconAnchor: SIMILAR_MARKER.anchor,
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
        .remove()
        .addTo(markerGroup)
        .bindPopup(
          createPopup(value));
    });
  activeState();
};

getData((item) => {
  addSimilarMarker(item);
  housingTypeChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  housingPriceChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  housingRoomsChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  housingGuestsChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  adWiFiChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  adDishwasherChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  adParkingChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  adWasherChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  adElevatorChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
  adConditionerChange(debounce(() => addSimilarMarker(item), RERENDER_DELAY,
  ));
});

export { map, marker, CENTER_TOKYO };
