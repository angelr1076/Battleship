import { showMsgTimed, showMsg, reset } from '../components/helpers';

describe('helpers', () => {
  let element;

  beforeEach(() => {
    jest.useFakeTimers();
    element = document.createElement('div');
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test('showMsgTimed displays a message for a specified duration', () => {
    showMsgTimed('Test message', element, 1000);
    expect(element.innerText).toBe('Test message');
    expect(element.style.display).toBe('block');

    jest.advanceTimersByTime(999);
    expect(element.style.display).toBe('block');

    jest.advanceTimersByTime(1);
    expect(element.style.display).toBe('none');
  });

  test('showMsg displays a message', () => {
    showMsg('Test message', element);
    expect(element.innerText).toBe('Test message');
    expect(element.style.display).toBe('block');
  });

  test('reset function reloads the window on reset button click', () => {
    const { location } = window;
    delete window.location;
    window.location = { reload: jest.fn() };

    document.body.innerHTML = '<button id="reset"></button>';
    const resetBtn = document.getElementById('reset');

    reset();
    resetBtn.click();

    expect(window.location.reload).toHaveBeenCalled();

    window.location = location;
  });
});
