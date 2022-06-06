import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
const btnStart = document.querySelector('button[data-start]');
const dayEl = document.querySelector('span[data-days]');
const hourEl = document.querySelector('span[data-hours]');
const minuteEl = document.querySelector('span[data-minutes]');
const secondEl = document.querySelector('span[data-seconds]');

btnStart.disabled = true;
let selectedTime = null;

//обєкт для flatpicker
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      selectedTime = selectedDates[0];
      btnStart.disabled = false;
    }
  },
};
flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', onStartTime);

function onStartTime() {
  btnStart.disabled = true;
  const timeID = setInterval(() => {
    const curentTime = Date.now();
    const deltaTime = selectedTime - curentTime;
    const updateTime = convertMs(deltaTime);
    changesInterface(updateTime);
    if (deltaTime <= 0) {
      clearInterval(timeID);
    }
  }, 1000);
}
//змінює інтерфейс
function changesInterface(obg) {
  const { days, hours, minutes, seconds } = obg;
  dayEl.textContent = days;
  hourEl.textContent = hours;
  minuteEl.textContent = minutes;
  secondEl.textContent = seconds;
}

// функция розрахунку часу

function put(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = put(Math.floor(ms / day));
  const hours = put(Math.floor((ms % day) / hour));
  const minutes = put(Math.floor(((ms % day) % hour) / minute));
  const seconds = put(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
