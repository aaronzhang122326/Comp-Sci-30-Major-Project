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

let playerROne;
let playerRTwo;
let playerRThree;
let playerRFour;

let playerLOne;
let playerLTwo;
let playerLThree;
let playerLFour;

let walkCount = 0;

let bulletList = [];
let enemyBulletList = [];

let roomList = [];
let roomNumber;
let iCount = 0;

let minionList = [];
let archerList = [];

let screenMoveX = 0;
let screenMoveY = 0;

let time;
let playerShootLastTime;
let enemyShootLastTime;
let range = true;

let floorImg;
let wallImg;
let slashImg;

let slashing = false;
let slashAngle;
let melee = false;

function preload() {
  floorImg = loadImage("assets/floorOne.png");
  wallImg = loadImage("assets/wallOne.png");
  slashImg = loadImage("assets/swordSlash.png");

  playerROne = loadImage("assets/player_sprite.png");
  playerRTwo = loadImage("assets/player_sprite_2.png");
  playerRThree = loadImage("assets/player_sprite_3.png");
  playerRFour = loadImage("assets/player_sprite_4.png");

  playerLOne = loadImage("assets/player_sprite_5.png");
  playerLTwo = loadImage("assets/player_sprite_6.png");
  playerLThree = loadImage("assets/player_sprite_7.png");
  playerLFour = loadImage("assets/player_sprite_8.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = create2DArray(gridSize, gridSize);
  generateDungeon();
  spawnLocation(playerOnePositionX, playerOnePositionY);
  playerOne = new Player(playerOnePositionX, playerOnePositionY, cellSize/2, cellSize/2, 10, 250, 100);
  spawnEnemies();
  screenMoveX -= round(width/2+(playerOne.x-width));
  screenMoveY -= round(height/2+(playerOne.y-height));
  time = millis();
  playerShootLastTime = time;
  enemyShootLastTime = time;
  // let archer = new Archers(playerOne.x, playerOne.y+200, cellSize/2, cellSize/2, 5, 5);
  // archerList.push(archer);
}

function draw() {
  background(220);
  displayGrid(gridSize, gridSize); 
  time = millis();

  //player movement
  playerOne.move();
  playerOne.shoot();
  playerOne.slash();
  playerOne.display();

  //minion movement
  for (let i = 0; i < minionList.length; i++) {
    minionList[i].move();
    minionList[i].display();
    if (minionList[i].lives <= 0) {
      minionList.splice(i, 1);
    }
  }

  //archer movement
  for (let i = 0; i < archerList.length; i++) {
    archerList[i].move();
    archerList[i].display();
    if (archerList[i].lives <= 0) {
      archerList.splice(i, 1);
    }
  }

  //bullets splice
  for (let i = 0; i < bulletList.length; i++){
    bulletList[i].move();
    bulletList[i].display();    
    if (bulletList[i].x + screenMoveX < 0 || bulletList[i].x + screenMoveX > width || bulletList[i].y < 0 || bulletList[i].y + bulletList[i].height > height){
      bulletList.splice(i, 1);
    }
    else if (bulletList[i].hit <= 0) {
      bulletList.splice(i, 1);
    }
    else {
      let blocks = [
        {x: floor(bulletList[i].x/cellSize) * cellSize, y: floor(bulletList[i].y/cellSize) * cellSize},
      ]
      if (grid[floor(bulletList[i].y/cellSize)][floor(bulletList[i].x/cellSize)] !== 2){
        if (collideRectCircle(blocks[0].x, blocks[0].y, cellSize, cellSize, bulletList[i].x, bulletList[i].y, bulletList[i].radius)){
          bulletList.splice(i, 1);
        }
      }
    }
  }
    //bullets splice
  for (let i = 0; i < enemyBulletList.length; i++){
    enemyBulletList[i].move();
    enemyBulletList[i].display();    
    if (enemyBulletList[i].x + screenMoveX < 0 || enemyBulletList[i].x + screenMoveX > width || enemyBulletList[i].y < 0 || enemyBulletList[i].y + enemyBulletList[i].height > height){
      enemyBulletList.splice(i, 1);
    }
    else if (enemyBulletList[i].hit <= 0) {
      enemyBulletList.splice(i, 1);
    }
    else {
      let blocks = [
        {x: floor(enemyBulletList[i].x/cellSize) * cellSize, y: floor(enemyBulletList[i].y/cellSize) * cellSize},
      ]
      if (grid[floor(enemyBulletList[i].y/cellSize)][floor(enemyBulletList[i].x/cellSize)] !== 2){
        if (collideRectCircle(blocks[0].x, blocks[0].y, cellSize, cellSize, enemyBulletList[i].x, enemyBulletList[i].y, enemyBulletList[i].radius)){
          enemyBulletList.splice(i, 1);
        }
      }
    }
  }
  displayData();
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
      }
      if (grid[y][x] === 2) { //interior
        image(floorImg, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
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
    movementCheck(this);

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

    if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)) {
      walkCount += 1;
    }
    else {
      walkCount = 0;
    }

    if (walkCount > 20) {
      walkCount = 0;
    }
  }
  display() {
    if (walkCount < 10) {
      //image(playerImgOne, this.x + screenMoveX, this.y+ screenMoveY, this.width, this.height);
    }
    if (walkCount > 10) {
      //image(playerImgTwo, this.x + screenMoveX, this.y+ screenMoveY, this.width, this.height);
    }
    fill("red");
    rect(this.x + screenMoveX, this.y+ screenMoveY, this.width, this.height);
  }

  shoot() { 
    if (mouseIsPressed &&  time - playerShootLastTime > this.shootSpeed && range) {
      let playerBullet = new Bullet(playerOne.x+playerOne.width/2, playerOne.y+playerOne.height/2, 15, 30, 1);
      bulletList.push(playerBullet);
      playerShootLastTime = time;
    }
  }
  slash(){ 
    if (mouseIsPressed &&  time - playerShootLastTime > this.shootSpeed && slashing === false) {
      angleMode(DEGREES);
      slashing = true;
      playerShootLastTime = time;
      slashAngle = atan2(mouseY - (this.y + screenMoveY + this.height/2), mouseX - (this.x + screenMoveX + this.width/2));

    }
    if (slashing & melee) {
      push();
      translate(this.x + screenMoveX + this.width/2, this.y + screenMoveY + this.height/2);
      rotate(slashAngle+180 - 40);
      image(slashImg, -this.width - 20, -this.height -20, this.width, this.height*2);
      pop();

      // push();
      // translate(this.x + screenMoveX + this.width/2, this.y + screenMoveY + this.height/2);
      // rotate(slashAngle + 345);
      // arc(0, 0, arcRadius*2, arcRadius*2, -ARC_ANGLE/2, ARC_ANGLE/2);
      // pop(); //change later
      slashcollision(this, minionList);
      slashcollision(this, archerList);
    }

    if (time - playerShootLastTime > 100) {
      slashing = false;
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
    this.disX = mouseX - screenMoveX - playerOne.x-playerOne.width/2;
    this.disY = mouseY - screenMoveY - playerOne.y-playerOne.height/2;
  }
  move() {
    this.x += this.disX/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);
    this.y += this.disY/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);

    //bullet minion detection
    for (let i = 0; i < minionList.length; i++){
      if (this.x > minionList[i].x && this.x < minionList[i].x + minionList[i].width && this.y > minionList[i].y && this.y < minionList[i].y + minionList[i].height){
        this.hit -= 1;
        minionList[i].lives -=1;
      }
    }

    //bullet archer detection
    for (let i = 0; i < archerList.length; i++){
      if (this.x > archerList[i].x && this.x < archerList[i].x + archerList[i].width && this.y > archerList[i].y && this.y < archerList[i].y + archerList[i].height){
        this.hit -= 1;
        archerList[i].lives -=1;
      }
    }
  }
  display() {
    fill("red");
    circle(this.x + screenMoveX, this.y + screenMoveY, this.radius);
  }
}

class EnemyBullet extends Bullet {
  constructor(x, y, radius, speed, hit) {
    super(x, y, radius, speed, hit);
    this.disX = this.x - playerOne.x-playerOne.width/2;
    this.disY = this.y - playerOne.y-playerOne.height/2;
  }
  move() {
    this.x -= this.disX/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);
    this.y -= this.disY/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);

    if (this.x > playerOne.x && this.x < playerOne.x + playerOne.width && this.y > playerOne.y && this.y < playerOne.y + playerOne.height){
      this.hit -= 1;
      playerOne.health -= 5;
    }
  }
  display() {
    fill("green");
    circle(this.x + screenMoveX, this.y + screenMoveY, this.radius);
  }
}

class Minions {
  constructor(x, y, width, height, speed, lives) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.lives = lives;
    this.attackLastTime = 0;
    this.rightFree = true;
    this.leftFree = true;
    this.upFree = true;
    this.downFree = true;
  }
  move() {
    if (sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) < cellSize *10) {
      movementCheck(this);
      if (this.x < playerOne.x && this.rightFree) {
        this.x += this.speed;
      }
      else if (this.x > playerOne.x && this.leftFree) {
        this.x -= this.speed;
      }
      if (this.y < playerOne.y && this.downFree) {
        this.y += this.speed;
      }
      else if (this.y > playerOne.y && this.upFree) {
        this.y -= this.speed;
      }
    } 
    if (time - this.attackLastTime > 1000) {
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
      this.attackLastTime = time;
    }
  }

  display() {
    fill("green");
    rect(this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
  }
}

class Archers extends Minions {
  constructor(x, y, width, height, speed, lives, shootSpeed, ShootLastTime) {
    super(x, y, width, height, speed, lives);
    this.x = x;
    this.y = y;
    this.shootSpeed = shootSpeed;
    this.enemyShootLastTime = ShootLastTime;
  }
  move() {
    if (sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) < cellSize *10 && sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) > cellSize * 3) {
      movementCheck(this);
      if (this.x < playerOne.x && this.rightFree) {
        this.x += this.speed;
      }
      else if (this.x > playerOne.x && this.leftFree) {
        this.x -= this.speed;
      }
      if (this.y < playerOne.y && this.downFree) {
        this.y += this.speed;
      }
      else if (this.y > playerOne.y && this.upFree) {
        this.y -= this.speed;
      }
    } 
    else if (sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) < cellSize *10){
      this.shoot();
    }
  }
  shoot() {    
    if (time - this.enemyShootLastTime > this.shootSpeed) {
      let enemyBullet = new EnemyBullet(this.x + this.width/2, this.y + this.height/2, 15, 15, 1);
      enemyBulletList.push(enemyBullet);
      this.enemyShootLastTime = time;
    }
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
    }
  }
} 

function generateBridge() {
  if (roomList[iCount-1][1] > roomList[iCount][1]){ //building up
    for (let y = roomList[iCount-1][1]; y > roomList[iCount][1]-1; y--) {
      for (let x = roomList[iCount-1][0] ; x < roomList[iCount-1][0] + 3; x++) {
        grid[y][x] = 1;
      }
    }
  }
  else if (roomList[iCount][1] > roomList[iCount-1][1]) { //building down
    for (let y = roomList[iCount-1][1]; y < roomList[iCount][1]+3; y++) {
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

function spawnLocation(objectX, objectY) { 
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
    for (let a = 0; a < round(spaceCount/10); a++) {
      let minion = new Minions(round(random((roomList[i][0]+1) * cellSize, (roomList[i][0] + roomList[i][2]-1) * cellSize)), round(random((roomList[i][1]+1)* cellSize, (roomList[i][1] + roomList[i][3]-1)* cellSize)), cellSize/2, cellSize/2, 5, 5);
      minionList.push(minion);
    }
    for (let a = 0; a < round(spaceCount/10); a++) {
      let archer = new Archers(round(random((roomList[i][0]+1) * cellSize, (roomList[i][0] + roomList[i][2]-1) * cellSize)), round(random((roomList[i][1]+1)* cellSize, (roomList[i][1] + roomList[i][3]-1)* cellSize)), cellSize/2, cellSize/2, 5, 5, 1000, 0);//enemyShootLastTime
      archerList.push(archer);
    }
  }  
}

function displayData() {
  if (playerOne.health >= 0) {
    fill("green");
    rect(50, 50, playerOne.health* 5, 25);
    fill("red");
    rect(50 + playerOne.health*5, 50, 500-playerOne.health*5, 25);
  } 
}

function movementCheck(object){

  object.rightFree = true;
  object.leftFree = true;
  object.upFree = true;
  object.downFree = true;

  object.positionY = floor(object.y/cellSize);
  object.positionX = floor(object.x/cellSize);

  if (object.positionY <= gridSize-2) { //moving down sanity check 
    if (grid[object.positionY+1][object.positionX] === 1 && object.y + object.height + object.speed >= (object.positionY+1) * cellSize) {
      //console.log("1");
      object.downFree = false;
    }
    if (grid[object.positionY+1][object.positionX+1] === 1 && object.y + object.height + object.speed >= (object.positionY+1) * cellSize && object.x + object.width >= (object.positionX+1) * cellSize) {
      //console.log("1");
      object.downFree = false;
    }
  }

  if (object.positionY >= 1) {//moving up sanity check
    if (grid[object.positionY-1][object.positionX] === 1 && object.y - object.speed <= (object.positionY) * cellSize) {
      //console.log("2");
      object.upFree = false;
    }
    if (grid[object.positionY-1][object.positionX+1] === 1 && object.y - object.speed <= (object.positionY) * cellSize && object.x + object.width >= (object.positionX+1) * cellSize) {
      //console.log("2");
      object.upFree = false;
    }
  }

  
  if (object.positionX <= gridSize-2) {//moving right sanity check
    if (object.positionY >= 1) {
      if (grid[object.positionY][object.positionX+1] === 1 && object.x + object.width + object.speed >= (object.positionX+1) * cellSize) {
        //console.log("3");
        object.rightFree = false;
      }
    }
    if (object.positionY <= gridSize-2) {
      if (grid[object.positionY+1][object.positionX+1] === 1 && object.x + object.width + object.speed >= (object.positionX+1) * cellSize && object.y + object.height >= (object.positionY+1) * cellSize) {
        if (object.y + object.height >= (object.positionY+1) * cellSize) {
          //console.log("3");
          object.rightFree = false;
        } 
      }
    }
  }

  if (object.positionX >= 1) {//moving left sanity check
    if (object.positionY >= 1) {
      if (grid[object.positionY][object.positionX-1] === 1 && object.x - object.speed <= (object.positionX) * cellSize) {
        //console.log("4");
        object.leftFree = false;
      }
    }
    if (object.positionY <= gridSize-2) {
      if (grid[object.positionY+1][object.positionX-1] === 1 && object.x - object.speed <= (object.positionX) * cellSize) {
        if (object.y + object.height >= (object.positionY+1) * cellSize) {
          //console.log("4");
          object.leftFree = false;
        }
      }
    }
  }
}

function slashcollision(slasher, target) {
  let arcRadius = (slasher.width+100)/2;
  let ARC_ANGLE = 90;

  for (let i = 0; i < target.length; i++) {
    if (sqrt(sq(slasher.x - slasher.x) + sq(slasher.y - slasher.y)) < cellSize *3) {
      if (collidePointArc(target[i].x+ screenMoveX, target[i].y+ screenMoveY, slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        //console.log("1");
        target[i].lives -= 10;
      }
      else if (collidePointArc(target[i].x + screenMoveX, target[i].y + target[i].height+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        //console.log("2");
        target[i].lives -= 10;
      }
      else if (collidePointArc(target[i].x + target[i].width+ screenMoveX, target[i].y+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)) {
        //console.log("3");
        target[i].lives -= 10;
      }
      else if (collidePointArc(target[i].x + target[i].width+ screenMoveX, target[i].y + target[i].height+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        //console.log("4");
        target[i].lives -= 10;
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (range) {
      range = false;
      melee = true;
    }

    else if (melee) {
      melee = false;
      range = true;
    }
  }
}