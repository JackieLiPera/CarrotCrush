import Veggie from './veggie';

const icons = {
  carrot: './images/carrot.ico',
  tomato: './images/tomato.png',
  cucumber: './images/cucumber.png',
  potato: './images/potato.png',
  raddish: './images/raddish.png',
  broccoli: './images/broccoli.png'
}

class Board {
  constructor(ctx) {
    this.icons = icons;
    this.ctx = ctx;
    this.grid = new Array(6);
      for (let i = 0; i < this.grid.length; i ++) {
        this.grid[i] = (new Array(6))
      }
    this.populate();
    this.score = 0;
    this.populate = this.populate.bind(this);
    this.moveVeggie = this.moveVeggie.bind(this);
    this.isValidMove = this.isValidMove.bind(this);
    this.checkForStreaks = this.checkForStreaks.bind(this);
    this.eliminateStreaks = this.eliminateStreaks.bind(this);
    this.draw = this.draw.bind(this);
  }


  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new Veggie();
      }
    }

    return this.grid;
  }

  draw(ctx) {
    ctx.clearRect(0, 0, 480, 480)
    let images = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        let img = new Image();
        let veggieType = this.grid[i][j].type;
        let source =  this.icons[veggieType];
        img.xpos = (i * 80);
        img.ypos = (j * 80);
        img.src = source;
        images.push(img)
      }
    }

    let numImages = 0;
    images.forEach( (image) => {
      image.onload = () => {
        ctx.drawImage(image, image.xpos, image.ypos, 80, 80);

        numImages += 1;
        if (numImages === 36) {
          this.checkForStreaks();
        }
      }
    });
  }


  moveVeggie(fromMove, toMove) {
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
    let currentStreak = [];
    let horizontalStreaks = [];
    let verticalStreaks = [];
    let score = 0;

    //horizontal check
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 1; j < this.grid.length; j++) {
        let checked = false;


        if (currentStreak.length === 0) {
          currentStreak.push([(j - 1), i]);
        }

        if (j === this.grid.length - 1) {
          checked = true;
        } else if (this.grid[j][i].type === this.grid[(j - 1)][i].type) {
          currentStreak.push([j, i])
        } else {
          if (this.grid[j][i].type !== this.grid[(j - 1)][i].type) {
            if (currentStreak.length >= 3) {
              horizontalStreaks.push(currentStreak);
            }

            currentStreak = [];
            checked = false;
          }
        }

        if (checked) {
          currentStreak = [];
          score += (horizontalStreaks.length * 50);
          debugger
          this.eliminateStreaks(horizontalStreaks);
        }
      }
    }

    //vertical check
    for (let i = 0 ; i < this.grid.length; i++) {
      for (let j = 1; j < this.grid.length; j++) {
        let checked = false;

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }

        if (j === this.grid.length - 1) {
          checked = true;
        } else if (this.grid[i][j].type === this.grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (this.grid[i][j].type !== this.grid[i][(j - 1)].type) {
            if (currentStreak.length >= 3) {
              verticalStreaks.push(currentStreak);
            }

            currentStreak = [];
            checked = false;
          }
        }

        if (checked) {
          currentStreak = [];
          score += (verticalStreaks.length * 50);
          this.eliminateStreaks(verticalStreaks);
        }
      }
    }
  }


  eliminateStreaks(streaks) {
    if (streaks.length === 0){
      return null;
    }


    streaks.forEach ((streak) => {
      for (let i = 0; i < streak.length; i++) {
        let row = streak[i]

        this.grid[row[0]].splice(row[1], 1);
        this.grid[row[0]].unshift(null);
        // at this position - plug in an empty space class object
      }

      for (let i = 0; i < streak.length; i++) {
        let row = streak[i]
        this.grid[row[0]][0] = (new Veggie());
      }
    });

    this.checkForStreaks();
  }


}


export default Board;
