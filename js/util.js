const showAlert = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = 'Данные не загруженны. Попробуйте обновить страницу.';

  document.body.append(alertContainer);
};

const isEscEvent = (value) => {
  addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      value.classList.add('hidden');
    }
  });
};

const isEnterEvent = (value) => {
  addEventListener('keydown', (evt) => {
    if (evt.key === 'Enter') {
      evt.preventDefault();
      value.classList.add('hidden');
    }
  });
};

const closedWindow = (value) => {
  value.addEventListener('click', () => {
    value.classList.add('hidden');
  });
};

export { showAlert, closedWindow, isEscEvent, isEnterEvent };
