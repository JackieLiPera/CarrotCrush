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
  kiwi: './images/kiwi-icon.png',
  empty: './images/emptyspace.png'
}


class Fruit {
  constructor(pos, ctx) {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];;
    this.pos = pos;
    this.vel = 0;
    this.ctx = ctx;
  }

  createImage() {
    let img = new Image();
    img.src = ICONS[this.type]
    img.xpos = (this.pos[0] * 80);
    img.ypos = (this.pos[1] * 80);
    return img;
  }

  draw(this.ctx) {
    
  }
}

export default Fruit;
