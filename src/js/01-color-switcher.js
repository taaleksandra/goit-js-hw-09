function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

let timerId = null;

const colorChanger = () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  body.style.backgroundColor = `${getRandomHexColor()}`;
  console.log('Current body background color: ', body.style.backgroundColor);
  timerId = setInterval(() => {
    body.style.backgroundColor = `${getRandomHexColor()}`;
    console.log('Current body background color: ', body.style.backgroundColor);
  }, 1000);
};

const breakColorChanger = () => {
  startBtn.disabled = false;
  stopBtn.disabled = true;
  clearInterval(timerId);
};

stopBtn.disabled = true;
startBtn.addEventListener('click', colorChanger);
stopBtn.addEventListener('click', breakColorChanger);
