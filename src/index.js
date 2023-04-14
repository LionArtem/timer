import './index.css';

const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
const errorElMax = document.querySelector('.error_Max');
const errorElMin = document.querySelector('.error_Min');

const createTimerAnimator = () => {
  return (seconds, hour = '00') => {
    let time = '00';
    let min = '00';
    let hh = hour;

    const intervalSec = (seconds, minText = '00', min) => {
      time = seconds;
      const intervalMin = setInterval(() => {
        time = time - 1;
        if (time >= 10) {
          timerEl.textContent = `${hh}:${minText}:${time}`;
        } else if (time > 0) {
          timerEl.textContent = `${hh}:${minText}:0${time}`;
        } else {
          timerEl.textContent = `${hh}:${minText}:0${time}`;
          clearInterval(intervalMin);
          value = [];
          buttonEl.disabled = false;
          inputEl.disabled = true;
          if (min) {
            animateTimer(min * 60, hh);
          }
          if (!min && hh !== '00') {
            animateTimer(hh * 3600);
          }
        }
      }, 1000);
    };

    if (seconds <= 60) {
      intervalSec(seconds);
    } else if (seconds <= 3600) {
      min = Math.floor(seconds / 60);
      if (min > 10) {
        if (seconds % 60 === 0) {
          const minText = `${min - 1}`;
          intervalSec(60, minText, min);
        } else {
          const minText = `${min}`;
          intervalSec(seconds % 60, minText, min);
        }
      } else if (min > 0) {
        if (seconds % 60 === 0) {
          const minText = `0${min - 1}`;
          intervalSec(60, minText, min);
        } else {
          const minText = `0${min}`;
          intervalSec(seconds % 60, minText, min);
        }
      } else {
        timerEl.textContent = `${hh}:0${min}:${time}`;
        clearInterval(intervalMin);
        intervalSec(60);
      }
    } else {
      hour = Math.floor(seconds / 3600);
      if (hour < 10) {
        animateTimer(seconds % 3600, `0${hour}`);
      } else {
        animateTimer(seconds % 3600, `${hour}`);
      }
    }
  };
};

const animateTimer = createTimerAnimator();

let value = [];

inputEl.addEventListener('input', (e) => {
  if (Number(inputEl.value <= 35999)) {
    errorElMax.classList.remove('addError');
  }
  if (Number(inputEl.value > 1)) {
    errorElMin.classList.remove('addError');
  }
  if (inputEl.value) {
    //если не пустой инпут
    if (e.data !== null) {
      //усли это не удаление
      if (onNumbers(e.data) === undefined) {
        //если это буква
        arrInValue();
        return;
      }
      value.push(onNumbers(e.data)); //если это цыфра
      arrInValue();
      return;
    }
    value.pop();
    return;
  }
  value.shift();
});

const arrInValue = () => (inputEl.value = value.join(''));

const onNumbers = (value) => {
  if (Number(Number(value))) {
    return value;
  }
  console.log('not number');
};

document.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    countdown();
  }
});

buttonEl.addEventListener('click', () => countdown());

const countdown = () => {
  const seconds = Number(inputEl.value);
  if (seconds <= 1) {
    errorElMin.classList.add('addError');
    return;
  }
  if (seconds <= 35999) {
    buttonEl.classList.add('buttonDisable');
    buttonEl.disabled = true;
    inputEl.disabled = true;
    animateTimer(seconds);
    inputEl.value = '';
    return;
  }
  errorElMax.classList.add('addError');
  console.log('> 36000');
};
