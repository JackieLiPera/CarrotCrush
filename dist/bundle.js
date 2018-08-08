/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/carrotcrush.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/board.js":
/*!**********************!*\
  !*** ./lib/board.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _fruit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fruit */ "./lib/fruit.js");
/* harmony import */ var _empty_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty_space */ "./lib/empty_space.js");




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
        this.grid[i][j] = new _fruit__WEBPACK_IMPORTED_MODULE_0__["default"]([i, j], false);
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
          if (this.possibleStreak()) {
            this.findAndRemoveStreaks();
          } else {
            this.swap(toMove, fromMove);
          }
        }
       , 500)
    } else {
      const fruit1 = this.grid[fromMove[0]][fromMove[1]];
      const fruit2 = this.grid[toMove[0]][toMove[1]];
      fruit1.shaking = true;
      fruit2.shaking = true;
      setInterval(fruit1.shake(this.ctx), 500);
      setInterval(fruit2.shake(this.ctx), 500);
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
    if (vertStreak || horzStreak) {
      this.possibleMove = true;
      return true
    } else {
      return false;
    }
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
            return vertStreak;
          } else {
            vertStreak = [[i, j]];
          }
        }
      }


      if (vertStreak.length >= 3) {
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
            return horzStreak;
          } else {
            horzStreak = [[i, j]];
          }
        }
      }

      if (horzStreak.length >= 3) {
        return horzStreak;
      } else {
        horzStreak = [];
      }
    }
  }

  eliminateStreak(streak) {
    this.determinePoints(streak);

    for (let i = 0; i < streak.length; i++) {
      const pos = streak[i]
      this.grid[pos[0]][pos[1]] = new _empty_space__WEBPACK_IMPORTED_MODULE_1__["default"]([pos[0], pos[1]]);
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
          this.grid[i][j] = new _fruit__WEBPACK_IMPORTED_MODULE_0__["default"]([i, j], true);

        }
      }
    }
  }

  determinePoints(streak) {
    const firstPos = streak[0];
    const fruitType = this.grid[firstPos[0]][firstPos[1]].type;

    for (let i = 0; i < streak.length; i++) {
      if (fruitType === 'carrot') {
        this.score += 200;
      } else {
        this.score += 100;
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
        item.shake(this.ctx);
      });
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Board);


/***/ }),

/***/ "./lib/carrotcrush.js":
/*!****************************!*\
  !*** ./lib/carrotcrush.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./lib/game.js");


document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  const ctx = canvasEl.getContext("2d");
  new _game__WEBPACK_IMPORTED_MODULE_0__["default"](ctx).start();
});


/***/ }),

/***/ "./lib/empty_space.js":
/*!****************************!*\
  !*** ./lib/empty_space.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class EmptySpace {
  constructor(pos) {
    this.type = 'empty';
    this.pos = pos;
    this.vel = 0;
    this.falling = false;
    this.ypos = (pos[1] * 80);
    this.xpos = (pos[0] * 80);
  }

  setNewPos(pos) {
    this.pos[0] = pos[0];
    this.pos[1] = pos[1];
    this.xpos = (pos[0] * 80);
    this.ypos = (pos[1] * 80);
  }

  createImage() {
    let img = new Image();
    img.src = './images/emptyspace.png';
    img.xpos = this.xpos;
    img.ypos = this.ypos;
    return img;
  }

  draw(ctx) {
    let image = this.createImage();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
  }

  move() {}
  shake() {}
}

/* harmony default export */ __webpack_exports__["default"] = (EmptySpace);


/***/ }),

/***/ "./lib/fruit.js":
/*!**********************!*\
  !*** ./lib/fruit.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DEFAULT = {
  TYPE: [
    "carrot",
    "blueberry",
    "kiwi",
    "pineapple",
    "strawberry",
    "banana"]
}

const ICONS = {
  carrot: './images/carrot.png',
  blueberry: './images/blueberry.png',
  pineapple: './images/pineapple-icon.png',
  banana: './images/banana.png',
  strawberry: './images/strawberry-icon.png',
  kiwi: './images/kiwi-icon.png'
}


class Fruit {
  constructor(pos, falling) {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];;
    this.pos = pos;
    this.yvel = 0;
    this.xvel = 0;
    this.falling = falling;
    this.shaking = false;
    this.xpos = pos[0] * 80;
    this.ypos = (pos[1] - 5) * 80;
    this.nextYpos = null;
    this.oldXpos = null;
    this.oldYpos = null;
    this.newXpos = null;
    this.newYpos = null;
    this.move = this.move.bind(this);
  }

  setNewPos(pos, oldY) {
    this.pos = pos;
    this.nextYpos = ((pos[1] - 5) * 80);
  }

  setTempPos(pos, oldX, oldY) {
    this.oldXpos = (oldX * 80);
    this.oldYpos = ((oldY - 5) * 80);
    this.newXpos = (pos[0] * 80);
    this.newYpos = ((pos[1] - 5) * 80);
  }

  createImage() {
    let img = new Image();
    img.src = ICONS[this.type];
    img.xpos = this.xpos;
    img.ypos = this.ypos;
    return img;
  }


  draw(ctx) {
    let image = this.createImage();
    ctx.save();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
    ctx.restore();
  }

  move() {
    this.ypos += this.yvel;
    this.xpos += this.xvel;

    if (this.falling) {
      if (this.ypos >= this.nextYpos) {
        this.falling = false;
        this.yvel = 0;
      } else {
        this.yvel = ((this.nextYpos - this.ypos) / 60) * 10;
      }
    } else {
      this.yvel = 0;
    }

    if (this.swapping) {
      if (this.oldXpos > this.newXpos) {
        this.xvel = -(80 / 60) * 5;
        this.yvel = 0;

        if(this.xpos <= this.newXpos) {
          this.xvel = 0;
          this.swapping = false;
        }
      } else if (this.oldXpos < this.newXpos) {
        this.xvel = (80/60) * 5;
        this.yvel = 0;

        if(this.xpos >= this.newXpos) {
          this.xvel = 0;
          this.swapping = false;
        }
      } else {
        this.xvel = 0;
      }

      if (this.oldYpos > this.newYpos) {
        this.yvel = -(80 / 60) * 5;
        this.xvel = 0;

        if(this.ypos <= this.newYpos) {
          this.yvel = 0;
          this.swapping = false;
        }
      } else if (this.oldYpos < this.newYpos) {
        this.yvel = (80/60) * 5;
        this.xvel = 0;

        if(this.ypos >= this.newYpos) {
          this.yvel = 0;
          this.swapping = false;
        }
      } else {
        this.yvel = 0;
      }

    }
  }

  shake(ctx) {
    // if (this.shaking) {
    //   const delta = Math.floor(Math.random() * 2);
    //   this.ypos += delta;
    //   this.xpos += delta;
    // }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Fruit);


/***/ }),

/***/ "./lib/game.js":
/*!*********************!*\
  !*** ./lib/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");


class Game {
  constructor(ctx) {
    this.objectiveScore = 2500;
    this.movesLeft = 5;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
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
      this.movesLeft -= 1;
      $(".moves-left").text(`${this.movesLeft}`);


      this.prevMove = false;
      setTimeout(() => { this.checkWon(); }, 500)
    } else {
      this.prevMove = this.getMove(e);
    }
  }

  gameOver() {
    this.movesLeft = 0;
    
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


/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map