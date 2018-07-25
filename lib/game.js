import Board from './board';


class Game {
  constructor() {
    this.points = 0;
    this.maxPoints = 1000;
    this.maxMoves = 10;
    this.board = new Board();
    this.won = null;
  }

  play() {
    this.board.populate();
  }

  won() {
    if (this.points >= this.maxPoints) {
      this.woon = true;
    }
  }


}


export default Game;
