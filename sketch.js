var bird;
var pipes = [];
var screen = "menu";
let bg;
let asteroid;
let jumpSound;
let scoreSound;
let font;
let soundImage;
let muteSoundImage;
let sound = true;

let astronaut = {
  template: ["Template"],
  helmet: [
    "Helmet Dive",
    "Helmet Racing Forest",
    "Helmet Racing Aqua",
    "Helmet Racing Royal",
    "Helmet Racing Void",
    "Helmet Racing White",
    "Helmet Riot",
    "Helmet Soldier Forest",
    "Helmet Soldier White",
    "Helmet Soldier Void",
    "Helmet Soldier Royal",
    "Helmet Soldier Aqua",
    "Visor Black",
    "Visor Blue",
    "Visor Evil",
    "Visor Gas Mask",
    "Visor Reflect",
    "Visor Television",
    "Visor Sun",
    "Helmet Racing Aqua",
  ],
  suit: ["Suit Biohazard", "Suit Forest", "Suit Aqua", "Suit Royal", "Suit Void", "Suit White", "Suit Martian"],
  shoes: ["Boots Black", "Boots Leather", "Boots Sneakers", "Boots Slides", "Boots Sneakers Blue", "Boots Kicks"],
  jetpack: [
    "Jetpack Biohazard",
    "Jetpack Default Forest",
    "Jetpack Default Aqua",
    "Jetpack Default Royal",
    "Jetpack Default Void",
    "Jetpack Default White",
    "Jetpack Thrusters",
    "Jetpack Rocket",
    "Jetpack Hunter",
    "Jetpack Martian",
    "Jetpack Detector",
    "Jetpack Bag",
  ],
  trail: ["Trail Flame Blue", "Trail Flame Red", "Trail Love", "Trail Rainbow", "Trail Smoke", "Trail Cash", "Trail Stars"],
  gloves: ["Gloves Boxing Blue", "Gloves Boxing Red", "Gloves Experiment", "Gloves Leather", "Gloves Fingerless", "Gloves Camo"],
};

let time = Date.now();

function preload() {
  bg = loadImage("https://i.ibb.co/YQKjj2z/tfghc.png");
  //astronaut = loadImage("https://i.ibb.co/FXDQ6jP/astronaut.png");
  asteroid = loadImage("https://i.ibb.co/BP9RVnx/asteroid.png");
  menu = loadGif("./menu.gif");
  soundImage = loadImage("https://i.ibb.co/HBc1YhM/sound.png");
  muteSoundImage = loadImage("https://i.ibb.co/6JD52rx/mutesound.png");
  font = loadFont("./Brave Hearted.ttf");
  jumpSound = loadSound("./videogamejumpsound2.mp3");
  scoreSound = loadSound("./score.mp3");

  buildAstronaut = {
    suit: loadImage(`./astronauts/suit/${astronaut["suit"][Math.floor(Math.random() * astronaut["suit"].length)]}.png`),
    trail: loadImage(`./astronauts/trail/${astronaut["trail"][Math.floor(Math.random() * astronaut["trail"].length)]}.png`),
    shoes: loadImage(`./astronauts/shoes/${astronaut["shoes"][Math.floor(Math.random() * astronaut["shoes"].length)]}.png`),
    jetpack: loadImage(`./astronauts/jetpack/${astronaut["jetpack"][Math.floor(Math.random() * astronaut["jetpack"].length)]}.png`),

    gloves: loadImage(`./astronauts/gloves/${astronaut["gloves"][Math.floor(Math.random() * astronaut["gloves"].length)]}.png`),
    template: loadImage(`./astronauts/template/${astronaut["template"][0]}.png`),
    helmet: loadImage(`./astronauts/helmet/${astronaut["helmet"][Math.floor(Math.random() * astronaut["helmet"].length)]}.png`),
  };
  buildAstronaut2 = {
    suit: loadImage(`./astronauts/suit/${astronaut["suit"][Math.floor(Math.random() * astronaut["suit"].length)]}.png`),
    trail: loadImage(`./astronauts/trail/${astronaut["trail"][Math.floor(Math.random() * astronaut["trail"].length)]}.png`),
    shoes: loadImage(`./astronauts/shoes/${astronaut["shoes"][Math.floor(Math.random() * astronaut["shoes"].length)]}.png`),
    jetpack: loadImage(`./astronauts/jetpack/${astronaut["jetpack"][Math.floor(Math.random() * astronaut["jetpack"].length)]}.png`),

    gloves: loadImage(`./astronauts/gloves/${astronaut["gloves"][Math.floor(Math.random() * astronaut["gloves"].length)]}.png`),
    template: loadImage(`./astronauts/template/${astronaut["template"][0]}.png`),
    helmet: loadImage(`./astronauts/helmet/${astronaut["helmet"][Math.floor(Math.random() * astronaut["helmet"].length)]}.png`),
  };

  console.log(`./astronauts/template/${astronaut["template"][0]}.png`);
  console.log(`./astronauts/helmet/${astronaut["helmet"][Math.floor(Math.random() * astronaut["helmet"].length)]}.png`);

  console.log(buildAstronaut);
  console.log(Object.keys(buildAstronaut).length);
}
function setup() {
  collideDebug(true);

  createCanvas(600, 800);

  frameRate(70);
  bird = new Bird(buildAstronaut);
  textAlign(CENTER, CENTER);
  textStyle(BOLD);
  textSize(50);
  spawnPipe(width + 500);
  spawnPipe(width + 1050);

  let checkSound = getItem("sound");
  if (checkSound == null) storeItem("sound", true);
  if (checkSound != null) sound = checkSound;
}

function draw() {
  if (screen == "menu") {
    background(menu);
    //menu.show();
    //menu.position(0, 0);
    //rect(width * 0.17, height * 0.427, 400, 90);
    //rect(width * 0.17, height * 0.6, 400, 90);
    //rect(width * 0.17, height * 0.77, 400, 90);
  }

  if (screen != "menu") {
  }

  if (screen == "playing" || screen == "lost") {
    strokeWeight(0);
    background(bg);

    if (time + 1000 < Date.now()) {
      console.log("new bird");
      bird = new Bird(buildAstronaut2);
      time = Date.now();
    }
    bird.show(screen);
    bird.update();

    if (pipes.length <= 8) {
      spawnPipe(pipes[0].x + 550);
    }

    for (let i = pipes.length - 1; i >= 0; i--) {
      pipes[i].show();
      pipes[i].update(0.3);

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }

      if (screen == "playing") {
        if (i % 6 == 0) {
          if (pipes[i].scored(bird)) {
            if (sound) {
              scoreSound.setVolume(0.2);
              if (scoreSound.isPlaying()) jumpSound.stop();
              scoreSound.play();
              userStartAudio();
            }

            console.log("scored");
          }
        }

        if (pipes[i].hits(bird)) {
          let highScore = getItem("highScore");
          if (!highScore) storeItem("highScore", bird.score);
          if (bird.score > highScore) storeItem("highScore", bird.score);
          screen = "lost";
          console.log(screen);
        }
      }
    }
  }

  if (screen == "lost") {
    let highScore = getItem("highScore");

    stroke("#00A2E8");
    strokeWeight(3);

    fill(0);
    rect(width * 0.06, height * 0.28, width - 80, 80);
    fill(255);
    //textFont(font);
    noStroke();
    text("Score: " + bird.score, width / 2, height * 0.33);
    stroke("#00A2E8");
    strokeWeight(3);
    fill(0);
    rect(width * 0.06, height * 0.45, width - 80, 80);
    fill(255);
    noStroke();
    text("Best: " + highScore, width / 2, height * 0.5);
    stroke("#00A2E8");
    strokeWeight(3);
    fill(0);
    rect(width * 0.06, height * 0.62, width - 80, 80);
    fill(255);
    noStroke();
    text("Play Again", width / 2, height * 0.67);

    bird.fall();
  }

  if (screen == "playing") {
    fill(255);
    strokeWeight(5);
    stroke(0);
    text(bird.score, width / 2, height / 5);
  }

  if (screen == "menu" || screen == "lost") {
    if (sound) image(soundImage, width * 0.88, 0);
    if (!sound) image(muteSoundImage, width * 0.88, 4.5);
  }
}

function restartGame() {
  screen = "playing";
  bird.score = 0;
  pipes = [];
  bird = new Bird(buildAstronaut);
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

function keyPressed() {
  if (keyCode == "32") {
    action();
  }
}
function mousePressed() {
  action();
}

function action() {
  if (screen == "menu") {
    console.log("breh");
    if (mouseX > width * 0.17 && mouseX < width * 0.17 + 400 && mouseY > height * 0.427 && mouseY < height * 0.427 + 90) {
      screen = "playing";
    }
  }
  if (screen == "playing") {
    bird.up();
    if (sound) {
      jumpSound.setVolume(0.05);
      if (jumpSound.isPlaying()) jumpSound.stop();
      jumpSound.play();
      userStartAudio();
    }
  }

  if (screen == "lost") {
    if (mouseX > width * 0.06 && mouseX < width * 0.06 + (width - 80) && mouseY > height * 0.62 && mouseY < height * 0.62 + 80) {
      restartGame();
    }
  }

  if (screen == "menu" || screen == "lost") {
    if (mouseX > width * 0.88 && mouseX < width * 0.88 + 64 && mouseY > 5 && mouseY < 5 + 64) {
      sound = !sound;
      storeItem("sound", sound);
      console.log(getItem("sound"));
    }
  }
}
