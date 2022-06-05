function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const bodyEl = document.body;
const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('[data-stop]');
// console.log(btnStart, btnStop);
let intervalId = null;
btnStart.addEventListener('click', onMarkupColor);
btnStop.addEventListener('click', onStopColor);
function onMarkupColor() {
  btnStart.disabled = true;
  intervalId = setInterval(randomColor, 1000);
  console.log(intervalId);
}
function onStopColor() {
  btnStart.disabled = false;
  clearInterval(intervalId);
}

function randomColor() {
  //генерує колір
  const colorNew = getRandomHexColor();
  bodyEl.style.backgroundColor = colorNew;
}
