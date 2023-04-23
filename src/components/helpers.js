const showMessage = (message, element, duration) => {
  element.innerText = message;
  element.style.display = 'block';

  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
};

export { showMessage };
