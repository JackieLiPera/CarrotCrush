import Board from './board';

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
    this.board = new Board();
  }

  start() {
    this.board.draw(this.ctx)
  }
}

export default GameView;
