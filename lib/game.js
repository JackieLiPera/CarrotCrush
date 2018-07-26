import Board from './board';


class Game {
  constructor(board) {
    this.score = 0;
    this.objectiveScore = 1000;
    this.movesLeft = 10;
    this.board = board;
    this.won = false;
    this.prevMove = null;

    this.play = this.play.bind(this);
    this.getMove = this.getMove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.winner = this.winner.bind(this);

    $("#canvas").on('click', this.handleMove);
    $(".player-score").text(this.score);
    $(".target-score").text(`Target: ${this.objectiveScore}`);
    $(".moves-left").text(`${this.movesLeft}`);
  }

  play() {
    while (this.won === false) {
      this.won = true;
    }

    this.winner();
  }

  getMove(e) {
    let y = e.offsetX;
    let x = e.offsetY;

    let pos = [];
    if (y > 0 && y < 80) {
      pos.push(0)
    } else if (y >= 80 && y < 160) {
      pos.push(1);
    } else if (y >= 160 && y < 240) {
      pos.push(2);
    } else if (y >= 240 && y < 320) {
      pos.push(3);
    } else if (y >= 320 && y < 400) {
      pos.push(4);
    } else {
      pos.push(5);
    };

    if (x > 0 && x < 80) {
      pos.push(0)
    } else if (x >= 80 && x < 160) {
      pos.push(1);
    } else if (x >= 160 && x < 240) {
      pos.push(2);
    } else if (x >= 240 && x < 320) {
      pos.push(3);
    } else if (x >= 320 && x < 400) {
      pos.push(4);
    } else {
      pos.push(5);
    };

    return pos;
  }

  handleMove (e) {
    if (this.prevMove) {
      let fromMove = this.prevMove;
      let toMove = this.getMove(e);
      this.board.moveVeggie(fromMove, toMove);
      this.prevMove = false;
    } else {
      this.prevMove = this.getMove(e);
    }
  }
  
  winner() {
    console.log('You won');
  }

}


export default Game;
