let cx, cy;
let secondsRadius;
let minutesRadius;
let hoursRadius;
let clockDiameter;
let romans = ['Ⅰ', 'Ⅱ', 'Ⅲ', 'Ⅳ', 'Ⅴ', 'Ⅵ', 'Ⅶ', 'Ⅷ', 'Ⅸ', 'Ⅹ', 'Ⅺ', 'Ⅻ'];

function setup() {
  createCanvas(400, 400);

  let radius = min(width, height) / 2;
  secondsRadius = radius * 0.71;
  minutesRadius = radius * 0.6;
  hoursRadius = radius * 0.5;
  clockDiameter = radius * 1.7;

  cx = width / 2;
  cy = height / 2;
}

function draw() {
  background(0);

  // Draw the clock background
  noStroke();
  fill(210, 0, 0);
  ellipse(cx, 50, clockDiameter, clockDiameter - 100);
  fill(0, 0, 0);
  ellipse(cx, -50, clockDiameter, clockDiameter - 50);
  fill(210, 0, 0);
  ellipse(cx, cy, clockDiameter + 25, clockDiameter + 25);
  fill(0, 0, 0);
  ellipse(cx, cy, clockDiameter, clockDiameter);
  fill(255, 255, 255);
  ellipse(cx, cy, clockDiameter - 50, clockDiameter - 50);
  fill(0, 0, 0);
  ellipse(cx, cy, clockDiameter - 58, clockDiameter - 58);
  fill(255, 255, 255);
  ellipse(cx, cy, clockDiameter - 85, clockDiameter - 85);
  fill(0, 0, 0);
  ellipse(cx, cy, clockDiameter - 87, clockDiameter - 87);

  // Angles for sin() and cos() start at 3 o'clock;
  // subtract HALF_PI to make them start at the top
  let s = map(second(), 0, 60, 0, TWO_PI) - HALF_PI;
  let m = map(minute() + norm(second(), 0, 60), 0, 60, 0, TWO_PI) - HALF_PI;
  let h = map(hour() + norm(minute(), 0, 60), 0, 24, 0, TWO_PI * 2) - HALF_PI;

  // Draw the hands of the clock
  stroke(255);
  strokeWeight(1);
  line(cx, cy, cx + cos(s) * secondsRadius, cy + sin(s) * secondsRadius);
  strokeWeight(2);
  line(cx, cy, cx + cos(m) * minutesRadius, cy + sin(m) * minutesRadius);
  strokeWeight(4);
  line(cx, cy, cx + cos(h) * hoursRadius, cy + sin(h) * hoursRadius);

  // Draw the minute ticks
  drawLines(0.5, 6, hoursRadius * 0.4, hoursRadius * 0.5);
  drawLines(1, 6, secondsRadius, secondsRadius * 0.9);

  // Draw the hour ticks
  drawLines(2, 30, hoursRadius * 0.4, hoursRadius * 0.5);
  drawLines(3, 30, secondsRadius, secondsRadius * 0.9);

  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER);
  let count = 0;
  for (let a = -60; a <= 270; a += 30) {
    let angle = radians(a);
    let x = cx + cos(angle) * minutesRadius * 1.3;
    let y = cy + sin(angle) * minutesRadius * 1.3;
    text(romans[count], x, y);
    count++;
  }
}

function drawPoints(weight, increments, radius) {
  strokeWeight(weight);
  beginShape(POINTS);
  for (let a = 0; a < 360; a += increments) {
    let angle = radians(a);
    let x = cx + cos(angle) * radius;
    let y = cy + sin(angle) * radius;
    vertex(x, y);
  }
  endShape();
}

function drawLines(weight, increments, radius1, radius2) {
  strokeWeight(weight);
  beginShape(LINES);
  for (let a = 0; a < 360; a += increments) {
    let angle = radians(a);
    let x1 = cx + cos(angle) * radius1;
    let y1 = cy + sin(angle) * radius1;
    let x2 = cx + cos(angle) * radius2;
    let y2 = cy + sin(angle) * radius2;
    vertex(x1, y1);
    vertex(x2, y2);
  }
  endShape();
}