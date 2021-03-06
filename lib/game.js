import Board from './board';

class Game {
  constructor(canvas, ctx) {
    this.objectiveScore = 2500;
    this.movesLeft = 5;
    this.board = new Board(canvas, ctx);
    this.prevMove = null;
    this.winner = false;
    this.getMove = this.getMove.bind(this);
    this.handleMove = this.handleMove.bind(this);
    this.openRules = this.openRules.bind(this);
    this.won = this.won.bind(this);
    this.lost = this.lost.bind(this);
    this.start = this.start.bind(this);

    $("#canvas").on('click', this.handleMove);
    $(".target-score").text(`Target: ${this.objectiveScore}`);
    $(".modal").on('click', () => $(".modal").hide());
    $('.modal').hide();
    $(".rules-cog").on("click", this.openRules);

    if (!localStorage['highscore']) {
      $('.highscore').text(`High score: ${0}`)
    } else {
      $('.highscore').text(`High score: ${localStorage['highscore']}`)
    }
  }

  start() {
    this.winner = false;
    this.board.draw();
    this.board.populate();
    this.movesLeft = 5;
    this.board.score = 0;
    $(".moves-left").text(`${this.movesLeft}`);
  }


  checkWon() {
    if (this.movesLeft >= 0 && this.board.score >= this.objectiveScore ) {
      this.winner = true;
      this.gameOver();
    } else if (this.movesLeft === 0 && this.board.score < this.objectiveScore) {
      this.gameOver();
    } else if (this.movesLeft === 0 && this.board.score === this.objectiveScore) {
      this.winner = true;
      this.gameOver();
    } else {
      return null;
    }
  }

  getMove(e) {
    if (this.board.possibleMove === 'false') {
      this.board.populate();
    }

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

      if (this.board.isValidMove(fromMove, toMove)) {
        this.movesLeft -= 1;
      } else {
        this.movesLeft += 0;
      }
      $(".moves-left").text(`${this.movesLeft}`);


      this.prevMove = false;
      setTimeout(() => { this.checkWon(); }, 500)
    } else {
      this.prevMove = this.getMove(e);
    }
  }

  gameOver() {
    this.movesLeft = 0;

    let highscore = localStorage.getItem("highscore");

    if (!highscore) {
      localStorage.setItem("highscore", this.board.score);
    } else {
      if (this.board.score > Number(highscore)) {
        localStorage.setItem("highscore", this.board.score);
      }
    }


    if (this.winner) {
      this.won();
      $(".modal").on('click', this.start);
    } else {
      this.lost();
      $(".modal").on('click', this.start);
    }
  }

  openRules() {
    $('.modal').show();
    $(".modal-rules").show();
    $(".modal-winner").hide();
    $(".modal-loser").hide();
  }

  won() {
    $('.modal').show();
    $(".modal-winner").show();
    $(".modal-rules").hide();
    $(".modal-loser").hide();
  }

  lost() {
    $('.modal').show();
    $(".modal-loser").show();
    $(".modal-rules").hide();
    $(".modal-winner").hide();
  }
}


export default Game;
