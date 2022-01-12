var bird;
var pipes = [];
var playing = true;
let bg;
let astronaut;
let asteroid;
let jumpSound;
let scoreSound;
let font;

function preload() {
  bg = loadImage("https://i.ibb.co/YQKjj2z/tfghc.png");
  astronaut = loadImage("https://i.ibb.co/FXDQ6jP/astronaut.png");
  asteroid = loadImage("https://i.ibb.co/BP9RVnx/asteroid.png");

  font = loadFont("./Brave Hearted.ttf");
  jumpSound = loadSound("./videogamejumpsound2.mp3");
  scoreSound = loadSound("./score.mp3");
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
  spawnPipe(width + 650);
}

function draw() {
  strokeWeight(0);
  background(bg);
  bird.show();
  bird.update();

  if (pipes.length <= 8) {
    spawnPipe(pipes[0].x + 550);
  }
  if (frameCount % 120 == 0) {
    let hole = Math.floor(Math.random() * 8);
    let amount = 1;
    if (hole == 7 && amount == 1) hole = 6;
    for (let i = 0; i < 8; i++) {
      if (i >= hole && i <= hole + amount) continue;
      pipes.push(new Pipe(i * 100 + 50));
    }

    console.log("pipe created"); // add score here
  }
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
          scoreSound.setVolume(0.2);
          if (scoreSound.isPlaying()) jumpSound.stop();
          scoreSound.play();
          userStartAudio();
          console.log("scored");
        }
      }

      if (pipes[i].hits(bird)) {
        let highScore = getItem("highScore");
        if (!highScore) storeItem("highScore", bird.score);
        if (bird.score > highScore) storeItem("highScore", bird.score);
        playing = false;
      }
    }
  }

  if (!playing) {
    let highScore = getItem("highScore");
    strokeWeight(3);

    fill(255);
    rect(width * 0.06, height * 0.28, width - 80, 80);
    fill(0);
    textFont(font);
    text("Score: " + bird.score, width / 2, height * 0.33);

    fill(255);

    rect(width * 0.06, height * 0.45, width - 80, 80);
    fill(0);
    text("Best: " + highScore, width / 2, height * 0.5);

    fill(255);

    rect(width * 0.06, height * 0.62, width - 80, 80);
    fill(0);
    text("Play Again", width / 2, height * 0.67);
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
    bird.up();
    jumpSound.setVolume(0.05);
    if (jumpSound.isPlaying()) jumpSound.stop();
    jumpSound.play();
    userStartAudio();
  }

  if (!playing) {
    if (mouseX > width * 0.06 && mouseX < width * 0.06 + (width - 80) && mouseY > height * 0.62 && (mouseY * 0.62) / 2 + 80) {
      restartGame();
    }
  }
}
