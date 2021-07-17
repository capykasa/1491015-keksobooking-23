const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const fileChooserAvatar = document.querySelector('.ad-form-header__input');
const previewAvatar = document.querySelector('.ad-form-header__preview')
  .querySelector('img');
const fileChooserHousing = document.querySelector('.ad-form__input');
const previewHousingDiv = document.querySelector('.ad-form__photo');

fileChooserAvatar.addEventListener('change', () => {
  const file = fileChooserAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewAvatar.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});

fileChooserHousing.addEventListener('change', () => {
  const file = fileChooserHousing.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewHousingDiv.innerHTML = '';
      const previewHousing = document.createElement('img');
      previewHousing.setAttribute('width', '70');
      previewHousing.setAttribute('height', '70');
      previewHousingDiv.appendChild(previewHousing);
      previewHousing.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
