// CS-30 Major Project 
// Aaron Su
// January 25, 2022

//variables 

//grid variables
let grid;
let cellSize = 120;
let gridSize = 60;

//player variables
let playerOne, playerOnePositionX, playerOnePositionY;
let playerROne, playerRTwo, playerRThree, playerRFour;
let playerLOne, playerLTwo, playerLThree, playerLFour;
let playerImgPositionList;
let healthBar, health, manaBar, mana, manaValue;
let playerImgList;

//player attack variables
let slashing = false;
let slashAngle;
let melee = false;
let range = true;
let shooting = false; 

//player weapon varibales 
let weapon, blade, bullet, slashImg;
let bulletList = [];

//enemy minion variables
let minionList = [];
let minionSpeed = 5;
let minionImgList;
let hogImgPositionList, hogImgList;
let hogLOne, hogLTwo, hogLThree;
let hogROne, hogRTwo, hogRThree;

//enemy archer variables
let archerList = [];
let archerSpeed = 5;
let playerShootLastTime;
let enemyShootLastTime;
let enemyBullet;
let enemyBulletList = [];
let archerImgList, archerImgPositionList;
let archerLOne, archerLTwo, archerLThree;
let archerROne, archerRTwo, archerRThree;

//terrain variables
let roomList = [];
let roomNumber;
let iCount = 0;
let floorImgOne, floorImgTwo, floorImgFour, wallImg;

//sound effect and music variables 
let combatMusic, mysteryMusic;
let playingOne = false;
let playingTwo = false;
let soundList = [];
let slashSound, shootSound, laserSound, pickSound;

//item variables
let healthPot;
let manaPot;
let itemList = [];

//setting variables
let pause = false;
let gameOver = false;
let startScreen = true;
let modeSelection = false;
let mouseOverPause = false;
let helpPage = false;
let cursor;
let selectionList;
let pauseSelectionList;
let infoList;
let startImg, titleImg, pressToStartImg;
let time;
let score = 0;
let gameRound = 0;
let timeCount = 40;
let screenMoveX = 0;
let screenMoveY = 0;
let lastTime = 0;
let textList = [];
let dataList = [
  [5, 200], 
  [5, 100],
];

function preload() {
  //terrain sprites
  floorImgOne = loadImage("assets/floor1.PNG");
  floorImgTwo = loadImage("assets/floor2.PNG");
  floorImgFour = loadImage("assets/floor4.PNG");
  wallImg = loadImage("assets/wall.jpg");

  //player sprites
  playerROne = loadImage("assets/player_sprite.png");
  playerRTwo = loadImage("assets/player_sprite_2.png");
  playerRThree = loadImage("assets/player_sprite_3.png");
  playerRFour = loadImage("assets/player_sprite_4.png");
  playerLOne = loadImage("assets/player_sprite_5.png");
  playerLTwo = loadImage("assets/player_sprite_6.png");
  playerLThree = loadImage("assets/player_sprite_7.png");
  playerLFour = loadImage("assets/player_sprite_8.png");

  //player attack sprites
  weapon = loadImage("assets/weapon_1.png");
  blade = loadImage("assets/blade.png");
  bullet = loadImage("assets/bullet.jpg");  
  slashImg = loadImage("assets/swordSlash.png");

  //player setting sprites 
  healthBar = loadImage("assets/health_bar.png");
  manaBar = loadImage("assets/mana_bar.png");
  health = loadImage("assets/health.png");
  mana = loadImage("assets/mana.png");
  cursor = loadImage("assets/cursor.png");

  //enemy minion sprites
  hogLOne = loadImage("assets/hog_1.png");
  hogLTwo = loadImage("assets/hog_2.png");
  hogLThree = loadImage("assets/hog_3.png");
  hogROne = loadImage("assets/hog_4.png");
  hogRTwo = loadImage("assets/hog_5.png");
  hogRThree = loadImage("assets/hog_6.png");

  //enemy archer sprites 
  archerLOne = loadImage("assets/archer_1.png");
  archerLTwo = loadImage("assets/archer_2.png");
  archerLThree = loadImage("assets/archer_3.jpg");
  archerROne = loadImage("assets/archer_4.png");
  archerRTwo = loadImage("assets/archer_5.png");
  archerRThree = loadImage("assets/archer_6.jpg");
  enemyBullet = loadImage("assets/enemy_bullet.PNG");

  //item sprites
  healthPot = loadImage("assets/health_pot.PNG");
  manaPot = loadImage("assets/mana_pot.png");

  //game setting sprites
  startImg = loadImage("assets/start_screen.jpg");
  titleImg = loadImage("assets/title.png");
  pressToStartImg = loadImage("assets/press_to_start.png");

  //music
  soundFormats("ogg");
  combatMusic = loadSound("assets/combat_music.mp3");
  mysteryMusic = loadSound("assets/mysterious_music.mp3");

  //sound effects
  slashSound = loadSound("assets/slash_sound.mp3");
  shootSound = loadSound("assets/shoot_sound.mp3");
  laserSound = loadSound("assets/laser.mp3");
  pickSound = loadSound("assets/pickup_sound.mp3");
  
}

function setup() {
  createCanvas(windowWidth, windowHeight);
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
    [width/8-width/16, 2*height/3, width/8, height/8, "How to Play", "Exit"],   
  ];
}

function draw() {
  if (startScreen){
    if (playingOne === false && mouseIsPressed) {
      mysteryMusic.loop();
      playingOne = true;
    }
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
      textSize(30);
      stroke(255);
      fill(255);
      textAlign(CENTER);
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
    minionSpeed = 5;
    archerSpeed = 5;
    minionList = [];
    archerList = [];
    itemList = [];
    roomList = [];
    iCount = 0;
    playerShootLastTime = 0;
    enemyShootLastTime = 0;

    if (helpPage){
      textSize(25);
      stroke(255);
      fill(255);
      textAlign(LEFT);
      text("Instructions:", width/4, 3*height/16, width, height-height/8);
      text("Defeat Enemies and Survive for as Long as You Can. Enemies Become Stronger each Round!", width/4, 4*height/16, width, height-height/8);
      text("How to Play:", width/4, 6*height/16, width - width/8, height-height/8);
      text("WASD to move", width/4, 7*height/16, width - width/8, height-height/8);
      text("Left Click Mouse to attack", width/4, 8*height/16, width - width/8, height-height/8);
      text("Hold and hover mouse over item to use", width/4, 9*height/16, width - width/8, height-height/8);
      text("Space Bar to Switch Weapons ", width/4, 10*height/16, width - width/8, height-height/8);
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
            playerOne.x = playerOnePositionX;
            playerOne.y = playerOnePositionY;
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
    if (playingTwo === false){  
      console.log("1");    
      mysteryMusic.pause();
      combatMusic.loop();
      playingTwo = true;
      playingOne = false;
    }
    background(48, 77, 95);
    displayGrid(gridSize, gridSize); 
    if (pause === false) { 
      time = millis() - lastTime;

      //player movement
      playerOne.move();
      playerOne.shoot();
      playerOne.slash();

      //minion movement
      for (let i = 0; i < minionList.length; i++) {
        minionList[i].move();
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
      for (let i = 0; i < enemyBulletList.length; i++){
        enemyBulletList[i].move(); 
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
          text("Round " + (gameRound+1), width/2, height/2);
        }
        else {
          timeCount = 40;
          gameRound += 1;

          dataList[0][0] = dataList[0][0] * 2;
          dataList[0][1] = dataList[0][1] * 1.5;
          minionSpeed = minionSpeed * 1.1;

          dataList[1][0] = dataList[1][0] * 2;
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
              combatMusic.pause();
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
    if (mouseOverRect(1750*(width/1920), 50*(height/789), 50*(width/1920), 100*(height/789))){
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
    for (let i = 0; i < soundList.length; i++){
      if (soundList[i][1] + soundList[i][2] > time){
        soundList[i][0].play();
      }
      else {
        soundList.splice(i, 1);
      }
    }
    displayData();

    if (playerOne.health <= 0){
      gameOver = true;
      playingTwo = false;
      combatMusic.pause();
    }
  }
  if (gameOver){
    textSize(100);
    stroke(255);
    fill(255);
    textAlign(CENTER);
    text("GAME OVER", width/2, height/2);
    if (round(frameCount/50) % 2 === 0){
      image(pressToStartImg, width/2-width/10, 8*height/10, width/5, width/20);
    } 
  }
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height){
    noCursor();
  }
  if (gameOver === false){
    image(cursor, mouseX, mouseY, 50*(width/1920), 50);
  }
}

//creating 2D Array
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

//displaying 2D array with terrain sprites 
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

//player
class Player {
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
  //player movement and control
  move() {
    movementCheck(this);
    
    //moving up
    if (keyIsDown(87) && this.upFree) { 
      this.y -= this.speed;
      screenMoveY += this.speed; 
    }
    
    //moving down
    else if (keyIsDown(83) && this.downFree && !keyIsDown(87)) { 
      this.y += this.speed;
      screenMoveY -= this.speed; 
    }

    //moving left
    if (keyIsDown(65) && this.leftFree) { 
      this.x -= this.speed;
      screenMoveX += this.speed; 
    }
    
    //moving right
    else if (keyIsDown(68) && this.rightFree && !keyIsDown(65)) { 
      this.x += this.speed;
      screenMoveX -= this.speed; 
    }

    //determining player facing direction
    
    //player facing right
    if (mouseX >= this.x + screenMoveX){ 
      this.facingRight = true;
      this.facingLeft = false;
    }
    
    //player facing left
    else { 
      this.facingRight = false;
      this.facingLeft = true;
    }

    //walkCount 
    if (keyIsDown(87) || keyIsDown(83) || keyIsDown(65) || keyIsDown(68)) {
      this.walkCount += 1;
    }
    else {
      this.walkCount = 0;
    }
    if (this.walkCount >= 20) {
      this.walkCount = 0;
    }

    //mana recovery
    if (time > this.lastTime + 1000 && this.mana + 5 < 200) {
      this.mana += 5;
      this.lastTime = time;
    }

    //determining weapon pointing direction
    this.angle = atan2(mouseY-(this.height/2+this.y+screenMoveY), mouseX-(this.width/2+this.x+screenMoveX));
  }

  //displaying player movement and animation
  display() {
    //displaying movement facing left
    if (this.facingLeft) {
      image(playerImgList[0][floor(this.walkCount/5)], this.x + screenMoveX, this.y + screenMoveY - playerImgPositionList[floor(this.walkCount/5)], this.width, this.height);
    }
    //displaying movement facing right 
    if (this.facingRight) {
      image(playerImgList[1][floor(this.walkCount/5)], this.x + screenMoveX, this.y + screenMoveY - playerImgPositionList[floor(this.walkCount/5)], this.width, this.height);
    }
    //diplaying weapon
    angleMode(DEGREES);
    push();
    translate(this.x+this.width/2+screenMoveX, this.y+this.height/1.5+screenMoveY);
    //displaying launcher 
    if (range){
      rotate(this.angle);
      image(weapon, -this.width/4, -this.height/6, this.width/2, this.height/3);
    }
    //displaying blade
    else {
      rotate(this.angle+90);
      image(blade, -this.width/12, -this.height/1.2, this.width/6, this.height);
    }
    pop();
  }

  //player shoot movement 
  shoot() { 
    if (mouseIsPressed &&  time - playerShootLastTime > this.shootSpeed && range && this.mana > 5) {
      let playerBullet = new Bullet(playerOne.x+playerOne.width/2, playerOne.y+playerOne.height/2, 15, 30, 1, 20);
      this.mana -= 5;
      bulletList.push(playerBullet);
      playerShootLastTime = time;
      shootSound.playMode("untilDone");
      shootSound.play();
    }
  }

  //player slash movement 
  slash(){ 
    if (mouseIsPressed &&  time - playerShootLastTime > this.slashSpeed && slashing === false) {
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
      slashSound.playMode("untilDone");
      slashSound.play();
      slashcollision(this, minionList);
      slashcollision(this, archerList);
    }
    if (time - playerShootLastTime > 100) {
      slashing = false;
    }
  }
}

//player bullet 
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

  //player bullet travel path
  move() {
    this.x += this.disX/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);
    this.y += this.disY/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);

    //player bullet and minion collision detection
    for (let i = 0; i < minionList.length; i++){
      if (this.x > minionList[i].x && this.x < minionList[i].x + minionList[i].width && this.y > minionList[i].y && this.y < minionList[i].y + minionList[i].height){
        this.hit -= 1;
        minionList[i].lives -= this.damage;
        let attack = new DamageText(this.x, this.y, 15, this.damage);
        textList.push(attack);
      }
    }

    //player bullet and archer collision detection
    for (let i = 0; i < archerList.length; i++){
      if (this.x > archerList[i].x && this.x < archerList[i].x + archerList[i].width && this.y > archerList[i].y && this.y < archerList[i].y + archerList[i].height){
        this.hit -= 1;
        archerList[i].lives -= this.damage;
        let attack = new DamageText(this.x, this.y, 15, this.damage);
        textList.push(attack);
      }
    }
  }

  //display bullet
  display() {
    angleMode(DEGREES);
    push();
    translate(this.x+screenMoveX, this.y+screenMoveY);
    rotate(this.angle);
    image(bullet, -this.radius, -this.radius/2, this.radius * 2, this.radius);
    pop();
  }
}

//enemy bullet
class EnemyBullet extends Bullet {
  constructor(x, y, radius, speed, hit, damage) {
    super(x, y, radius, speed, hit);
    this.disX = this.x - playerOne.x-playerOne.width/2;
    this.disY = this.y - playerOne.y-playerOne.height/2;
    this.damage = damage;
  }

  //enemy bullet movement path
  move() {
    this.x -= this.disX/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);
    this.y -= this.disY/(sqrt(sq(this.disX) + sq(this.disY))/this.speed);

    //enemy bullet and player collision detection 
    if (this.x > playerOne.x && this.x < playerOne.x + playerOne.width && this.y > playerOne.y && this.y < playerOne.y + playerOne.height){
      this.hit -= 1;
      playerOne.health -= this.damage;
    }
  }

  //displaying enemy bullet
  display() {
    image(enemyBullet, this.x + screenMoveX, this.y + screenMoveY, this.radius*2);
  }
}

//enemy minions
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
    if (random(0, 100) > 50) {
      this.facingLeft = true;
    }
    else {
      this.facingLeft = false;
    }
    
    this.facingRight = !this.facingLeft; 
  }

  //movement of enemy minions
  move() {
    let pX = playerOne.x + playerOne.width/2;
    let pY = playerOne.y + playerOne.height/2;
    let tX = this.x+this.width/2;
    let tY = this.y+this.height/2;

    if (sqrt(sq(pX - tX) + sq(pY - tY)) < cellSize *10) {
      this.walkCount += 1;
      movementCheck(this);
      if (tX + this.speed < pX) {
        if (this.rightFree) {
          this.x += this.speed;
          this.facingLeft = false;
          this.facingRight = true;
        }
      }
      else if (tX - this.speed > pX && this.leftFree) {
        this.x -= this.speed;
        this.facingLeft = true;
        this.facingRight = false;
      }
      if (tY + this.speed < pY && this.downFree) {
        this.y += this.speed;
      }
      else if (tY - this.speed > pY && this.upFree) {
        this.y -= this.speed;
      }
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
    fill("green");
    rect(this.x+screenMoveX+this.width/2-width/40*(this.lives/dataList[0][1])/2, this.y+screenMoveY-this.height/2,width/40*(this.lives/dataList[0][1]),height/100);
  }
}

class Archers extends Minions {
  constructor(x, y, width, height, speed, lives, shootSpeed, ShootLastTime) {
    super(x, y, width, height, speed, lives);
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
    }
    
  }
  shoot() {    
    if (time - this.enemyShootLastTime > this.shootSpeed) {
      let enemyBullet = new EnemyBullet(this.x + this.width/2, this.y + this.height/2, 15, 15, 1, dataList[1][0]);
      enemyBulletList.push(enemyBullet);
      this.enemyShootLastTime = time;
      laserSound.playMode("untilDone");
      laserSound.play();
    }
  }
  display() {
    if (this.facingLeft) {
      image(archerImgList[1][floor(this.walkCount/6)], this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
    }
    if (this.facingRight) {
      image(archerImgList[0][floor(this.walkCount/6)], this.x + screenMoveX, this.y + screenMoveY, this.width, this.height);
    }
    fill("green");
    rect(this.x+screenMoveX+this.width/2-width/40*(this.lives/dataList[1][1])/2, this.y+screenMoveY-this.height/2,width/40*(this.lives/dataList[1][1]),height/100);
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
  move(){
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
} 

function spawnLocation() { 
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

  noStroke();
  fill("white");
  if (mouseOverPause) {
    fill("grey");
  }
  rect(1750*(width/1920), 50*(height/789), 20*(width/1920), 100*(height/789));
  rect(1800*(width/1920), 50*(height/789), 20*(width/1920), 100*(height/789));

  miniMap();
  push();
  textSize(50);
  stroke(255);
  fill(255);
  textAlign(CENTER);
  text("TIME: " + round(time/1000), 7*width/9, height/10);
  text("SCORE: " + score, 5*width/9, height/10);
  pop();
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
      object.downFree = false;
    }
    if (grid[object.positionY+1][object.positionX+1] === 1 && object.y + object.height + object.speed >= (object.positionY+1) * cellSize && object.x + object.width >= (object.positionX+1) * cellSize) {
      object.downFree = false;
    }
  }

  if (object.positionY >= 1) {//moving up sanity check
    if (grid[object.positionY-1][object.positionX] === 1 && object.y - object.speed <= (object.positionY) * cellSize) {
      object.upFree = false;
    }
    if (grid[object.positionY-1][object.positionX+1] === 1 && object.y - object.speed <= (object.positionY) * cellSize && object.x + object.width >= (object.positionX+1) * cellSize) {
      object.upFree = false;
    }
  }

  
  if (object.positionX <= gridSize-2) {//moving right sanity check
    if (object.positionY >= 1) {
      if (grid[object.positionY][object.positionX+1] === 1 && object.x + object.width + object.speed >= (object.positionX+1) * cellSize) {
        object.rightFree = false;
      }
    }
    if (object.positionY <= gridSize-2) {
      if (grid[object.positionY+1][object.positionX+1] === 1 && object.x + object.width + object.speed >= (object.positionX+1) * cellSize && object.y + object.height >= (object.positionY+1) * cellSize) {
        if (object.y + object.height >= (object.positionY+1) * cellSize) {
          object.rightFree = false;
        } 
      }
    }
  }

  if (object.positionX >= 1) {//moving left sanity check
    if (object.positionY >= 1) {
      if (grid[object.positionY][object.positionX-1] === 1 && object.x - object.speed <= (object.positionX) * cellSize) {
        object.leftFree = false;
      }
    }
    if (object.positionY <= gridSize-2) {
      if (grid[object.positionY+1][object.positionX-1] === 1 && object.x - object.speed <= (object.positionX) * cellSize) {
        if (object.y + object.height >= (object.positionY+1) * cellSize) {
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
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
      else if (collidePointArc(target[i].x + screenMoveX, target[i].y + target[i].height+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
      else if (collidePointArc(target[i].x + target[i].width+ screenMoveX, target[i].y+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)) {
        target[i].lives -= slasher.damage;
        let attack = new DamageText(target[i].x, target[i].y, 15, slasher.damage);
        textList.push(attack);
      }
      else if (collidePointArc(target[i].x + target[i].width+ screenMoveX, target[i].y + target[i].height+ screenMoveY , slasher.x + screenMoveX + slasher.width/2, slasher.y + screenMoveY + slasher.height/2, arcRadius, slashAngle + 345, ARC_ANGLE)){
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
    }
  }
}

function mousePressed(){
  if (mouseOverPause) {
    pause = !pause;
  }
  if (mouseOverRect(infoList[0][0],infoList[0][1],infoList[0][2],infoList[0][3])){
    helpPage = !helpPage;
  }
}

function miniMap(){
  fill(142, 142, 142, 100);
  rect(1550*(width/1920), 170*(height/789), grid[0].length*(cellSize/24), grid.length*(cellSize/24)); 
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] !== 0 && grid[y][x] !== 1){
        fill("black");
        rect((1550+x*cellSize/24)*(width/1920), (170*(height/789)+y*cellSize/24), cellSize/24, cellSize/24); 
      }
    }
  }
  fill("red");
  rect((playerOne.x/24+1550)*(width/1920), (playerOne.y/24+170*(height/789)), playerOne.width/24*(width/1920), (playerOne.height/24)*(height/789));
  if (round(frameCount/50) % 2 === 0 && minionList.length+archerList.length <= 15){
    push();
    textSize(25);
    stroke(255);
    fill(255);
    textAlign(LEFT);
    text("Find and Defeat Remaining Enemies!", 1400*(width/1920), (170+grid.length*(cellSize/24))*(height/789));
    pop();
  } 
}

function mouseOverRect(x, y, rectWidth, rectHeight){
  if (mouseX > x && mouseX < x+rectWidth && mouseY > y && mouseY < y+rectHeight) {
    return true;
  }
  return false;
}