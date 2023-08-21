'use strict';

import { getRandomHexColor } from './helpers';
const refs = {
  body: document.body,
  start: document.querySelector('[data-start'),
  stop: document.querySelector('[data-stop'),
};
let isActive = false;
let currentTimer;
refs.start.disabled = false;
refs.stop.disabled = true;

refs.start.addEventListener('click', onStartClick);
refs.stop.addEventListener('click', onEndClick);

function onStartClick(event) {
  if (isActive) return;
  isActive = true;
  currentTimer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
    refs.start.disabled = true;
    refs.stop.disabled = false;
  }, 1000);
  refs.start;
}

function onEndClick(event) {
  clearInterval(currentTimer);
  refs.start.disabled = false;
  refs.stop.disabled = true;
  isActive = false;
}
