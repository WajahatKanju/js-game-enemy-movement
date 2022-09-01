const canvas = document.getElementsByTagName('canvas')[0];
const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;

const image = new Image();
image.src = './images/enemy1.png'

const SPRITE_SHEET_WIDTH = 1758;
const SPRITE_SHEET_HEIGHT = 155;
const TOTAL_SCENES  = 6;
const GAME_SPEED = 10;

class Enemey{
  constructor(src, speed){
    this.image = new Image();
    this.image.src = src;
    this.speed = speed;
    this.totalSprites = 6;
    this.currentSprite = 0;
    this.sprite = (image.width/this.totalSprites) * this.currentSprite;
    this.width = image.width / this.totalSprites;
    this.height = image.height;
    this.x = 0;
    this.y = 0;
  }
  findSprite(){
    this.sprite = (image.width/this.totalSprites) * this.currentSprite;
  }
  draw(){
    ctx.drawImage(this.image, this.sprite, 0, this.width, this.height, this.x, this.y, this.width, this.height );
    console.log(this.height);
  }
  update(){
    if(this.currentSprite > this.totalSprites - 1) this.currentSprite = 0
    else this.currentSprite ++;
    this.findSprite();
    this.draw();
  }
}


ctx.stroke();

let scene = 0

let enemy = new Enemey('./images/enemy1.png', 1);

const animate = () => {
  requestAnimationFrame(animate);
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemy.update();
  // ctx.drawImage(image, SPRITE_SHEET_WIDTH/TOTAL_SCENES * scene,0, (SPRITE_SHEET_WIDTH/TOTAL_SCENES), SPRITE_SHEET_HEIGHT, 0,0, SPRITE_SHEET_WIDTH/TOTAL_SCENES, SPRITE_SHEET_HEIGHT);
  // if(scene >5) scene = 0
  // else scene++;
}

animate();