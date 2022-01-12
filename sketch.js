var bird;
var pipes = [];
var playing = true;
let bg;
let astronaut;
let asteroid;
let jumpSound;

function preload() {
  bg = loadImage("https://i.ibb.co/YQKjj2z/tfghc.png");
  astronaut = loadImage("https://i.ibb.co/FXDQ6jP/astronaut.png");
  asteroid = loadImage("https://i.ibb.co/BP9RVnx/asteroid.png");
  jumpSound = loadSound("./videogamejumpsound.mp3");
}
function setup() {
  collideDebug(true);

  createCanvas(600, 800);

  frameRate(70);
  bird = new Bird(astronaut);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(50);
  spawnPipe(width + 100);
  spawnPipe(width + 600);
}

function draw() {
  strokeWeight(0);
  background(bg);
  bird.show();
  bird.update();

  if (pipes.length <= 8) {
    spawnPipe(pipes[0].x + 500);
  }
  /*if (frameCount % 120 == 0) {
    let hole = Math.floor(Math.random() * 8);
    let amount = 1;
    if (hole == 7 && amount == 1) hole = 6;
    for (let i = 0; i < 8; i++) {
      if (i >= hole && i <= hole + amount) continue;
      pipes.push(new Pipe(i * 100 + 50));
    }

    console.log("pipe created"); // add score here
  }*/
  let scored = { x: 0, check: false };
  for (let i = pipes.length - 1; i >= 0; i--) {
    pipes[i].show();
    pipes[i].update(4.5);

    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }

    if (playing) {
      if (i % 6 == 0) {
        if (pipes[i].scored(bird)) {
          console.log("scored");
        }
      }

      if (pipes[i].hits(bird)) {
        playing = false;
      }
    }
  }

  if (!playing) {
    strokeWeight(3);

    fill(255);
    rect(width * 0.06, height * 0.28, width - 80, 80);
    fill(0);
    text("Score: " + bird.score, width / 2, height / 3);

    fill(255);

    rect(width * 0.06, height * 0.45, width - 80, 80);
    fill(0);
    text("Play Again", width / 2, height / 2);
    bird.fall();
  }

  if (playing) {
    fill(255);
    strokeWeight(5);
    stroke(0);
    text(bird.score, width / 2, height / 5);
  }
}

function restartGame() {
  playing = true;
  bird.score = 0;
  console.log("yo");
  pipes = [];
  bird = new Bird(astronaut);
  spawnPipe(width + 100);
  spawnPipe(width + 600);
}
function spawnPipe(x) {
  let hole = Math.floor(Math.random() * 8);
  let amount = 1;

  if (hole == 7 && amount == 1) hole = 6;

  for (let i = 0; i < 8; i++) {
    if (i >= hole && i <= hole + amount) continue;

    pipes.push(new Pipe(x, i * 100 + 50, asteroid));
  }
}
function mousePressed() {
  if (playing) {
    console.log("yo");
    bird.up();
    jumpSound.setVolume(0.05);
    if (jumpSound.isPlaying()) jumpSound.stop();
    jumpSound.play();
    userStartAudio();
  }

  if (!playing) {
    if (mouseX > width * 0.06 && mouseX < width * 0.06 + (width - 80) && mouseY > height * 0.45 && (mouseY * 0.45) / 2 + 80) {
      restartGame();
    }
  }
}
