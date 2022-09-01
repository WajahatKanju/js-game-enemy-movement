const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);

const image = new Image();
image.src = "./images/enemy1.png";

const SPRITE_SHEET_WIDTH = 1758;
const SPRITE_SHEET_HEIGHT = 155;
const TOTAL_SCENES = 6;
const GAME_SPEED = 2;
let gameFrame = 0;


const r = (min, max) => {
  return Math.random() * (max - min) + min;
}


class Enemey {
  constructor(src, speed, aspectRatio = 1) {
    this.image = new Image();
    this.image.src = src;
    this.speed = speed;
    this.totalSprites = 6;
    this.currentSprite = 0;
    this.sprite = (image.width / this.totalSprites) * this.currentSprite;
    this.width = (image.width / this.totalSprites) * aspectRatio;
    this.height = image.height * aspectRatio;
    this.sourceWidth = image.width / this.totalSprites;
    this.sourceHeight = image.height;
    this.x = r(0, canvas.width - (this.width/2));
    this.y = r(0, canvas.height - (this.height/2));
  }

  findSprite() {
    this.sprite = (image.width / this.totalSprites) * this.currentSprite;
  }
  draw() {
    ctx.drawImage(
      this.image,
      this.sprite,
      0,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.width / 2,
      this.height / 2
      );
    }
  update() {
    if (gameFrame % GAME_SPEED === 0) {
      if (this.currentSprite + 1 > this.totalSprites - 1)
        this.currentSprite = 0;
      else this.currentSprite++;
    }
    this.x += Math.random() * 5 - 2.5;
    this.y += Math.random() * 5 - 2.5;
    this.findSprite();
    this.draw();
  }
}

ctx.stroke();

let scene = 0;
let enemies = [];
for (let i = 0; i < 100; i++) {
  
  enemies.push(new Enemey("./images/enemy1.png", 1, 1));
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies.forEach(enemy => enemy.update());
  gameFrame++;
};

animate();
