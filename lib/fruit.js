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
  constructor(pos) {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];;
    this.pos = pos;
    this.vel = 0;
    this.falling = false;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 3) * 80;
    this.lastYpos = (pos[1] - 3) * 80;
    this.move = this.move.bind(this);
  }

  setPos(pos) {
    this.pos = pos;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 3) * 80;
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
    this.lastYpos += this.vel;
    
    if (this.falling) {
      if (this.lastYpos === this.ypos) {
        this.vel = 0;
      } else {
        this.vel = ((this.ypos - this.lastYpos) / 60);
      }
    } else {
      this.vel = 0;
    }
  }
}

export default Fruit;
