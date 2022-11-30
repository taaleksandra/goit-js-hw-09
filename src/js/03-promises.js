'use strict';

import Notiflix from 'notiflix';

const form = document.querySelector('form');
const btnCreate = document.querySelector('button');

// let promiseNumber = 1;
// let data = {
//   position: '',
//   delay: '',
// };
let timerId = null;

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  new Promise((resolve, reject) => {
    data = {
      position: position,
      delay: delay,
    };
    if (shouldResolve) {
      // Fulfill
      resolve({ position, delay });
    } else {
      // Reject
      reject({ position, delay });
    }
  });
}

const renderMessage = ({ position, delay }) => {
  createPromise({ position, delay })
    .then(({ position, delay }) => {
      console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
    });
};

const btnHandler = event => {
  event.preventDefault();
  const {
    elements: { delay, step, amount },
  } = form;
  for (let i = 0; i < amount.value; i++) {
    const promiseNumber = i + 1;
    renderMessage({ promiseNumber, delay });
  }
};
