class EmptySpace {
  constructor(pos) {
    this.type = 'empty';
    this.pos = pos;
    this.vel = 0;
    this.falling = false;
    this.ypos = (pos[1] * 80);
    this.xpos = (pos[0] * 80);
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

  move() {
    // this.ypos += this.vel;
    // if (this.falling) {
    //   if (this.ypos === (this.pos[1] * 80)) {
    //     this.vel = 0;
    //   } else {
    //     this.vel = (((this.pos[1] * 80) - this.ypos) / 60);
    //   }
    // } else {
    //   this.vel = 0;
    // }
  }
}

export default EmptySpace;
