class EmptySpace {
  constructor(pos) {
    this.type = 'empty';
    this.pos = pos;
    this.vel = 0;
  }

  createImage() {
    let img = new Image();
    img.src = './images/emptyspace.png';
    img.xpos = (this.pos[0] * 80);
    img.ypos = (this.pos[1] * 80);
    return img;
  }
}

export default EmptySpace;
