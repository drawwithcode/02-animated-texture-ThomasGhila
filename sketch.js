var points = [];
var increment = 0.0005;

var r1;
var r2;
var g1;
var g2;
var b1;
var b2;

var img;

var fr = 60;

function preload() {
  img = loadImage("image.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  frameRate(fr);

  angleMode(DEGREES);
  noiseDetail(5);

  background(20);

  push();
  textAlign(CENTER);
  textSize(height /40);
  text("if I were you I'd press me", (windowWidth/4)*3, windowHeight/2);
  pop();

  image(img, (windowWidth/ 2), 0, (windowWidth/2), windowHeight);
  

  // //density is the number of points in each row
  var density = 100;

  // //space is the distance within each point
  var space = width / density;

  //for to create all starting points
  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var p = createVector(x + random(-10, 10), y + random(-10, 10));

      points.push(p);
    }
  }

  r1 = random(255);
  r2 = random(255);
  g1 = random(255);
  g2 = random(255);
  b1 = random(255);
  b2 = random(255);
  a1 = random(255);
  a2 = random(255);
  

  increment = random(0.002, 0.001);
}

function draw() {
  push();
  noStroke();

  

  //for to iterate through the points
  for (var i = 0; i < points.length/4; i++) {
    //change the color
    var r = map(points[i].x, 0, width, r1, r2);
    var g = map(points[i].y, 0, height, g1, g2);
    var b = map(points[i].x, 0, width, b1, b2);
    var a = map(points[i].y, 0, height, a1, a2);
    fill(r, g, b, a);
    
    //angle at which each point will move
    var angle = map(
      noise(points[i].x * increment, points[i].y * increment),
      0,
      255,
      0,
      720
    );
    //vectors to add to each point based on the angle
    points[i].add(createVector(cos(angle), sin(angle)));
    ellipse(points[i].x, points[i].y, 1);
  }
  pop();
  push();
  noStroke();

  
  //for to iterate through the points
  for (var i = 0; i < (points.length/4)*2; i++) {
    //change the color
    var r = map(points[i].x, 0, width, r2, g1);
    var g = map(points[i].y, 0, height, g2, b1);
    var b = map(points[i].x, 0, width, b2, a1);
    var a = map(points[i].y, 0, height, a2, r1);
    fill(r, g, b, a);
    
    //angle at which each point will move
    var angle = map(
      noise(points[i].x * increment, points[i].y * increment),
      0,
      1,
      0,
      720
    );
    //vectors to add to each point based on the angle
    points[i].add(createVector(cos(angle), sin(angle)));
    ellipse(points[i].x, points[i].y, 1);
  }
  pop();
}

function mousePressed(event) {
  increment =+ 0.005;
  fr =+ 6000;
}
