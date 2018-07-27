const Animation = {
  preShake(ctx) {
    let dx = Math.random() * 10;
    let dy = Math.random() * 10;
    ctx.translate(dx, dy);
  }

  postShake(ctx) {
    ctx.restore();
  }

  shake(ctx) {
    requestAnimationFrame(this.shake);
    this.ctx.clearRect(0, 0, 480, 480);
    this.preShake(ctx);
    this.renderWithCheck(ctx);
    this.postShake(ctx);
  }


  swap(x1, x2, y1, y2) {
    return  () => {
      let dx;
      if (x1 > x2) {
        dx = -2;
      } else if (x1 < x2) {
        dx = 2;
      } else {
        dx = 0;
      }

      let dy;
      if (y1 > y2) {
        dy = -2;
      } else if (y1 < y2) {
        dy = 2;
      } else {
        dy = 0;
      }

      this.ctx.beginPath();

      if (dx === 0 && dy === 0) {
        return;
      }

      x1 += dx;
      y1 += dy;
      x2 -= dx;
      y2 -= dy;

      this.ctx.save()
      this.ctx.translate((dx), (dy));
      this.redraw(x1, y1, this.ctx);
      this.ctx.restore();
      requestAnimationFrame(this.swap(x1, x2, y1, y2));
    }
   }
}

export default Animation;
