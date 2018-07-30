import EmptySpace from './empty_space';

const Animation = {

  // preShake(ctx) {
  //   ctx.save();
  //   let dx = Math.random() * 10;
  //   let dy = Math.random() * 10;
  //   ctx.translate(dx, dy);
  // },
  //
  // postShake(ctx) {
  //   ctx.restore();
  // },
  //
  // shake(ctx, board) {
  //   ctx.clearRect(0, 0, 480, 480);
  //   Animation.preShake(ctx);
  //   board.redraw(ctx);
  //   Animation.postShake(ctx);
  //   requestAnimationFrame(Animation.shake(ctx, board));
  // },

//
  // swap(x1, x2, y1, y2, ctx, board) {
  //   return  () => {
  //     let shiftx = x1 - x2;
  //     let shifty = y1 - y2;
  //
  //
  //     let dx;
  //     if (x1 > x2) {
  //       dx = -2;
  //     } else if (x1 < x2) {
  //       dx = 2;
  //     } else {
  //       dx = 0;
  //     }
  //
  //     let dy;
  //     if (y1 > y2) {
  //       dy = -2;
  //     } else if (y1 < y2) {
  //       dy = 2;
  //     } else {
  //       dy = 0;
  //     }
  //
  //
  //
  //
  //     if (dx === 0 && dy === 0) {
  //       return;
  //     }
  //
  //     x1 += dx;
  //     y1 += dy;
  //     x2 -= dx;
  //     y2 -= dy;
  //
  //     ctx.beginPath();
  //     ctx.save()
  //     ctx.translate((dx), (dy));
  //     board.redraw(x1, oldXPos, y1, oldYPos, ctx);
  //     ctx.restore();
  //     requestAnimationFrame(Animation.swap(x1, x2, y1, y2, ctx, board));
  //   }
  // }

  // 
  // shift(col, y, base, ctx, board) {
  //
  //   if (y === base) {
  //     board.draw(ctx);
  //     return;
  //   }
  //
  //   y += 1;
  //   ctx.save();
  //   board.draw(ctx);
  //   ctx.restore();
  //   requestAnimationFrame(Animation.shift(col, y, base, ctx, board));
  // }
}

export default Animation;
