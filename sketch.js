// CS-30 Major Project 
// Aaron Su
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"
let grid;

function setup() {
  createCanvas(windowWidth, windowHeight);
  grid = create2DArray();
}

function draw() {
  background(220);
}

function create2DArray() {
  let gridList = [];
  for (let y = 0; y <= 50; y++) {
    for (let x = 0; x <=50; x++) {
      gridList.push(1);
    }
  }
  return gridList;
}