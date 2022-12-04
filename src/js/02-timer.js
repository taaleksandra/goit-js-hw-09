'use strict';

import Notiflix from 'notiflix';
// Opisany w dokumentacji
import flatpickr from 'flatpickr';
// Dodatkowy import stylów
import 'flatpickr/dist/flatpickr.min.css';

const dataInput = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button');

const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

startBtn.disabled = true;
let timerId = null;
let dataMilliseconds = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(timerId);
    daysField.textContent = '00';
    hoursField.textContent = '00';
    minutesField.textContent = '00';
    secondsField.textContent = '00';
    console.log(selectedDates[0]);
    dataMilliseconds =
      selectedDates[0].getTime() - options.defaultDate.getTime();

    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.init({
        fontSize: '1.5rem',
        width: '25vw',
        fontAwesomeIconSize: '1.5rem',
      });
      Notiflix.Notify.warning('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const addLeadingZero = value => {
  if ((value.length, 2)) {
    return value.padStart(2, '0');
  }
  return value;
};

const startTimer = () => {
  console.log('Uruchomiono odliczanie');
  startBtn.disabled = true;

  timerId = setInterval(() => {
    let date = convertMs(dataMilliseconds);

    const { days, hours, minutes, seconds } = date;

    daysField.textContent = addLeadingZero(days.toString());
    hoursField.textContent = addLeadingZero(hours.toString());
    minutesField.textContent = addLeadingZero(minutes.toString());
    secondsField.textContent = addLeadingZero(seconds.toString());

    dataMilliseconds -= 1000;
    if (dataMilliseconds <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
};

const selectInput = flatpickr(dataInput, options);
startBtn.addEventListener('click', startTimer);
