// CS-30 Major Project 
// Aaron Su
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid;
let cellSize = 50;
let playerOne;
let gridSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = create2DArray(gridSize, gridSize);
  generateRoom(); //change later
  playerOne = new Player(0, 0, 30, 30, 5);
}

function draw() {
  background(220);
  displayGrid(gridSize, gridSize);

  //player movement
  playerOne.move();
  playerOne.display();
}


//creating and displaying grid
function create2DArray(row, col) {
  let gridList = [];
  for (let y = 0; y < col; y++) {
    gridList.push([]);
    for (let x = 0; x < row; x++) {
      gridList[y].push(0);
    }
  }
  return gridList;
}
function displayGrid(col, row) {
  for (let y = 0; y < col; y++) {
    for (let x = 0; x < row; x++) {
      if (grid[y][x] === 0) {
        fill("black");
      }
      if (grid[y][x] === 1) {
        fill("blue");
      }
      if (grid[y][x] === 2) {
        fill("white");
      }
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
    this.rightFree;
    this.leftFree;
    this.upFree;
    this.downFree;

    this.positionY = floor(this.y/cellSize);
    this.positionX = floor(this.x/cellSize);
  }
  move() {
    this.rightFree = true;
    this.leftFree = true;
    this.upFree = true;
    this.downFree = true;

    this.positionY = floor(this.y/cellSize);
    this.positionX = floor(this.x/cellSize);

    if (this.positionY <= gridSize-2) { //moving down sanity check
      if (grid[this.positionY+1][this.positionX] === 1 && this.y + this.height + this.speed >= (this.positionY+1) * cellSize) {
        this.downFree = false;
      }
      if (grid[this.positionY+1][this.positionX+1] === 1 && this.y + this.height + this.speed >= (this.positionY+1) * cellSize && this.x + this.width >= (this.positionX+1) * cellSize) {
        this.downFree = false;
      }
    }

    if (this.positionY >= 1) {//moving up sanity check
      if (grid[this.positionY-1][this.positionX] === 1 && this.y - this.speed <= (this.positionY) * cellSize) {
        this.upFree = false;
      }
      if (grid[this.positionY-1][this.positionX+1] === 1 && this.y - this.speed <= (this.positionY) * cellSize && this.x + this.width >= (this.positionX+1) * cellSize) {
        this.upFree = false;
      }
    }

    
    if (this.positionX <= gridSize-2) {//moving right sanity check
      if (this.positionY >= 1) {
        if (grid[this.positionY][this.positionX+1] === 1 && this.x + this.width + this.speed >= (this.positionX+1) * cellSize) {
          this.rightFree = false;
        }
      }
      if (this.positionY <= gridSize-2) {
        if (grid[this.positionY+1][this.positionX+1] === 1 && this.x + this.width + this.speed >= (this.positionX+1) * cellSize && this.y + this.height >= (this.positionY+1) * cellSize) {
          if (this.y + this.height >= (this.positionY+1) * cellSize) {
            this.rightFree = false;
          } 
        }
      }
    }

    if (this.positionX >= 1) {//moving left sanity check
      if (this.positionY >= 1) {
        if (grid[this.positionY][this.positionX-1] === 1 && this.x - this.speed <= (this.positionX) * cellSize) {
          this.leftFree = false;
        }
      }
      if (this.positionY <= gridSize-2) {
        if (grid[this.positionY+1][this.positionX-1] === 1 && this.x - this.speed <= (this.positionX) * cellSize) {
          if (this.y + this.height >= (this.positionY+1) * cellSize) {
            this.leftFree = false;
          }
        }
      }
    }
    // if (this.positionY <= gridSize-2) {
    //   if (this.y + this.height >= (this.positionY+1) * cellSize) {
    //     this.leftFree = false;
    //   }
    // }

    if (this.x + this.width + this.speed >= gridSize * cellSize) {
      this.rightFree = false;
    }
    if (this.x + this.speed <= 0) {
      this.leftFree = false;
    }
    if (this.y + this.height + this.speed >= gridSize * cellSize) {
      this.downFree = false;
    }
    if (this.y + this.speed <= 0) {
      this.upFree = false;
    }

    if (keyIsDown(87) && this.upFree) {
      this.y -= this.speed;
    }
    else if (keyIsDown(83) && this.downFree) {
      this.y += this.speed;
    }
    
    if (keyIsDown(65) && this.leftFree) {
      this.x -= this.speed;
    }
    else if (keyIsDown(68) && this.rightFree) {
      this.x += this.speed;
    }
  }
  display() {
    fill("red");
    rect(this.x, this.y, this.width, this.height);
  }
}

function generateRoom() {
  let roomWidth = random(4,8);
  let roomHeight = random(4,8);
  let locationY = 1;
  let locationX = 1;

  for (let y = locationY; y <= roomHeight; y++) {//walls
    for (let x = locationX; x <= roomWidth; x++){
      grid[y][x] = 1;
    }
  }

  for (let y = locationY+1; y <= roomHeight-1; y++) {//interior
    for (let x = locationX+1; x <= roomWidth-1; x++){
      grid[y][x] = 2;
    }
  }
}

