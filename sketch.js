// CS-30 Major Project 
// Aaron Su
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid;
let cellSize = 50;
let playerOne;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = create2DArray();
  playerOne = new Player(0, 0, 30, 30, 5);
}

function draw() {
  background(220);
  displayGrid(10 ,10);

  //player movement
  playerOne.move();
  playerOne.display();
}


//creating and displaying grid
function create2DArray() {
  let gridList = [];
  for (let y = 0; y < 10; y++) {
    gridList.push([]);
    for (let x = 0; x < 10; x++) {
      gridList.push(0);
    }
  }
  return gridList;
}
function displayGrid(col, row) {
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      fill("white");
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

class Player { //player class
  constructor(x, y, width, height, speed) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.downFree = true;
    this.positionY = floor(this.y/cellSize);
    this.positionX = floor(this.x/cellSize);
  }
  move() {
    this.positionY = floor(this.y/cellSize);
    this.positionX = floor(this.x/cellSize);
    if (grid[this.positionY+1][this.positionX] === 1 && (this.y + this.speed >= (this.positionY+1) * cellSize)) {
      this.downFree = false;
    }


    if (keyIsDown(87)) {
      this.y -= this.speed;
    }
    else if (keyIsDown(83)) {
      this.y += this.speed;
    }
    
    if (keyIsDown(65)) {
      this.x -= this.speed;
    }
    else if (keyIsDown(68)) {
      this.x += this.speed;
    }
  }
  display() {
    fill("red");
    rect(this.x, this.y, this.width, this.height);
  }
}