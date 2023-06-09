const modal = document.getElementById('myModal');
const closeButton = document.getElementsByClassName('close')[0];

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

const toggleModal = message => {
  const modalMsg = document.querySelector('.modal-message');

  if (modal.style.display === 'block') {
    modal.style.display = 'none';
  } else {
    modal.style.display = 'block';
    if (message) {
      modalMsg.innerHTML = message;
    } else {
      modalMsg.innerHTML = '';
    }
  }
};

closeButton.onclick = () => {
  toggleModal();
};

window.onclick = event => {
  if (event.target === modal) {
    toggleModal();
  }
};

export { showMsgTimed, showMsg, reset, toggleModal };
