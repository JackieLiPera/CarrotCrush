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
    this.yvel = 0;
    this.xvel = 0;
    this.falling = falling;
    this.shaking = false;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 5) * 80;
    this.nextYpos = null;
    this.oldXpos = null;
    this.oldYpos = null;
    this.newXpos = null;
    this.newYpos = null;
    this.move = this.move.bind(this);
  }

  setNewPos(pos, oldY) {
    this.pos = pos;
    this.nextYpos = ((pos[1] - 5) * 80);
  }

  setTempPos(pos, oldX, oldY) {
    this.oldXpos = (oldX * 80);
    this.oldYpos = ((oldY - 5) * 80);
    this.newXpos = (pos[0] * 80);
    this.newYpos = ((pos[1] - 5) * 80);
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
    this.ypos += this.yvel;
    this.xpos += this.xvel;

    if (this.falling) {
      if (this.ypos >= this.nextYpos) {
        this.falling = false;
        this.yvel = 0;
      } else {
        this.yvel = ((this.nextYpos - this.ypos) / 60) * 10;
      }
    } else {
      this.yvel = 0;
    }

    if (this.swapping) {
      if (this.oldXpos > this.newXpos) {
        this.xvel = -(80 / 60) * 5;
        this.yvel = 0;

        if(this.xpos <= this.newXpos) {
          this.xvel = 0;
          this.swapping = false;
        }
      } else if (this.oldXpos < this.newXpos) {
        this.xvel = (80/60) * 5;
        this.yvel = 0;

        if(this.xpos >= this.newXpos) {
          this.xvel = 0;
          this.swapping = false;
        }
      } else {
        this.xvel = 0;
      }

      if (this.oldYpos > this.newYpos) {
        this.yvel = -(80 / 60) * 5;
        this.xvel = 0;

        if(this.ypos <= this.newYpos) {
          this.yvel = 0;
          this.swapping = false;
        }
      } else if (this.oldYpos < this.newYpos) {
        this.yvel = (80/60) * 5;
        this.xvel = 0;

        if(this.ypos >= this.newYpos) {
          this.yvel = 0;
          this.swapping = false;
        }
      } else {
        this.yvel = 0;
      }

    }
  }

  shake() {
    if (this.shaking) {
      // const delta = Math.floor(Math.random() * 2);
      // this.ypos += dy;
      // this.xpos += dx;
    }
  }
}

export default Fruit;
