// CS-30 Major Project 
// Aaron Su
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid;
let cellSize = 120;
let gridSize = 60;

let playerOne;
let playerOnePositionX;
let playerOnePositionY;
let bulletList = [];

let roomList = [];
let roomNumber;
let iCount = 0;

let enemyList = [];

let screenMoveX = 0;
let screenMoveY = 0;

let time;
let shootLastTime;

let floorImg;
let wallImg;

function preload() {
  floorImg = loadImage("assets/floorOne.png");
  wallImg = loadImage("assets/wallOne.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = create2DArray(gridSize, gridSize);
  generateDungeon();
  //generateRoom(); //change later
  spawnLocation(playerOnePositionX, playerOnePositionY);
  playerOne = new Player(playerOnePositionX, playerOnePositionY, cellSize/2, cellSize/2, 10, 250, 100);
  spawnEnemies();
  screenMoveX -= round(width/2+(playerOne.x-width));
  screenMoveY -= round(height/2+(playerOne.y-height));
  time = millis();
  shootLastTime = time;
}

function draw() {
  background(220);
  displayGrid(gridSize, gridSize); 
  time = millis();
  console.log(playerOne.health);

  //player movement
  playerOne.move();
  playerOne.shoot();
  playerOne.display();


  //enemy movement
  for (let i = 0; i < enemyList.length; i++) {
    enemyList[i].move();
    enemyList[i].display();
    if (enemyList[i].lives <= 0) {
      enemyList.splice(i, 1);
    }
  }

  //bullets
  for (let i = 0; i < bulletList.length; i++){
    bulletList[i].move();
    bulletList[i].display();    
    if (bulletList[i].x + screenMoveX < 0 || bulletList[i].x + screenMoveX > width || bulletList[i].y < 0 || bulletList[i].y + bulletList[i].height > height){
      bulletList.splice(i, 1);
    }
    else if (bulletList[i].hit <= 0) {
      bulletList.splice(i, 1);
    }

  }
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
        rect(x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
      }
      if (grid[y][x] === 1) { //wall
        image(wallImg, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
        //fill("blue");
      }
      if (grid[y][x] === 2) { //interior
        //fill("white");
        image(floorImg, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
        //rect(x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
      }
      
    }
  }
}

class Player { //player class
  constructor(x, y, width, height, speed, shootSpeed, health) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.rightFree;
    this.leftFree;
    this.upFree;
    this.downFree;
    this.shootSpeed = shootSpeed;
    this.health = health;

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

    if (this.positionY <= gridSize-2) { //moving down sanity check //problem
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
      screenMoveY += this.speed; 
    }
    else if (keyIsDown(83) && this.downFree) {
      this.y += this.speed;
      screenMoveY -= this.speed; 
    }
    
    if (keyIsDown(65) && this.leftFree) {
      this.x -= this.speed;
      screenMoveX += this.speed; 
    }
    else if (keyIsDown(68) && this.rightFree) {
      this.x += this.speed;
      screenMoveX -= this.speed; 
      
    }
  }
  display() {
    fill("grey");
    //circle(this.x+this.width/2, this.y+this.width/2, 70);
    fill("red");
    rect(this.x + screenMoveX, this.y+ screenMoveY, this.width, this.height);
  }

  shoot() {
    if (mouseIsPressed &&  time - shootLastTime > this.shootSpeed) {
      let playerBullet = new Bullet(playerOne.x, playerOne.y, 15, 20, 3);
      bulletList.push(playerBullet);
      shootLastTime = time;
    }
  }
}

class Bullet {
  constructor(x, y, radius, speed, hit) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.hit = hit;
    this.disX = mouseX - screenMoveX - playerOne.x;
    this.disY = mouseY - screenMoveY - playerOne.y;
  }
  move() {
    this.x += this.disX/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);
    this.y += this.disY/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);

    for (let i = 0; i < enemyList.length; i++){//problem
      if (this.x > enemyList[i].x && this.x < enemyList[i].x + enemyList[i].width && this.y > enemyList[i].y && this.y < enemyList[i].y + enemyList[i].height){
        this.hit -= 1;
        enemyList[i].lives -=1;
      }
    }
  }
  display() {
    //console.log("2");
    fill("red");
    circle(this.x + screenMoveX, this.y + screenMoveY, this.radius);
  }
}

class Enemy {
  constructor(x, y, width, height, speed, lives) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.lives = lives;
    this.attackLastTime = time;
  }
  move() {
    if (sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) < cellSize *3) {
      if (this.x < playerOne.x) {
        this.x += this.speed;
      }
      else if (this.x > playerOne.x) {
        this.x -= this.speed;
      }
      if (this.y < playerOne.y) {
        this.y += this.speed;
      }
      else if (this.y > playerOne.y) {
        this.y -= this.speed;
      }
    } 
    if (time - this.attackLastTime > 2000) {
      if (this.x - playerOne.x > 0) { //checking for enemy character coliision
        if (this.x - playerOne.x < this.width) {
          if (this.y - playerOne.y > 0) { 
            if (this.y - playerOne.y < this.height) {
              playerOne.health -= 5;
            }
            
          }
          else {
            if (-(this.y - playerOne.y) < playerOne.height) {
              playerOne.health -= 5;
            }
          }
        }
      }
      else {
        if (-(this.x - playerOne.x) < playerOne.width) {
          if (this.y - playerOne.y > 0) { 
            if (this.y - playerOne.y < this.height) {
              playerOne.health -= 5;
            }
          }
          else {
            if (-(this.y - playerOne.y) < playerOne.height) {
              playerOne.health -= 5;
            }
          }
        }
      }
      
    }
    this.attackLastTime = time;
  }
    
  //   if (this.x > playerOne.x && this.x < playerOne.x + playerOne.width || this.x + width < playerOne.x && this.x < playerOne.x + playerOne.width )
  // }

  display() {
    fill("green");
    rect(this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
  }
}

function generateRoom(locX, locY) {
  let roomWidth = round(random(4,8));
  let roomHeight = round(random(4,8));

  let locationY = locY;
  let locationX = locX;

  roomList.push([locationX, locationY, roomWidth, roomHeight]);

  for (let y = locationY; y <= locationY + roomHeight; y++) {//walls
    for (let x = locationX; x <= locationX + roomWidth; x++){
      grid[y][x] = 1;
    }
  }

  for (let y = locationY+1; y <= locationY + roomHeight-1; y++) {//interior
    for (let x = locationX+1; x <= locationX + roomWidth-1; x++){
      //grid[y][x] = 2;
    }
  }
}

function generateInterior(){
  let interior = false;
  for (let y = 0; y < gridSize; y++) {//interior
    for (let x = 0; x < gridSize; x++){
      if (interior === true && grid[y][x] === 1) {
        if (grid[y+1][x] !== 0 && grid[y-1][x] !== 0) {
          grid[y][x] = 2;
        }
      }
      if (grid[y][x] === 1 && interior === false) {
        interior = true;
      }
      if (interior && grid[y][x] === 0) {
        interior = false;
        grid[y][x-1] = 1;
      }

      //grid[y][x] = 2;
    }
  }
} 

function generateBridge() {

  if (roomList[iCount-1][1] > roomList[iCount][1]){ //building up
    for (let y = roomList[iCount-1][1]; y > roomList[iCount][1]-1; y--) {//poss prob
      for (let x = roomList[iCount-1][0] ; x < roomList[iCount-1][0] + 3; x++) {
        grid[y][x] = 1;
      }
    }
  }
  else if (roomList[iCount][1] > roomList[iCount-1][1]) { //building down
    for (let y = roomList[iCount-1][1]; y < roomList[iCount][1]+3; y++) {//x < roomList[i+1][0] - roomList[i][0]
      for (let x = roomList[iCount-1][0] ; x < roomList[iCount-1][0] + 3; x++) {
        grid[y][x] = 1;
      }
    }
  }

  if (roomList[iCount-1][0] > roomList[iCount][0]) { //building left
    for (let y = roomList[iCount][1]; y < roomList[iCount][1] + 3; y++) {
      for (let x = roomList[iCount-1][0]; x > roomList[iCount][0]; x--) {
        grid[y][x] = 1;
      }
    }
  }

  else if (roomList[iCount-1][0] < roomList[iCount][0]) {//building right
    for (let y = roomList[iCount][1]; y < roomList[iCount][1] + 3; y++) {
      for (let x = roomList[iCount-1][0]; x < roomList[iCount][0]; x++) {
        grid[y][x] = 1;
      }
    }
  }
}

function generateDungeon() { 
  roomNumber = round(random(10,14)); 

  for (let i = 0; i < roomNumber; i++) {
    generateRoom(round(random(1, gridSize-10)), round(random(1, gridSize-10)));
    if (i > 0) {
      generateBridge();
    }
    iCount += 1;
  }
  generateInterior();



  for (let i = 0; i < 3; i++) {
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] !== 0) {
          if (grid[y+1][x] !== 0 && grid[y-1][x] !== 0 && grid[y][x+1] !== 0 && grid[y][x-1] !== 0) {
            if (grid[y][x] === 1 && (grid[y][x-1] === 2 && grid[y][x+1] === 2) || (grid[y-1][x] === 2 && grid[y+1][x] === 2)) {
              grid[y][x] = 2;
            }
          }
        }
      }
    }
    for (let y = 0; y < gridSize; y++) {
      for (let x = 0; x < gridSize; x++) {
        if (grid[y][x] === 1) {
          if (grid[y+1][x] !== 0 && grid[y-1][x] !== 0 && grid[y][x+1] !== 0 && grid[y][x-1] !== 0) {
            if (grid[y+1][x] === 1 && grid[y-1][x] === 2 || grid[y-1][x] === 2 && grid[y+1][x] === 1 || grid[y][x+1] === 1 && grid[y][x-1] === 2 || grid[y][x-1] === 1 && grid[y][x+1] === 2) {
              grid[y][x] = 2;
            }
          }
        }
      }
    }
  }
} 

function spawnLocation(objectX, objectY) { //edit later
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (grid[y][x] === 2) {
        return playerOnePositionX = x * cellSize, playerOnePositionY = y * cellSize;
      }
    }
  }
}

function spawnEnemies() {
  for (let i = 0; i < roomNumber; i++){
    let spaceCount = 0;
    for (let y = roomList[i][1]; y < roomList[i][1] + roomList[i][3]; y++){
      for (let x = roomList[i][0]; x < roomList[i][0] + roomList[i][2]; x++) {
        if (grid[y][x] === 2) {
          spaceCount ++;
        }
      }
    }
    for (let a = 0; a < round(spaceCount/5); a++) {
      let minion = new Enemy(round(random((roomList[i][0]+1) * cellSize, (roomList[i][0] + roomList[i][2]-1) * cellSize)), round(random((roomList[i][1]+1)* cellSize, (roomList[i][1] + roomList[i][3]-1)* cellSize)), cellSize/2, cellSize/2, 5, 5);
      enemyList.push(minion);
    }
  }  
}


