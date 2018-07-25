import Board from './board';
import Game from './game';

class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new Board(ctx);
    this.game = new Game(this.board);
  }

  start() {
    this.board.draw(this.ctx);
    this.game.play();
  }
}

export default GameView;
