const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let canvasWidth = 200;
let canvasHeight = 200;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

// canvas background
ctx.fillStyle = "black";
ctx.fillRect(0, 0, canvasWidth, canvasHeight);

// array to store all cells
let cells = [];

let cellSize = 50;

// number of cols and rows base on cell size
let col = canvasWidth / cellSize;
let row = canvasHeight / cellSize;

// fill 2d array with coordinats and random alive or dead state
for (let x = 0; x < col; x++) {
  cells[x] = [];

  for (let y = 0; y < row; y++) {
    cells[x][y] = { x: x * cellSize, y: y * cellSize, alive: Boolean(Math.floor(Math.random() * 2)) };
  }
}

// deep clone the cells array
let nextGen = cells.map((cell) => [...cell]);

console.log("nextGen", nextGen);

// draw all cells
function draw() {
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < row; y++) {
      ctx.beginPath();
      ctx.rect(cells[x][y].x, cells[x][y].y, cellSize, cellSize);
      ctx.fillStyle = cells[x][y].alive ? "slateblue" : "white";
      ctx.fill();
      ctx.strokeStyle = "lightsteelblue";
      ctx.stroke();
      ctx.closePath();
    }
  }
}

draw();

// count all dead and alive neighbours from a specific cell
function countNeighbours() {
  let alive = 0;
  let dead = 0;

  for (let x = 0; x < col; x++) {
    for (let y = 0; y < row; y++) {
      if (x - 1 >= 0 && x + 1 < row && y - 1 >= 0 && y + 1 < col) {
        // ignore the edges
        cells[x][y - 1].alive ? alive++ : dead++; // up
        cells[x + 1][y].alive ? alive++ : dead++; // right
        cells[x][y + 1].alive ? alive++ : dead++; // bottom
        cells[x - 1][y].alive ? alive++ : dead++; // left
        cells[x - 1][y - 1].alive ? alive++ : dead++; // left-top
        cells[x + 1][y - 1].alive ? alive++ : dead++; // right-top
        cells[x + 1][y + 1].alive ? alive++ : dead++; // right-bottom
        cells[x - 1][y + 1].alive ? alive++ : dead++; // left- bottom
      }

      cells[x][y].neighbours = { alive, dead };

      alive = 0;
      dead = 0;
    }
  }
}

countNeighbours();

console.log(cells);

function render() {
  // ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  // ctx.fillStyle = "black";
  // ctx.fillRect(0, 0, canvasWidth, canvasHeight);
}

render();

// setInterval(render, 1000);

nextGen[0][0].alive = "*_*";
console.log(cells[0][0].alive);
