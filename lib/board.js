import Fruit from './fruit';
import EmptySpace from './empty_space';


class Board {
  constructor(ctx) {
    this.grid = new Array(6);
    for (let i = 0; i < this.grid.length; i ++) {
      this.grid[i] = (new Array(11))
    }
    this.score = 0;
    this.ctx = ctx;
    this.draw = this.draw.bind(this);
    this.falling = [];
    this.populate();
  }

  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let pos = [i, j]
        this.grid[i][j] = new Fruit([i, j], false);
      }
    }

    this.findAndRemoveStreaks();
  }

  isValidMove(fromMove, toMove) {
    const col1 = fromMove[0];
    const col2 = toMove[0];
    const row1 = fromMove[1];
    const row2 = toMove[1];
    const lastCol = (this.grid.length - 1);
    const lastRow = (this.grid[0].length - 1);
    if ((col1 === 0) && (col2 !== 0 && col2 !== 1)) {
      return false;
    } else if ((col1 === lastCol) && (col2 !== col1 - 1) && (col2 !== lastCol)) {
      return false;
    } else if ((row1 === 5) && (row2 !== row1 + 1) && (row2 !== 5)) {
      return false;
    } else if ((row1 === lastRow) && (row2 !== row1 - 1) && (row2 !== lastRow)) {
      return false;
    } else if ((col2 < col1 - 1) || (col2 > col1 + 1)) {
      return false;
    } else if ((row2 < row1 - 1) || (row2 > row1 + 1)) {
      return false;
    } else {
      return true;
    }
  }

  moveFruit(fromMove, toMove) {
    if (this.isValidMove(fromMove, toMove)) {
        this.swap(fromMove, toMove);
        setTimeout(() => {
          debugger
          if (this.possibleStreak()) {
            this.findAndRemoveStreaks();
          } else {
            this.swap(toMove, fromMove);
          }
        }
       , 1000)
    } else {
      const fruit1 = this.grid[fromMove[0]][fromMove[1]];
      const fruit2 = this.grid[toMove[0]][toMove[1]];
      fruit1.shaking = true;
      fruit2.shaking = true;
      setInterval(fruit1.shake(), 500);
      setInterval(fruit2.shake(), 500);
    }
  }

  swap(pos1, pos2) {
    const c1 = pos1[0], r1 = pos1[1], c2 = pos2[0], r2 = pos2[1];
    const fruit1 = this.grid[c1][r1];
    const fruit2 = this.grid[c2][r2];
    this.grid[c2][r2] = fruit1;
    this.grid[c1][r1] = fruit2;
    fruit1.setTempPos([c2, r2], c1, r1);
    fruit2.setTempPos([c1, r1], c2, r2);
    fruit1.swapping = true;
    fruit2.swapping = true;
  }

  shifting(pos1, pos2) {
    const c1 = pos1[0], r1 = pos1[1], c2 = pos2[0], r2 = pos2[1];
    const fruit1 = this.grid[c1][r1];
    const fruit2 = this.grid[c2][r2];
    this.grid[c2][r2] = fruit1;
    this.grid[c1][r1] = fruit2;
    fruit1.setNewPos([c2, r2], r1);
    fruit2.setNewPos([c1, r1], r2);
  }

  possibleStreak() {
    const vertStreak = this.verticalCheck();
    const horzStreak = this.horizontalCheck();
    debugger
    return (vertStreak || horzStreak);
  }

  findAndRemoveStreaks() {
    let vertStreak = this.verticalCheck();
    let horzStreak = this.horizontalCheck();

    while (vertStreak || horzStreak) {
      if (vertStreak) this.eliminateStreak(vertStreak);
      if (horzStreak) this.eliminateStreak(horzStreak);
      vertStreak = this.verticalCheck();
      horzStreak = this.horizontalCheck();
    }
  }

  verticalCheck() {
    let vertStreak = [];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 5; j < this.grid[0].length; j++) {
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
            this.determinePoints(vertStreak);
            return vertStreak;
          } else {
            vertStreak = [currFruit.pos];
          }
        }
      }


      if (vertStreak.length >= 3) {
        this.determinePoints(vertStreak);
        return vertStreak;
      } else {
        vertStreak = [];
      }
    }
  }

  horizontalCheck() {
    let horzStreak = [];
    for (let j = 5; j < this.grid[0].length; j++) {
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
            this.determinePoints(horzStreak);
            return horzStreak;
          } else {
            horzStreak = [currFruit.pos];
          }
        }
      }

      if (horzStreak.length >= 3) {
        this.determinePoints(horzStreak);
        return horzStreak;
      } else {
        horzStreak = [];
      }
    }
  }

  eliminateStreak(streak) {
    for (let i = 0; i < streak.length; i++) {
      const pos = streak[i]
      this.grid[pos[0]][pos[1]] = new EmptySpace([pos[0], pos[1]]);
    }

    this.shift();
  }

  shift() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = this.grid[i].length - 1; j > 0; j--) {

        const currentFruit = this.grid[i][j];

        if (currentFruit.type === 'empty') {
          for (let k = j - 1; k >= 0; k--) {
            const nextFruit = this.grid[i][k];
            if (nextFruit.type !== 'empty') {
              this.shifting([i, j], [i, k]);
              nextFruit.falling = true;
              k = -1;
            }
          }
        }
      }

    }

    this.addMoreFruit();
  }

  addMoreFruit() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < 5; j++) {
        if (this.grid[i][j].type === 'empty') {
          this.grid[i][j] = new Fruit([i, j], true);

        }
      }
    }
  }

  determinePoints(streak) {
    for (let i = 0; i < streak.length; i++) {
      const pos = streak[i];
      const fruitType = this.grid[pos[0]][pos[1]].type;
      if (fruitType === 'carrot') {
        this.score += 100;
      } else {
        this.score += 50;
      }
    }
  }

  draw() {
    $(".player-score").text(`${this.score}`);
    this.ctx.clearRect(0, 0, this.ctx.height, this.ctx.width);
    requestAnimationFrame(this.draw);

    let items = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 5; j < this.grid[i].length; j++) {
        let item = this.grid[i][j];
        item.draw(this.ctx);
        items.push(item);
      }
    }

    if (items.length === 36) {
      items.forEach ((item) => {
        item.move();
        item.shake();
      });
    }
  }
}


export default Board;
