import Board from './board';
import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.game = new Game(this.board);
  }

  start() {
    let checkBoardForStreaks = this.board.checkBoardForStreaks();
    this.board.draw(this.ctx).then(checkBoardForStreaks);
    this.game.play();
  }
}

export default GameView;
