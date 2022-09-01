const canvas = document.getElementsByTagName("canvas")[0];
const ctx = canvas.getContext("2d");

const CANVAS_WIDTH = (canvas.width = 500);
const CANVAS_HEIGHT = (canvas.height = 1000);

const TOTOAL_ENEMIES = 75;
const SPRITE_SHEET_WIDTH = 1758;
const SPRITE_SHEET_HEIGHT = 155;
const TOTAL_SCENES = 6;
let gameFrame = 0;


const generateRandom = (min, max) => {
  return Math.random() * (max - min) + min;
}


class Enemey {
  constructor(src, speed, aspectRatio = 1) {
    this.image = new Image();
    this.image.src = src;
    this.flapSpeed = Math.floor(Math.random() * 4 + 2);
    this.totalSprites = 6;
    this.currentSprite = 0;
    this.sprite = (this.image.width / this.totalSprites) * this.currentSprite;
    this.width = (this.image.width / this.totalSprites) * aspectRatio;
    this.height = this.image.height * aspectRatio;
    this.sourceWidth = this.image.width / this.totalSprites;
    this.sourceHeight = this.image.height;
    this.x = generateRandom(0, canvas.width );
    this.y = generateRandom(0, canvas.height - (this.height/2));
    this.angle = 0.05;
    this.curve = generateRandom(0, 8);
    this.angleSpeed = generateRandom(0.01, 0.1);
  }

  findSprite() {
    this.sprite = (this.image.width / this.totalSprites) * this.currentSprite;
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
    if (gameFrame % this.flapSpeed === 0) {
      this.currentSprite = (this.currentSprite + 1) > (this.totalSprites - 1) ? 0 : this.currentSprite += 1;
    }
    if(this.x + this.width < 0 ){
      
      this.x = canvas.width;

    }
    this.x -= this.flapSpeed;
    this.y += this.curve * Math.sin(this.angle);
    this.angle += this.angleSpeed;
    this.findSprite();
    this.draw();
  }
}

ctx.stroke();

let scene = 0;
let enemies = [];
for (let i = 0; i < TOTOAL_ENEMIES; i++) {
  
  enemies.push(new Enemey("./images/enemy2.png", 1, 1/2));
}

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies.forEach(enemy => enemy.update());
  gameFrame++;
};

animate();
