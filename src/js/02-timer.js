'use strict';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import language from 'flatpickr/dist/l10n/uk';
import { convertMs } from './helpers';
import Notiflix from 'notiflix';
import { convertMs } from './helpers';

Notiflix.Report.info(
  '',
  'Таймер зворотнього відліку до смерті русні',
  'Розпочнемо!'
);

const refs = {
  datePicker: document.querySelector('#datetime-picker'),
  startCountdown: document.querySelector('button'),
  timer: document.querySelector('.timer'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.startCountdown.disabled = true;

let isActive = false;
let selectedDate = '';
refs.startCountdown.disabled = true;

refs.startCountdown.addEventListener('click', onStartCountdownClick);

flatpickr(refs.datePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(), //встановлює поточну дату в інпут
  minuteIncrement: 1,
  locale: 'uk',

  onClose(selectedDates) {
    const currentDate = new Date().setSeconds(0, 0);
    selectedDate = selectedDates[0];
    console.log(selectedDates[0]);
    console.log(convertMs(selectedDates[0] - currentDate));

    if (selectedDates[0] <= currentDate) {
      Notiflix.Notify.failure(
        'Вся русня здохне, але, на жаль, тільки в найближчому майбутньому. Оберіть бажану дату.',
        {
          timeout: 4000,
        }
      );
      refs.startCountdown.disabled = true;
    } else {
      refs.startCountdown.disabled = false;
      Notiflix.Notify.success('Запуску відліку до найбільшого свята готовий!');
      refs.startCountdown.disabled = false;
    }
  },
});

function onStartCountdownClick(event) {
  refs.startCountdown.disabled = true;
  if (isActive) {
    Notiflix.Notify.warning(
      'Таймер вже запущено, дочекайтесь закінчення роботи поточного і повторіть спробу'
    );
    return;
  }

  Notiflix.Notify.info('Відлік розпочато!');
  let timeRemain = {};

  const interval = setInterval(() => {
    isActive = true;
    let timeDiff = selectedDate - new Date();
    if (timeDiff >= 0) {
      timeRemain = convertMs(timeDiff);
      refs.days.textContent = timeRemain.days;
      refs.hours.textContent = timeRemain.hours;
      refs.minutes.textContent = timeRemain.minutes;
      refs.seconds.textContent = timeRemain.seconds;
      console.log(timeRemain);
    } else {
      clearInterval(interval);
      Notiflix.Report.success('Вся русня здохла!', '', 'Слава Україні!');
    }
  }, 1000);
}
