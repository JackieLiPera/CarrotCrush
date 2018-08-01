import Fruit from './fruit';
import EmptySpace from './empty_space';


class Board {
  constructor(ctx) {
    this.grid = new Array(6);
    for (let i = 0; i < this.grid.length; i ++) {
      this.grid[i] = (new Array(9))
    }
    this.populate();
    this.ctx = ctx;
    this.score = 0;
    this.shift = this.shift.bind(this);
    this.draw = this.draw.bind(this);
    this.falling = [];
    $(".player-score").text(this.score);
  }

  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let pos = [i, j]
        this.grid[i][j] = new Fruit([i, j]);
      }
    }

    while (this.findAndRemoveStreaks()) {

    }
  }

  isValidMove(fromMove, toMove) {
    let xPos1 = fromMove[0];
    let xPos2 = toMove[0];
    let yPos1 = fromMove[1];
    let yPos2 = toMove[1];

    if ((xPos1 === 0) && (xPos2 !== 0 && xPos2 !== 1)) {
      return false;
    } else if ((xPos1 === this.grid.length) && (xPos2 !== xPos1 - 1) && (xPos2 !== this.grid.length)) {
      return false;
    } else if ((yPos1 === 0) && (yPos2 !== yPos1 + 1) && (yPos2 !== 0)) {
      return false;
    } else if ((yPos1 === this.grid.length) && (yPos2 !== yPos1 - 1) && (yPos2 !== this.grid.length)) {
      return false;
    } else if ((xPos2 < (xPos1 - 1)) || (xPos2 > xPos1 + 1)) {
      return false;
    } else if ((yPos2 < yPos1 - 1) || (yPos2 > yPos1 + 1)) {
      return false;
    } else {
      return true;
    }
  }

  moveFruit(fromMove, toMove) {
    if (this.isValidMove(fromMove, toMove)) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;
      debugger
      if (!this.findAndRemoveStreaks()) {
        this.grid[toMove[0]][toMove[1]] = secondVeg;
        this.grid[fromMove[0]][fromMove[1]] = firstVeg;
      }
    } else {
        alert('Invalid move')
    }
  }

  findAndRemoveStreaks() {
    let foundStreak = false;
    let vertStreak = this.verticalCheck();
    let horzStreak = this.horizontalCheck();
    debugger
    while (vertStreak || horzStreak) {
      if (vertStreak) this.eliminateStreak(vertStreak);
      if (horzStreak) this.eliminateStreak(horzStreak);
      vertStreak = this.verticalCheck();
      horzStreak = this.horizontalCheck();
      foundStreak = true;
    }
    debugger
    return foundStreak;
  }

  verticalCheck() {
    let vertStreak = [];
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 3; j < this.grid[0].length; j++) {
        const streakLength = vertStreak.length;
        const currFruit = this.grid[i][j];
        if (streakLength === 0 && currFruit.type !== 'empty') {
          vertStreak.push([i, j]);
        } else {
          const lastPos = vertStreak[streakLength - 1];
          const lastFruitType = this.grid[lastPos[0]][lastPos[1]].type;
          if (lastFruitType === currFruit.type) {
            vertStreak.push([i, j]);
          } else if (streakLength >= 3) {
            this.score += 50;
            return vertStreak;
          } else {
            vertStreak = [];
          }
        }
      }
      if (vertStreak.length >= 3) {
        this.score += 50;
        return vertStreak;
      } else {
        vertStreak = [];
      }
    }

    $(".player-score").text(this.score);
  }

  horizontalCheck() {
    let horzStreak = [];
    for (let j = 3; j < this.grid[0].length; j++) {
      for (let i = 0; i < this.grid.length; i++) {
        const streakLength = horzStreak.length;
        const currFruit = this.grid[i][j];

        if (streakLength === 0 && currFruit.type !== 'empty') {
          horzStreak.push([i, j]);
        } else {
          const lastPos = horzStreak[streakLength - 1];
          const lastFruitType = this.grid[lastPos[0]][lastPos[1]].type;
          if (lastFruitType === currFruit.type) {
            horzStreak.push([i, j]);
          } else if (streakLength >= 3) {
            this.score += 50;
            return horzStreak;
          } else {
            horzStreak = [];
          }
        }
      }
      if (horzStreak.length >= 3) {
        this.score += 50;

        return horzStreak;
      } else {
        horzStreak = [];
      }
    }
    $(".player-score").text(this.score);
  }

  eliminateStreak(streak) {
    debugger
    for (let i = 0; i < streak.length; i++) {
      const pos = streak[i]
      this.grid[pos[0]][pos[1]] = new EmptySpace([pos[0], pos[1]]);
    }
    debugger
    this.shift();
  }

  shift() {
    debugger
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 3; j < this.grid[i].length; j++) {
        let column = this.grid[i];
        let currentItem = this.grid[i][j];

        if (currentItem.type === 'empty') {
          for (let k = j; k - 1 >= 0; k--) {
            const shiftingFruit = this.grid[i][k - 1];
            shiftingFruit.falling = true;
            shiftingFruit.lastYpos = [i, (k - 1)];
            shiftingFruit.setPos([i, k]);
            this.grid[i][k] = shiftingFruit;
          }
        }
      }
    }
  }


  draw() {
    this.ctx.clearRect(0, 0, this.ctx.height, this.ctx.width);
    requestAnimationFrame(this.draw);

    let items = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 3; j < this.grid[i].length; j++) {
        let item = this.grid[i][j];
        item.draw(this.ctx);

        items.push(item);
      }
    }

    if (items.length >= 36) {
      items.forEach ((item) => {
        item.move();
      });
    }
  }
}


export default Board;
