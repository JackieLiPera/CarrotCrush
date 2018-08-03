const DEFAULT = {
  TYPE: [
    "carrot",
    "blueberry",
    "kiwi",
    "pineapple",
    "strawberry",
    "banana"]
}

const ICONS = {
  carrot: './images/carrot.png',
  blueberry: './images/blueberry.png',
  pineapple: './images/pineapple-icon.png',
  banana: './images/banana.png',
  strawberry: './images/strawberry-icon.png',
  kiwi: './images/kiwi-icon.png'
}


class Fruit {
  constructor(pos, falling) {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];;
    this.pos = pos;
    this.vel = 0;
    this.falling = falling;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 5) * 80;
    this.lastYpos = null;
    this.nextYpos = null;
    this.move = this.move.bind(this);
    this.shaking = false;
  }

  setNewPos(pos, oldY) {
    this.pos = pos;
    this.nextYpos = ((pos[1] - 5) * 80);
  }

  setTempPos(pos) {
    this.pos = pos;
    this.ypos = ((pos[1] - 5) * 80);
    this.xpos = (pos[0] * 80);
  }

  createImage() {
    let img = new Image();
    img.src = ICONS[this.type];
    img.xpos = this.xpos;
    img.ypos = this.ypos;
    return img;
  }


  draw(ctx) {
    let image = this.createImage();
    ctx.save();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
    ctx.restore();
  }

  move() {
    this.ypos += this.vel;
    if (this.falling) {
      if (this.ypos >= this.nextYpos) {
        this.falling = false;
        this.vel = 0;
      } else {
        this.vel = 8;
      }
    } else {
      this.vel = 0;
    }

    if (this.shaking) {
      console.log('hi');
      this.shaking = false; 
    }
  }
}

export default Fruit;
