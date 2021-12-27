const canvas = document.getElementById("canvas");

const ctx = canvas.getContext("2d");

let canvasWidth = 700;
let canvasHeight = 700;

canvas.width = canvasWidth;
canvas.height = canvasHeight;

let cellSize = 5;

// number of cols and rows base on cell size
let col = canvasWidth / cellSize;
let row = canvasHeight / cellSize;

// array to store all cells
let cells = [];

// fill a 2d array with coordinats and random alive or dead state
for (let x = 0; x < col; x++) {
  cells[x] = [];

  for (let y = 0; y < row; y++) {
    cells[x][y] = {
      x: x * cellSize,
      y: y * cellSize,
      isAlive: Boolean(Math.floor(Math.random() * 2)), // true or false
      aliveNeighbours: null,
    };
  }
}

// count all dead and alive neighbours from a specific cell
function countNeighbours() {
  let alive = 0;
  let dead = 0;

  for (let x = 0; x < col; x++) {
    for (let y = 0; y < row; y++) {
      if (x - 1 >= 0 && x + 1 < row && y - 1 >= 0 && y + 1 < col) {
        // ignore the edges
        cells[x][y - 1].isAlive ? alive++ : dead++; // up
        cells[x + 1][y].isAlive ? alive++ : dead++; // right
        cells[x][y + 1].isAlive ? alive++ : dead++; // bottom
        cells[x - 1][y].isAlive ? alive++ : dead++; // left
        cells[x - 1][y - 1].isAlive ? alive++ : dead++; // left-top
        cells[x + 1][y - 1].isAlive ? alive++ : dead++; // right-top
        cells[x + 1][y + 1].isAlive ? alive++ : dead++; // right-bottom
        cells[x - 1][y + 1].isAlive ? alive++ : dead++; // left- bottom
      }

      // apply rules on the clone array
      if (cells[x][y].isAlive && (alive == 2 || alive == 3)) {
        nextGen[x][y].isAlive = true;
      } else if (!cells[x][y].isAlive && alive == 3) {
        nextGen[x][y].isAlive = true;
      } else {
        nextGen[x][y].isAlive = false;
      }

      cells[x][y].aliveNeighbours = alive;

      alive = 0;
      dead = 0;
    }
  }
}

console.log(cells);

// draw all cells
function draw() {
  for (let x = 0; x < col; x++) {
    for (let y = 0; y < row; y++) {
      if (cells[x][y].isAlive) {
        // only draw ailve cells (for better performance)
        ctx.beginPath();
        ctx.rect(cells[x][y].x, cells[x][y].y, cellSize, cellSize);
        ctx.fillStyle = "slateblue";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function render() {
  // clear frame
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  // deep clone the cells array
  nextGen = JSON.parse(JSON.stringify(cells));

  // draw all cells
  draw();

  // count alive neighbours for each cell and apply rules to nextGen array
  countNeighbours();

  cells = nextGen;
}

setInterval(render, 10);

// -----------------------------
// conway's game of life
// made with ☕ by milad gharibi
