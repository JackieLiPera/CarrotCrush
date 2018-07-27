import Fruit from './fruit';
import EmptySpace from './empty_space';

const icons = {
  carrot: './images/carrot.png',
  blueberry: './images/blueberry.png',
  pineapple: './images/pineapple-icon.png',
  banana: './images/banana.png',
  strawberry: './images/strawberry-icon.png',
  kiwi: './images/kiwi-icon.png',
  null: './images/emptyspace.png'
}

class Board {
  constructor(ctx) {
    this.icons = icons;
    this.ctx = ctx;
    this.grid = new Array(6);
      for (let i = 0; i < this.grid.length; i ++) {
        this.grid[i] = (new Array(6))
      }
    this.score = 0;
    this.populate();
  }

  transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
  }

  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Fruit();
      }
    }

    return this.grid;
  }

  draw(ctx) {
    let images = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        let img = new Image();
        let FruitType = this.grid[i][j].type;
        let source =  this.icons[FruitType];
        img.xpos = (i * 80);
        img.ypos = (j * 80);
        img.src = source;
        images.push(img)
      }
    }

    let numImages = 0;
    images.forEach( (image) => {
      image.onload = () => {
        ctx.save();
        ctx.clearRect(image.xpos, image.ypos, 80, 80);
        ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
        ctx.restore();

        numImages++;
        if (numImages === 36) {
          this.checkForStreaks();
        }
      };
    });
  }

  moveFruit(fromMove, toMove) {
    if (this.isValidMove(fromMove, toMove) === true) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;
      this.draw(this.ctx);
    } else {
      alert('Invalid move') // change this - create a shake animation?
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

  checkForStreaks() {
    this.verticalCheck(this.grid);
    let transGrid = this.transpose(this.grid);
    this.horizontalCheck(transGrid);
    $(".player-score").text(this.score);
  }

  verticalCheck(grid) {
    let currentStreak = [];

    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 1; j < grid.length; j++) {
        let checked = false;

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }

        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (grid[i][j].type !== grid[i][(j - 1)].type) {

            if (currentStreak.length >= 3) {
              this.score += 50;
              this.eliminateStreak(currentStreak);
            }

            currentStreak = [];
            checked = false;
          }
        }

        if (j === grid.length - 1) {
          if (currentStreak.length >= 3) {
            this.score += 50;
            this.eliminateStreak(currentStreak);
            currentStreak = [];
          }
        }
      }
    }
  }


  horizontalCheck(grid) {
    let currentStreak = [];

    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 1; j < grid.length; j++) {
        let checked = false;

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }
        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (grid[i][j].type !== grid[i][(j - 1)].type) {

            if (currentStreak.length >= 3) {
              let currentStreak2 = currentStreak.map ((pos) => {
                return [pos[1], pos[0]];
              });

              this.score += 50;
              this.eliminateStreak(currentStreak2);
            }

            currentStreak = [];
            checked = false;
          }
        }

        if (j === grid.length - 1) {
          checked = true;
        }

        if (checked) {
          if (currentStreak.length >= 3) {
            let currentStreak2 = currentStreak.map ((pos) => {
              return [pos[1], pos[0]]
            });

            this.score += 50;
            this.eliminateStreak(currentStreak2);
            currentStreak = [];
          }
        }
      }
    }
  }


  eliminateStreak(streak) {
    for (let i = 0; i < streak.length; i++) {
      let row = streak[i]
      this.grid[row[0]].splice(row[1], 1);
      this.grid[row[0]].unshift(new Fruit());
    }

    this.draw(this.ctx);
  }
}


export default Board;
