'use strict';
import Notiflix from 'notiflix';

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('[name="delay"]'),
  step: document.querySelector('[name="step"]'),
  amount: document.querySelector('[name="amount"]'),
  createPromisesBtn: document.querySelector('[type="submit"]'),
};

console.log(refs.amount);

refs.form.addEventListener('submit', onFormSubmit);

function onFormSubmit(event) {
  const amount = Number(refs.amount.value);
  event.preventDefault();
  for (let i = 1; i <= amount; i++) {
    let totalDelay =
      Number(refs.delay.value) + Number(refs.step.value) * (i - 1);
    setTimeout(() => {
      createPromise(i, totalDelay);
    }, totalDelay);
  }
  refs.form.reset();
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  if (shouldResolve) {
    return new Promise(resolve => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}`);
    });
  } else {
    // Reject
    return new Promise(reject => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}`);
    });
  }
}
