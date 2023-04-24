const showMsgTimed = (message, element, duration = null) => {
  element.innerText = message;
  element.style.display = 'block';

  setTimeout(() => {
    element.style.display = 'none';
  }, duration);
};

const showMsg = (message, element) => {
  element.innerText = message;
  element.style.display = 'block';
};

const reset = () => {
  const resetBtn = document.getElementById('reset');

  resetBtn.addEventListener('click', () => {
    window.location.reload();
  });
};

export { showMsgTimed, showMsg, reset };
