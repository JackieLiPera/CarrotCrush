import Board from './board';

class Game {
  constructor(ctx) {
    this.objectiveScore = 2000;
    this.movesLeft = 5;
    this.board = new Board(ctx);
    this.prevMove = null;
    this.winner = false;
    this.getMove = this.getMove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.openRules = this.openRules.bind(this);
    // this.winner = this.winner.bind(this);
    // this.loser = this.loser.bind(this);

    $("#canvas").on('click', this.handleMove);
    $(".target-score").text(`Target: ${this.objectiveScore}`);
    $(".modal").hide();
    $(".rules-cog").on("click", this.openRules)
  }

  start() {
    this.board.draw();
    this.movesLeft = 5;
    this.board.score = 0;
    $(".moves-left").text(`${this.movesLeft}`);
  }


  checkWon() {
    if (this.movesLeft > 0 && this.board.score >= this.objectiveScore ) {
      this.winner = true;
      this.gameOver();
    } else if (this.movesLeft === 0 && this.board.score !== this.objectiveScore) {
      this.gameOver();
    } else if (this.movesLeft === 0 && this.board.score === this.objectiveScore) {
      this.winner = true;
      this.gameOver();
    } else {
      return null;
    }
  }

  getMove(e) {
    let x = e.offsetX;
    let y = e.offsetY;

    let pos = [];
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

    if (y > 0 && y < 80) {
      pos.push(5)
    } else if (y >= 80 && y < 160) {
      pos.push(6);
    } else if (y >= 160 && y < 240) {
      pos.push(7);
    } else if (y >= 240 && y < 320) {
      pos.push(8);
    } else if (y >= 320 && y < 400) {
      pos.push(9);
    } else {
      pos.push(10);
    };

    return pos;
  }

  handleMove (e) {
    if (this.prevMove) {
      let fromMove = this.prevMove;
      let toMove = this.getMove(e);

      this.board.moveFruit(fromMove, toMove);
      this.movesLeft -= 1;
      $(".moves-left").text(`${this.movesLeft}`);
      this.prevMove = false;
      this.checkWon();
    } else {
      this.prevMove = this.getMove(e);
    }
  }

  gameOver() {
    this.movesLeft = 0;

    if (this.winner) {
      this.winner();
      this.start();
    } else {
      this.loser();
      this.start();
    }
  }

  openRules() {
    $(".modal-rules").show();
    $('.modal').show();
  }

  winner() {
    $(".modal-winner").show();
  }

  loser() {
    $(".modal-loser").show();
  }
}


export default Game;
