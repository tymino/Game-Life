let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let btnStart = document.getElementById('btn-start');
let btnRandom = document.getElementById('btn-random');
let btnReset = document.getElementById('btn-reset');

let arr = [];
let generation = 0;
let activeGame = false;

const drawRect = () => {
  ctx.clearRect(0, 0, 500, 500);
  for (let i = 0; i < 250; i++) {
    for (let j = 0; j < 250; j++) {
      if (arr[i][j] == 1) {
        ctx.fillRect(j * 2, i * 2, 2, 2);
      }
    }
  }
};

// For infinity field
const startField = (index) => index == 0 ? 250 : index;
const endField = (index) => index == 249 ? -1 : index;

// Init
const initField = () => {
  for (let i = 0; i < 250; i++) {
    arr[i] = [];
    for (let j = 0; j < 250; j++) {
      arr[i][j] = 0;
    }
  }
};
initField();

// Main loop
const startGame = () => {
  let life = [];
  for (let i = 0; i < 250; i++) {
    life[i] = [];
    for (let j = 0; j < 250; j++) {
      let neighbors = 0;
      if (arr[startField(i) - 1][j] == 1) neighbors++; // up
      if (arr[i][endField(j) + 1] == 1) neighbors++; // right
      if (arr[endField(i) + 1][j] == 1) neighbors++; // down
      if (arr[i][startField(j) - 1] == 1) neighbors++; // left
      if (arr[startField(i) - 1][endField(j) + 1] == 1) neighbors++;
      if (arr[endField(i) + 1][endField(j) + 1] == 1) neighbors++;
      if (arr[endField(i) + 1][startField(j) - 1] == 1) neighbors++;
      if (arr[startField(i) - 1][startField(j) - 1] == 1) neighbors++;

      if (neighbors < 2 || neighbors > 3) {
        life[i][j] = 0;
      } else if (neighbors == 3) {
        life[i][j] = 1;
      } else {
        life[i][j] = arr[i][j];
      }
    }
  }
  arr = life;
  drawRect();
  generation++;
  document.getElementById('count').innerHTML = generation;

  requestAnimationFrame(startGame);
};

const randomFill = () => {
  for (let i = 0; i < 250; i++) {
    for (let j = 0; j < 250; j++) {
      (Math.round(Math.random()) == 1) ? arr[i][j] = 1 : arr[i][j] = 0;
    }
  }
};

// Mouse
canvas.addEventListener('mousemove', (event) => {
  if (!activeGame) {
    let x = event.offsetX;
    let y = event.offsetY;

    x = Math.floor(x / 2);
    y = Math.floor(y / 2);
    arr[y][x] = 1;
    drawRect();
  }
});

// Buttons
btnStart.addEventListener('click', () => {
  startGame();
  btnStart.disabled = 'false';
  btnRandom.disabled = 'false';
  activeGame = true;
});
btnRandom.addEventListener('click', () => {
  randomFill();
  drawRect();
});
btnReset.addEventListener('click', () => {
  window.location.reload();
});