import { Notify } from 'notiflix/build/notiflix-notify-aio';
const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitForm);
function onSubmitForm(evt) {
  evt.preventDefault();
  let delay = Number(evt.currentTarget.delay.value);
  const step = Number(evt.currentTarget.step.value);
  const amount = Number(evt.currentTarget.amount.value);

  for (let i = 0; i < amount; i += 1) {
    delay += step;
    createPromise(i + 1, delay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }

  evt.currentTarget.reset();
}
//ф-ція яка вертає проміси
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      rejected({ position, delay });
    }, delay);
  });
}
