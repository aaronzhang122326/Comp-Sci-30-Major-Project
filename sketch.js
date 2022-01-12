// CS-30 Major Project 
// Aaron Su
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

//To do:
//1. speed items
//2. damage items
//3. bullet items
//5. music and sound 
//6. health increase items (maybe)
//7. mana increase items (maybe)

//fix lastShoot

let grid;
let cellSize = 120;
let gridSize = 60;
//let gridSize = 80;



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

let slashing = false;
let slashAngle;
let melee = false;
let shooting = false; 

let weapon;
let bullet;

let playerData;
let healthBar;
let health;
let manaBar;
let mana;
let manaValue;

let playerImgList;
let playeImgPositionList;

let bulletList = [];
let enemyBulletList = [];

let roomList = [];
let roomNumber;
let iCount = 0;

let screenMoveX = 0;
let screenMoveY = 0;
let time;
let lastTime = 0;

let minionList = [];
// let minionDamage = 5;
// let minionHealth = 200;
let minionSpeed = 5;
let minionImgList;

let hogImgPositionList;
let hogLOne;
let hogLTwo;
let hogLThree;

let hogROne;
let hogRTwo;
let hogRThree;


let archerList = [];
// let archerDamage = 5;
// let archerHealth = 100;
let archerSpeed = 5;
let playerShootLastTime;
let enemyShootLastTime;
let range = true;

let archerImgList;
let archerImgPositionList;
let archerLOne;
let archerLTwo;
let archerLThree;

let archerROne;
let archerRTwo;
let archerRThree;

let enemyBullet;

let floorImgOne;
let floorImgTwo;
let floorImgFour;
let wallImg;
let slashImg;

let healthPot;
let manaPot;
let itemList = [];

let pause = false;
let gameOver = false;
let mouseOverPause = false;
let cursor;
let score = 0;

let startScreen = true;
let modeSelection = false;
let selectionList;
let dataList = [
  [5, 200], 
  [5, 100],
];
let infoList;
let helpPage = false;
//minionDamage, minionHealth, minionSpeed, 
//archerDamage, archerHealth, archerSpeed
let textList = [];

let gameRound = 0;
let timeCount = 40;

function preload() {
  floorImgOne = loadImage("assets/floor1.PNG");
  floorImgTwo = loadImage("assets/floor2.PNG");
  floorImgThree = loadImage("assets/floor3.PNG");
  floorImgFour = loadImage("assets/floor4.PNG");

  wallImg = loadImage("assets/wall.jpg");
  slashImg = loadImage("assets/swordSlash.png");

  playerROne = loadImage("assets/player_sprite.png");
  playerRTwo = loadImage("assets/player_sprite_2.png");
  playerRThree = loadImage("assets/player_sprite_3.png");
  playerRFour = loadImage("assets/player_sprite_4.png");

  playerLOne = loadImage("assets/player_sprite_5.png");
  playerLTwo = loadImage("assets/player_sprite_6.png");
  playerLThree = loadImage("assets/player_sprite_7.png");
  playerLFour = loadImage("assets/player_sprite_8.png");

  weapon = loadImage("assets/weapon_1.png");
  bullet = loadImage("assets/bullet.jpg");

  playerData = loadImage("assets/health setting.PNG");
  healthBar = loadImage("assets/health_bar.png");
  manaBar = loadImage("assets/mana_bar.png");
  health = loadImage("assets/health.png");
  mana = loadImage("assets/mana.png");
  cursor = loadImage("assets/cursor.png");

  hogLOne = loadImage("assets/hog_1.png");
  hogLTwo = loadImage("assets/hog_2.png");
  hogLThree = loadImage("assets/hog_3.png");

  hogROne = loadImage("assets/hog_4.png");
  hogRTwo = loadImage("assets/hog_5.png");
  hogRThree = loadImage("assets/hog_6.png");


  archerLOne = loadImage("assets/archer_1.png");
  archerLTwo = loadImage("assets/archer_2.png");
  archerLThree = loadImage("assets/archer_3.jpg");

  archerROne = loadImage("assets/archer_4.png");
  archerRTwo = loadImage("assets/archer_5.png");
  archerRThree = loadImage("assets/archer_6.jpg");

  enemyBullet = loadImage("assets/enemy_bullet.PNG");

  healthPot = loadImage("assets/health_pot.PNG");
  manaPot = loadImage("assets/mana_pot.png");

  startImg = loadImage("assets/start_screen.jpg");
  titleImg = loadImage("assets/title.png");
  pressToStartImg = loadImage("assets/press_to_start.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // grid = create2DArray(gridSize, gridSize);
  // generateDungeon();
  // spawnLocation(playerOnePositionX, playerOnePositionY);
  playerOne = new Player(0, 0, cellSize/1.75, cellSize/1.75, 10, 50, 250, 100, 200, 20);

  playerImgList = [
    [playerLOne, playerLTwo, playerLThree, playerLFour],
    [playerROne, playerRTwo, playerRThree, playerRFour],
  ];

  playerImgPositionList = [0, 7, 7, 0];

  hogImgList = [
    [hogLOne, hogLTwo, hogLThree],
    [hogROne, hogRTwo, hogRThree],
  ];

  hogImgPositionList = [0, 10, 0];

  archerImgList = [
    [archerLOne, archerLTwo, archerLThree],
    [archerROne, archerRTwo, archerRThree],
  ];

  archerImgPositionList = [0, 10, 0];

  //spawnEnemies();
  // screenMoveX -= round(width/2+(playerOne.x-width));
  // screenMoveY -= round(height/2+(playerOne.y-height));
  time = millis();
  playerShootLastTime = time;
  enemyShootLastTime = time;

  selectionList = [
    [width/8-width/16, height/3, width/8, height/8, "Easy", 0.5],    
    [3*width/8-width/16, height/3, width/8, height/8, "Normal", 1],    
    [5*width/8-width/16, height/3, width/8, height/8, "Hard", 2],    
    [7*width/8-width/16, height/3, width/8, height/8, "", 20],
  ];

  pauseSelectionList = [
    [3*width/8-width/16, height/3, width/8, height/8, "Home"],    
    [5*width/8-width/16, height/3, width/8, height/8, "Resume"],  
  ];

  infoList = [
    [width/8-width/16, 2*height/3, width/8, height/8, "Info", "Exit"],   
  ];
  // let archer = new Archers(playerOne.x, playerOne.y+200, cellSize/2, cellSize/2, 5, 5);
  // archerList.push(archer);
  // let minion = new Minions(playerOne.x, playerOne.y+200, cellSize/2, cellSize/2.5, 5, 100);
  // minionList.push(minion);
}

function draw() {
  if (startScreen){
    image(startImg, 0, 0, width, height);
    image(titleImg, 100, 100, width/5, width/20);
    if (round(frameCount/50) % 2 === 0 && modeSelection === false){
      image(pressToStartImg, width/2-width/10, 8*height/10, width/5, width/20);
    } 
    if (mouseOverRect(infoList[0][0],infoList[0][1],infoList[0][2],infoList[0][3])){
      fill("red");
    }
    else {
      fill("grey");
    }
    if (modeSelection === false) {
      rect(infoList[0][0],infoList[0][1],infoList[0][2],infoList[0][3]);
      textSize(50);
      stroke(255);
      fill(255);
      textAlign(CENTER);
      // text(infoList[0][4], infoList[0][0]+infoList[0][2]/2,infoList[0][1]+infoList[0][3]/2);
      if (helpPage === false){
        text(infoList[0][4], infoList[0][0]+infoList[0][2]/2,infoList[0][1]+infoList[0][3]/2);
      } 
      else {
        text(infoList[0][5], infoList[0][0]+infoList[0][2]/2,infoList[0][1]+infoList[0][3]/2);
      }
    }
    dataList = [
      [5, 200], 
      [5, 100],
    ];
    minionList = [];
    archerList = [];
    itemList = [];
    roomList = [];
    iCount = 0;
    playerShootLastTime = 0;
    enemyShootLastTime = 0;

    if (helpPage){
      textSize(50);
      stroke(255);
      fill(255);
      textAlign(CENTER);
      text("1", width/2, height/2, width - width/8, height-height/8);
      //text(infoList[0][5], infoList[0][0]+infoList[0][2]/2,infoList[0][1]+infoList[0][3]/2);
      // if (mouseOverRect(infoList[0][0],infoList[0][1],infoList[0][2],infoList[0][3])){
      //   if (mouseIsPressed){
      //     helpPage = false;
      //   }
      //}
    }

    if (modeSelection){
      for (let i = 0; i < selectionList.length; i++){    
        if (mouseOverRect(selectionList[i][0],selectionList[i][1],selectionList[i][2],selectionList[i][3])){
          fill("red");
          if (mouseIsPressed){
            modeSelection = false;
            startScreen = false;
            lastTime = millis();
            score = 0;
            gameRound = 0;
            playerOne.health = 100;
            playerOne.mana = 200;
            grid = create2DArray(gridSize, gridSize);
            generateDungeon();
            spawnLocation(playerOnePositionX, playerOnePositionY);
            // playerOne = new Player(playerOnePositionX, playerOnePositionY, cellSize/1.75, cellSize/1.75, 10, 50, 250, 100, 200, 20);
            playerOne.x = playerOnePositionX;
            playerOne.y = playerOnePositionY;
            //spawnEnemies();
            // screenMoveX -= round(width/2+(playerOne.x-width));
            // screenMoveY -= round(height/2+(playerOne.y-height));
            screenMoveX = -round(width/2+(playerOne.x-width));
            screenMoveY = -round(height/2+(playerOne.y-height));

            for (let a = 0; a < dataList.length; a++){
              for (let b = 0; b < dataList[a].length; b++){
                dataList[a][b] = dataList[a][b]*selectionList[i][5];
              }
            }
          }
        }
        else {
          fill("grey");
        }
        rect(selectionList[i][0],selectionList[i][1],selectionList[i][2],selectionList[i][3]);
        textSize(50);
        stroke(255);
        fill(255);
        textAlign(CENTER);
        text(selectionList[i][4], selectionList[i][0]+selectionList[i][2]/2,selectionList[i][1]+selectionList[i][3]/2);
      }
    }

  }
  if (gameOver === false && startScreen === false) {
    background(48, 77, 95);
    displayGrid(gridSize, gridSize); 
    if (pause === false) {
      //displayGrid(gridSize, gridSize); 
      time = millis() - lastTime;

      //player movement
      playerOne.move();
      playerOne.shoot();
      playerOne.slash();
      // playerOne.display();

      //minion movement
      for (let i = 0; i < minionList.length; i++) {
        minionList[i].move();
        // minionList[i].display();
        if (minionList[i].lives <= 0) {
          if (random(0, 100) > 75) {
            let healthPotion = new HealthPot(minionList[i].x, minionList[i].y, 56/3*(width/1920), 77/3, "health");
            itemList.push(healthPotion); 
          }
          else if (random(0, 100) > 50) {
            let manaPotion = new ManaPot(minionList[i].x, minionList[i].y, 56/3*(width/1920), 77/3, "mana");
            itemList.push(manaPotion); 
          }
          minionList.splice(i, 1);
          score += 20;
        }
      }

      //archer movement
      for (let i = 0; i < archerList.length; i++) {
        archerList[i].move();
        //archerList[i].display();
        if (archerList[i].lives <= 0) {
          if (random(0, 100) > 75) {
            let healthPotion = new HealthPot(archerList[i].x, archerList[i].y, 56/3*(width/1920), 77/3, "health");
            itemList.push(healthPotion); 
          }
          else if (random(0, 100) > 50) {
            let manaPotion = new ManaPot(archerList[i].x, archerList[i].y, 56/3*(width/1920), 77/3, "mana");
            itemList.push(manaPotion); 
          }
          archerList.splice(i, 1);
          score += 20;
        }
      }

      //items
      for (let i = 0; i < itemList.length; i++){
        itemList[i].display();
      }

      //bullets splice
      for (let i = 0; i < bulletList.length; i++){
        bulletList[i].move();
        //bulletList[i].display();    
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
          if (grid[floor(bulletList[i].y/cellSize)][floor(bulletList[i].x/cellSize)] === 1 || grid[floor(bulletList[i].y/cellSize)][floor(bulletList[i].x/cellSize)] === 0){
            if (collideRectCircle(blocks[0].x, blocks[0].y, cellSize, cellSize, bulletList[i].x, bulletList[i].y, bulletList[i].radius)){
              bulletList.splice(i, 1);
            }
          }
        }
      }
        //bullets splice
      for (let i = 0; i < enemyBulletList.length; i++){
        enemyBulletList[i].move();
        //enemyBulletList[i].display();    
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
          if (grid[floor(enemyBulletList[i].y/cellSize)][floor(enemyBulletList[i].x/cellSize)] === 1 || grid[floor(enemyBulletList[i].y/cellSize)][floor(enemyBulletList[i].x/cellSize)] === 0){
            if (collideRectCircle(blocks[0].x, blocks[0].y, cellSize, cellSize, enemyBulletList[i].x, enemyBulletList[i].y, enemyBulletList[i].radius)){
              enemyBulletList.splice(i, 1);
            }
          }
        }
      }
      if (mouseIsPressed){
        for (let i = 0; i < itemList.length; i++){
          let iX = itemList[i].x + itemList[i].width + screenMoveX;
          let iY = itemList[i].y + itemList[i].height + screenMoveY;
          if (mouseX > itemList[i].width + screenMoveX && mouseX < iX && mouseY > itemList[i].y + screenMoveY && mouseY < iY){
            if (itemList[i].effect === "health"){
              if (playerOne.health + 20 <= 100){
                playerOne.health += 20;
              }
              else {
                playerOne.health += 100 - playerOne.health;
              }
            }
            else if (itemList[i].effect === "mana") {
              if (playerOne.mana + 20 <= 200){
                playerOne.mana += 20;
              }
              else {
                playerOne.mana += 200 - playerOne.mana;
              }
            }
            itemList.splice(i, 1);
          }
        }
      }
      for (let i = 0; i < textList.length; i++){
        textList[i].move();
        if (textList[i].jumpCount === 20){
          textList.splice(i, 1);
        }
      }
      if (minionList.length === 0 && archerList.length === 0){
        if (timeCount >= 0){  
          timeCount -= 1;
          textSize(100);
          stroke(255);
          fill(255);
          textAlign(CENTER);
          text("Round" + (gameRound+1), width/2, height/2);
        }
        else {
          timeCount = 40;
          gameRound += 1;

          dataList[0][2] = dataList[0][2] * 2;
          dataList[0][1] = dataList[0][1] * 1.5;
          minionSpeed = minionSpeed * 1.1;

          dataList[1][2] = dataList[1][2] * 2;
          dataList[1][1] = dataList[1][1] * 1.5;
          archerSpeed = archerSpeed * 1.1;

          spawnEnemies();
        }
      }
    }
    else {
      for (let i = 0; i < pauseSelectionList.length; i++){    
        if (mouseOverRect(pauseSelectionList[i][0],pauseSelectionList[i][1],pauseSelectionList[i][2],pauseSelectionList[i][3])){
          fill("red");
          if (mouseIsPressed){
            if (pauseSelectionList[i][4] === "Home"){
              pause = false;
              startScreen = true;
            }
            else if (pauseSelectionList[i][4] === "Resume"){
              pause = false;
            }
          }
        }
        else {
          fill("grey");
        }
        rect(pauseSelectionList[i][0],pauseSelectionList[i][1],pauseSelectionList[i][2],pauseSelectionList[i][3]);
        textSize(50);
        stroke(255);
        fill(255);
        textAlign(CENTER);
        text(pauseSelectionList[i][4], pauseSelectionList[i][0]+pauseSelectionList[i][2]/2,pauseSelectionList[i][1]+pauseSelectionList[i][3]/2);
      }
    }    

    // if (mouseX > 1750*(width/1920) && mouseX < 1850*(width/1920) && mouseY > 50 && mouseY < 150) {
    //   mouseOverPause = true;
    // }
    if (mouseOverRect(1750*(width/1920), 100*(width/1920), 50, 100)){
      mouseOverPause = true;
    }
    else {
      mouseOverPause = false;
    }
    
    playerOne.display();
    for (let i = 0; i < minionList.length; i++) {
      minionList[i].display();
    }
    for (let i = 0; i < archerList.length; i++) {
      archerList[i].display();
    }
    for (let i = 0; i < itemList.length; i++){
      itemList[i].display();
    }
    for (let i = 0; i < bulletList.length; i++){
      bulletList[i].display();    
    }
    for (let i = 0; i < enemyBulletList.length; i++){
      enemyBulletList[i].display();    
    }
    for (let i = 0; i < textList.length; i++){
      textList[i].display();
    }
    displayData();

    // image(cursor, mouseX, mouseY, 50*(width/1920), 50);
    //console.log(textList);

    if (playerOne.health <= 0){
      gameOver = true;
    }
  }
  if (gameOver){
    textSize(100);
    stroke(255);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
  }
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    noCursor();
  }
  if (gameOver === false){
    image(cursor, mouseX, mouseY, 50*(width/1920), 50);
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
        fill(48, 77, 95);
        rect(x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
      }
      if (grid[y][x] === 1) { //wall
        image(wallImg, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
      }
      if (grid[y][x] !== 1 && grid[y][x] !== 0) { //interior
        if (grid[y][x] === 2){
          image(floorImgOne, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
        }
        else if (grid[y][x] === 3) {
          image(floorImgTwo, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
        }
        else if (grid[y][x] === 4){
          image(floorImgFour, x * cellSize + screenMoveX, y * cellSize + screenMoveY, cellSize, cellSize);
        }
      }
    }
  }
}

class Player { //player class
  constructor(x, y, width, height, speed, shootSpeed, slashSpeed, health, mana, damage) {
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
    this.slashSpeed = slashSpeed;
    this.health = health;
    this.mana = mana;
    this.damage = damage;
    this.positionY = floor(this.y/cellSize);
    this.positionX = floor(this.x/cellSize);
    this.facingRight = true;
    this.facingLeft = false;
    this.walkCount = 0;
    this.lastTime = 0;
    this.angle = atan2(mouseY-(this.height/2+this.y+screenMoveY), mouseX-(this.width/2+this.x+screenMoveX));
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

    if (mouseX >= this.x + screenMoveX){
      this.facingRight = true;
      this.facingLeft = false;
    }
    else {
      this.facingRight = false;
      this.facingLeft = true;
    }

    if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)) {
      this.walkCount += 1;
    }
    else {
      this.walkCount = 0;
    }

    if (this.walkCount >= 20) {
      this.walkCount = 0;
    }
    if (time > this.lastTime + 1000 && this.mana + 5 < 200) {
      this.mana += 5;
      this.lastTime = time;
    }
    this.angle = atan2(mouseY-(this.height/2+this.y+screenMoveY), mouseX-(this.width/2+this.x+screenMoveX));
  }
  display() {
    if (this.facingLeft) {
      image(playerImgList[0][floor(this.walkCount/5)], this.x + screenMoveX, this.y + screenMoveY - playerImgPositionList[floor(this.walkCount/5)], this.width, this.height);
    }
    if (this.facingRight) {
      image(playerImgList[1][floor(this.walkCount/5)], this.x + screenMoveX, this.y + screenMoveY - playerImgPositionList[floor(this.walkCount/5)], this.width, this.height);
    }
    angleMode(DEGREES);
    push();
    //let angle = atan2(mouseY-(this.height/2+this.y+screenMoveY), mouseX-(this.width/2+this.x+screenMoveX));
    translate(this.x+this.width/2+screenMoveX, this.y+this.height/1.5+screenMoveY);
    rotate(this.angle);
    image(weapon, -this.width/4, -this.height/6, this.width/2, this.height/3);
    pop();

    
    //fill("red");
    //rect(this.x + screenMoveX, this.y+ screenMoveY, this.width, this.height);
  }

  shoot() { 
    
    if (mouseIsPressed &&  time - playerShootLastTime > this.shootSpeed && range && this.mana > 5) {
      let playerBullet = new Bullet(playerOne.x+playerOne.width/2, playerOne.y+playerOne.height/2, 15, 30, 1, 20);
      this.mana -= 5;
      bulletList.push(playerBullet);
      playerShootLastTime = time;
    }
  }
  slash(){ 
    if (mouseIsPressed &&  time - playerShootLastTime > this.slashSpeed && slashing === false) {
      angleMode(DEGREES);
      slashing = true;
      playerShootLastTime = time;
      slashAngle = atan2(mouseY - (this.y + screenMoveY + this.height/2), mouseX - (this.x + screenMoveX + this.width/2));
    }
    if (slashing & melee) {
      //console.log("1");
      push();
      translate(this.x + screenMoveX + this.width/2, this.y + screenMoveY + this.height/2);
      //rotate(this.angle);
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
  constructor(x, y, radius, speed, hit, damage) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speed = speed;
    this.hit = hit;
    this.damage = damage;
    this.disX = mouseX - screenMoveX - playerOne.x-playerOne.width/2;
    this.disY = mouseY - screenMoveY - playerOne.y-playerOne.height/2;
    this.angle = atan2(mouseY-(playerOne.height/2+playerOne.y+screenMoveY), mouseX-(playerOne.width/2+playerOne.x+screenMoveX));
  }
  move() {
    this.x += this.disX/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);
    this.y += this.disY/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);

    //bullet minion detection
    for (let i = 0; i < minionList.length; i++){
      if (this.x > minionList[i].x && this.x < minionList[i].x + minionList[i].width && this.y > minionList[i].y && this.y < minionList[i].y + minionList[i].height){
        this.hit -= 1;
        minionList[i].lives -= this.damage;
        let attack = new DamageText(this.x, this.y, 15, this.damage);
        textList.push(attack);
      }
    }

    //bullet archer detection
    for (let i = 0; i < archerList.length; i++){
      if (this.x > archerList[i].x && this.x < archerList[i].x + archerList[i].width && this.y > archerList[i].y && this.y < archerList[i].y + archerList[i].height){
        this.hit -= 1;
        archerList[i].lives -= this.damage;
        let attack = new DamageText(this.x, this.y, 15, this.damage);
        textList.push(attack);
      }
    }
  }
  display() {
    // fill("red");
    // circle(this.x + screenMoveX, this.y + screenMoveY, this.radius);
    angleMode(DEGREES);
    push();//+playerOne.width/2, +playerOne.height/1.5
    translate(this.x+screenMoveX, this.y+screenMoveY);
    rotate(this.angle);
    image(bullet, -this.radius, -this.radius/2, this.radius * 2, this.radius);
    pop();
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
    // fill("green");
    // circle(this.x + screenMoveX, this.y + screenMoveY, this.radius);
    image(enemyBullet, this.x + screenMoveX, this.y + screenMoveY, this.radius*2);
  }
}

class Minions {
  constructor(x, y, width, height, speed, lives, damage) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.speed = speed;
    this.lives = lives;
    this.damage = damage;
    this.attackLastTime = 0;
    this.rightFree = true;
    this.leftFree = true;
    this.upFree = true;
    this.downFree = true;
    this.walkCount = 0;
    this.directionCount = 0;
    if (random(0, 100) > 50) {
      this.facingLeft = true;
    }
    else {
      this.facingLeft = false;
    }
    
    this.facingRight = !this.facingLeft; 
  }
  move() {
    let pX = playerOne.x + playerOne.width/2;
    let pY = playerOne.y + playerOne.height/2;
    let tX = this.x+this.width/2;
    let tY = this.y+this.height/2;

    

    if (sqrt(sq(pX - tX) + sq(pY - tY)) < cellSize *10) {
      this.walkCount += 1;
      this.directionCount = 0;
      movementCheck(this);
      if (tX + this.speed < pX) {
        if (this.rightFree) {
          this.x += this.speed;
          this.facingLeft = false;
          this.facingRight = true;
          this.directionCount += 1;
        }
      }
      else if (tX - this.speed > pX && this.leftFree) {
        this.x -= this.speed;
        this.facingLeft = true;
        this.facingRight = false;
        this.directionCount += 1;
      }
      if (tY + this.speed < pY && this.downFree) {
        this.y += this.speed;
        this.directionCount += 1;
      }
      else if (tY - this.speed > pY && this.upFree) {
        this.y -= this.speed;
        this.directionCount += 1;
      }
    } 

    if (this.directionCount < 2) {
      //console.log(this.x, this.y);
      
    }

    if (time - this.attackLastTime > 1000) {
      if (tX - pX > 0) { //checking for enemy character coliision
        if (tX - pX < this.width) {
          if (tY - pY > 0) { 
            if (tY - pY < this.height) {
              playerOne.health -= this.damage;
            }
            
          }
          else {
            if (-(this.y - playerOne.y) < playerOne.height) {
              playerOne.health -= this.damage;
            }
          }
        }
      }
      else {
        if (-(this.x - playerOne.x) < playerOne.width) {
          if (this.y - playerOne.y > 0) { 
            if (this.y - playerOne.y < this.height) {
              playerOne.health -= this.damage;
            }
          }
          else {
            if (-(this.y - playerOne.y) < playerOne.height) {
              playerOne.health -= this.damage;
            }
          }
        }
      }
      this.attackLastTime = time;
    }
    if (this.walkCount >= 18) {
      this.walkCount = 0;
    } 
  }
  display() {
    if (this.facingLeft) {//, 
      image(hogImgList[0][floor(this.walkCount/6)], this.x + screenMoveX- hogImgPositionList[floor(this.walkCount/6)], this.y + screenMoveY- hogImgPositionList[floor(this.walkCount/6)], this.width, this.height);
    }
    if (this.facingRight) {
      image(hogImgList[1][floor(this.walkCount/6)], this.x + screenMoveX- hogImgPositionList[floor(this.walkCount/6)], this.y + screenMoveY- hogImgPositionList[floor(this.walkCount/6)], this.width, this.height);
    }
    // fill("green");
    // rect(this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
  }
}

class Archers extends Minions {
  constructor(x, y, width, height, speed, lives, shootSpeed, ShootLastTime) {
    super(x, y, width, height, speed, lives);
    // this.x = x;
    // this.y = y;
    this.shootSpeed = shootSpeed;
    this.enemyShootLastTime = ShootLastTime;
    this.walkCount = 0;
    if (random(0, 100) > 50) {
      this.facingLeft = true;
    }
    else {
      this.facingLeft = false;
    }
    
    this.facingRight = !this.facingLeft; 
  }
  move() {
    if (this.x + this.speed < playerOne.x) {
      this.facingLeft = false;
      this.facingRight = true;
    }
    else if (this.x - this.speed > playerOne.x) {
      this.facingLeft = true;
      this.facingRight = false;
    }

    if (sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) < cellSize *10 && sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) > cellSize * 3) {
      this.walkCount += 1;
      movementCheck(this);
      if (this.x + this.speed < playerOne.x && this.rightFree) {
        this.x += this.speed;
      }
      else if (this.x - this.speed > playerOne.x && this.leftFree) {
        this.x -= this.speed;
      }
      if (this.y + this.speed < playerOne.y && this.downFree) {
        this.y += this.speed;
      }
      else if (this.y - this.speed > playerOne.y && this.upFree) {
        this.y -= this.speed;
      }
      if (this.walkCount >= 18) {
        this.walkCount = 0;
      }
    } 
    else if (sqrt(sq(playerOne.x - this.x) + sq(playerOne.y - this.y)) < cellSize *10){
      this.shoot();
      //console.log("1");
    }
    
  }
  shoot() {    
    if (time - this.enemyShootLastTime > this.shootSpeed) {
      let enemyBullet = new EnemyBullet(this.x + this.width/2, this.y + this.height/2, 15, 15, 1, dataList[1][0]);
      enemyBulletList.push(enemyBullet);
      this.enemyShootLastTime = time;
    }
  }
  display() {
    if (this.facingLeft) {//- playerImgPositionList[floor(this.walkCount/5)], - playerImgPositionList[floor(this.walkCount/5)]
      image(archerImgList[1][floor(this.walkCount/6)], this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
    }
    if (this.facingRight) {
      image(archerImgList[0][floor(this.walkCount/6)], this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
    }
    //fill("green");
    //rect(this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
  }
}

class Items {
  constructor(x, y, width, height, effect){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.effect = effect;
  }
}

class HealthPot extends Items {
  constructor(x, y, width, height, effect){
    super(x, y, width, height, effect);
  }
  display() {
    image(healthPot, this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
  }
}

class ManaPot extends Items {
  constructor(x, y, width, height, effect){
    super(x, y, width, height, effect);
  }
  display() {
    image(manaPot, this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
  }
}

class DamageText {
  constructor(x, y, size, value){
    this.x = x;
    this.y = y;
    this.size = size;
    this.value = value;
    this.jumpCount = 10;
    this.direction = -1;
  }
  move(){// -1 = up, 1 = down
    this.x += 1;
    this.y += 0.5 * this.jumpCount * this.direction;
    if (this.jumpCount < 0 && this.direction < 0){
      this.direction = 1;
    }
    if (this.direction > 0){
      this.jumpCount += 1;
    }
    else {
      this.jumpCount -= 1;
    }
  }
  display(){
    push();
    textSize(this.size);
    stroke(255);
    fill(255);
    textAlign(CENTER);
    text(this.value, this.x+screenMoveX, this.y+screenMoveY);
    pop();
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
          grid[y][x] = round(random(2, 4));
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
      for (let x = roomList[iCount-1][0] ; x < roomList[iCount-1][0] + 4; x++) {
        grid[y][x] = 1;
      }
    }
  }
  else if (roomList[iCount][1] > roomList[iCount-1][1]) { //building down
    for (let y = roomList[iCount-1][1]; y < roomList[iCount][1]+3; y++) {
      for (let x = roomList[iCount-1][0] ; x < roomList[iCount-1][0] + 4; x++) {
        grid[y][x] = 1;
      }
    }
  }

  if (roomList[iCount-1][0] > roomList[iCount][0]) { //building left
    for (let y = roomList[iCount][1]; y < roomList[iCount][1] + 4; y++) {
      for (let x = roomList[iCount-1][0]; x > roomList[iCount][0]; x--) {
        grid[y][x] = 1;
      }
    }
  }

  else if (roomList[iCount-1][0] < roomList[iCount][0]) {//building right
    for (let y = roomList[iCount][1]; y < roomList[iCount][1] + 4; y++) {
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
        if (grid[y][x] !== 1 || grid[y][x] !== 0) {
          spaceCount ++;
        }
      }
    }
    for (let a = 0; a < round(spaceCount/30); a++) {
      let minion = new Minions(round(random((roomList[i][0]+1) * cellSize, (roomList[i][0] + roomList[i][2]-1) * cellSize)), round(random((roomList[i][1]+1)* cellSize, (roomList[i][1] + roomList[i][3]-1)* cellSize)), cellSize*1.15/2, cellSize*1.15/2.5, minionSpeed, dataList[0][1], dataList[0][0]);
      minionList.push(minion);
    }
    for (let a = 0; a < round(spaceCount/10); a++) {
      let archer = new Archers(round(random((roomList[i][0]+1) * cellSize, (roomList[i][0] + roomList[i][2]-1) * cellSize)), round(random((roomList[i][1]+1)* cellSize, (roomList[i][1] + roomList[i][3]-1)* cellSize)), cellSize/1.75, cellSize/1.75, archerSpeed, dataList[1][1], 1000, 0);//enemyShootLastTime
      archerList.push(archer);
    }
  }  
}

function displayData() {
  if (playerOne.health > 0) {
    image(health, 105*(width/1920), 67, playerOne.health*3.1*(width/1920), 42);
  }
  if (playerOne.mana >= 0) {
    image(mana, 108*(width/1920), 167, playerOne.mana*3.1/2*(width/1920), 52);
  }
  image(healthBar, 52*(width/1920), 50, 500*0.75*(width/1920), 100*0.75);
  image(manaBar, 52*(width/1920), 150, 500*0.75*(width/1920), 100*0.75);

  //pause icon
  noStroke();
  fill("white");
  if (mouseOverPause) {
    fill("grey");
  }
  rect(1770*(width/1920), 60, 20*(width/1920), 80);
  rect(1810*(width/1920), 60, 20*(width/1920), 80);

  miniMap();
  push();
  textSize(50);
  stroke(255);
  fill(255);
  textAlign(CENTER);
  text("TIME: " + round(time/1000), 7*width/9, height/10);
  text("SCORE: " + score, 5*width/9, height/10);
  pop();
  // if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
  //   noCursor();
  // }
  // image(cursor, mouseX, mouseY, 50*(width/1920), 50);
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
  angleMode(DEGREES);
  let arcRadius = (slasher.width+100)/2;
  let ARC_ANGLE = 90;

  for (let i = 0; i < target.length; i++) {
    if (sqrt(sq(slasher.x - slasher.x) + sq(slasher.y - slasher.y)) < cellSize *3) {
      if (collidePointArc(target[i].x+ screenMoveX, target[i].y+ screenMoveY, slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        //console.log("1");
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
      else if (collidePointArc(target[i].x + screenMoveX, target[i].y + target[i].height+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        //console.log("2");
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
      else if (collidePointArc(target[i].x + target[i].width+ screenMoveX, target[i].y+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)) {
        //console.log("3");
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
      else if (collidePointArc(target[i].x + target[i].width+ screenMoveX, target[i].y + target[i].height+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        //console.log("4");
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
    }
  }
}

function keyPressed() {
  if (keyCode === 32) {
    if (startScreen === false && gameOver === false){
      if (range) {
        range = false;
        melee = true;
      }

      else if (melee) {
        melee = false;
        range = true;
      }
    }
    else if (startScreen){
      modeSelection = true;
    }
    else if (gameOver){
      gameOver = false;
      startScreen = true;
      //playerOne.health = 100;
      //playerOne.mana = 200;
    }
  }
}

function mousePressed(){
  //console.log(mouseX, mouseY);
  // if (mouseX > 1750 && mouseX < 1850 && mouseY > 50 && mouseY < 150) {
  //   pause = !pause;
  // }
  if (mouseOverPause) {
    pause = !pause;
  }
  if (mouseOverRect(infoList[0][0],infoList[0][1],infoList[0][2],infoList[0][3])){
    helpPage = !helpPage;
  }
}

function miniMap(){
  //fill("grey");
  fill(142, 142, 142, 100);
  rect(1550*(width/1920), 170, grid[0].length*(cellSize/24), grid.length*(cellSize/24)); //grid[0].length*(cellSize/24), grid.length*(cellSize/24)
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== 0 && grid[y][x] !== 1){
        fill("black");
        rect((1550+x*cellSize/24)*(width/1920), 170+y*cellSize/24, cellSize/24*(width/1920), cellSize/24); 
      }
    }
  }
  fill("red");
  rect((playerOne.x/24+1550)*(width/1920), playerOne.y/24+170, playerOne.width/24*(width/1920), playerOne.height/24);
}

function mouseClicked(){
  // let attack = new DamageText(width/2, height/2, 15);
  // textList.push(attack);
}

function mouseOverRect(x, y, rectWidth, rectHeight){
  if (mouseX > x && mouseX < x+rectWidth && mouseY > y && mouseY < y+rectHeight) {
    return true;
  }
  return false;
}