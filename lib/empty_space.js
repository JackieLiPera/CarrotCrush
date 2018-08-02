class EmptySpace {
  constructor(pos) {
    this.type = 'empty';
    this.pos = pos;
    this.vel = 0;
    this.falling = false;
    this.ypos = (pos[1] * 80);
    this.xpos = (pos[0] * 80);
  }

  setPos(pos) {
    this.pos[0] = pos[0];
    this.pos[1] = pos[1];
    this.xpos = (pos[0] * 80);
    this.ypos = (pos[1] * 80);
  }

  createImage() {
    let img = new Image();
    img.src = './images/emptyspace.png';
    img.xpos = this.xpos;
    img.ypos = this.ypos;
    return img;
  }

  draw(ctx) {
    let image = this.createImage();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
  }

  move() {}
}

export default EmptySpace;
