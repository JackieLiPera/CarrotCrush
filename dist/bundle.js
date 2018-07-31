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

/***/ "./lib/animation.js":
/*!**************************!*\
  !*** ./lib/animation.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _empty_space__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./empty_space */ "./lib/empty_space.js");


const Animation = {

  // preShake(ctx) {
  //   ctx.save();
  //   let dx = Math.random() * 10;
  //   let dy = Math.random() * 10;
  //   ctx.translate(dx, dy);
  // },
  //
  // postShake(ctx) {
  //   ctx.restore();
  // },
  //
  // shake(ctx, board) {
  //   ctx.clearRect(0, 0, 480, 480);
  //   Animation.preShake(ctx);
  //   board.redraw(ctx);
  //   Animation.postShake(ctx);
  //   requestAnimationFrame(Animation.shake(ctx, board));
  // },

//
  // swap(x1, x2, y1, y2, ctx, board) {
  //   return  () => {
  //     let shiftx = x1 - x2;
  //     let shifty = y1 - y2;
  //
  //
  //     let dx;
  //     if (x1 > x2) {
  //       dx = -2;
  //     } else if (x1 < x2) {
  //       dx = 2;
  //     } else {
  //       dx = 0;
  //     }
  //
  //     let dy;
  //     if (y1 > y2) {
  //       dy = -2;
  //     } else if (y1 < y2) {
  //       dy = 2;
  //     } else {
  //       dy = 0;
  //     }
  //
  //
  //
  //
  //     if (dx === 0 && dy === 0) {
  //       return;
  //     }
  //
  //     x1 += dx;
  //     y1 += dy;
  //     x2 -= dx;
  //     y2 -= dy;
  //
  //     ctx.beginPath();
  //     ctx.save()
  //     ctx.translate((dx), (dy));
  //     board.redraw(x1, oldXPos, y1, oldYPos, ctx);
  //     ctx.restore();
  //     requestAnimationFrame(Animation.swap(x1, x2, y1, y2, ctx, board));
  //   }
  // }


  shift(base, dy, ctx) {
    if (dy >= base) {
      return;
    }

    dy += (dy / 60);
    ctx.save();
    ctx.beginPath();
    ctx.translate(0, (dy / 60));
    ctx.restore();
    requestAnimationFrame(Animation.shift(base, dy, ctx));
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Animation);


/***/ }),

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
/* harmony import */ var _utility__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utility */ "./lib/utility.js");
/* harmony import */ var _animation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./animation */ "./lib/animation.js");





class Board {
  constructor(ctx) {
    this.grid = new Array(6);
    for (let i = 0; i < this.grid.length; i ++) {
      this.grid[i] = (new Array(6))
    }
    this.populate();
    this.ctx = ctx;
    this.score = 0;
    this.shift = this.shift.bind(this);
    this.draw = this.draw.bind(this);
  }

  populate() { // returns populated grid
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        let pos = [i, j]
        this.grid[i][j] = new _fruit__WEBPACK_IMPORTED_MODULE_0__["default"](pos);
      }
    }
    return this.grid;
  }

  isValidMove(fromMove, toMove) { // returns a boolean
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

  moveFruit(fromMove, toMove) { // too coupled?
    if (this.isValidMove(fromMove, toMove)) {
      let firstVeg = this.grid[fromMove[0]][fromMove[1]];
      let secondVeg = this.grid[toMove[0]][toMove[1]];

      this.grid[toMove[0]][toMove[1]] = firstVeg;
      this.grid[fromMove[0]][fromMove[1]] = secondVeg;

      if (this.foundStreak()) {
        this.getStreak();
      } else {
        this.grid[toMove[0]][toMove[1]] = secondVeg;
        this.grid[fromMove[0]][fromMove[1]] = firstVeg;
      }
    } else {
        alert('Invalid move')
    }
  }

  foundStreak() { // returns a boolean
    let check1 = this.verticalCheck(this.grid);
    let transGrid = _utility__WEBPACK_IMPORTED_MODULE_2__["default"].transpose(this.grid);
    let check2 = this.horizontalCheck(transGrid);

    return (check1 || check2);
  }

  getStreak() {
    let streak;
    if (this.verticalCheck(this.grid)) {
      streak = this.verticalCheck(this.grid);
      this.eliminateStreak(streak);
    }

    let transGrid = _utility__WEBPACK_IMPORTED_MODULE_2__["default"].transpose(this.grid);
    if (this.horizontalCheck(transGrid)) {
      streak = this.horizontalCheck(transGrid);
      this.eliminateStreak(streak);
    }
  }

  verticalCheck(grid) { // returns positions of a single streak
    let currentStreak = [];

    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 1; j < grid.length; j++) {

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }

        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (grid[i][j].type !== grid[i][(j - 1)].type) {

            if (currentStreak.length >= 3) {
              this.score += 50;
              $(".player-score").text(this.score);
              return currentStreak;
            }

            currentStreak = [];
          }
        }

        if (j === grid.length - 1) {
          if (currentStreak.length >= 3) {
            this.score += 50;
            $(".player-score").text(this.score);
            return currentStreak;
          }
        }
      }
    }
  }

  horizontalCheck(grid) {
    let currentStreak = [];
    for (let i = 0 ; i < grid.length; i++) {
      for (let j = 1; j < grid.length; j++) {

        if (currentStreak.length === 0) {
          currentStreak.push([i, (j - 1)]);
        }
        if (grid[i][j].type === grid[i][(j - 1)].type){
          currentStreak.push([i, j]);
        } else {
          if (grid[i][j].type !== grid[i][(j - 1)].type) {

            if (currentStreak.length >= 3) {
              let reversedStreak = currentStreak.map ((pos) => {
                return [pos[1], pos[0]];
              });

              this.score += 50;
              $(".player-score").text(this.score);
              return reversedStreak;
            }

            currentStreak = [];
          }
        }

        if (j === grid.length - 1) {
          if (currentStreak.length >= 3) {
            let reversedStreak = currentStreak.map ((pos) => {
              return [pos[1], pos[0]]
            });

            this.score += 50;
            $(".player-score").text(this.score);
            return reversedStreak;
          }
        }
      }
    }
  }

  eliminateStreak(streak) {
    for (let i = 0; i < streak.length; i++) {
      let pos = streak[i]
      this.grid[pos[0]].splice(pos[1], 1, new _empty_space__WEBPACK_IMPORTED_MODULE_1__["default"]([pos[0], pos[1]]));
    }

    this.draw();
  }

  shift(streak) {

    // let col = streak[0][0];
    // let shiftedCol = this.grid[col];
    // let pos;
    // for (let i = 1; i < shiftedCol.length; i++) {
    //   if (shiftedCol[i].type === 'empty' && shiftedCol[i - 1].type !== 'empty') {
    //     pos = [(col), (i - 1)];
    //   }
    // }
    //
    // let lastFruit = streak[streak.length - 1][1];
    // let base = (lastFruit * 80);
    // let top = (pos[1] * 80);
    // let dy = Math.abs(top - base);

  }

  async initialRender() {
    let images = [];
    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        let fruit = this.grid[i][j];
        let fruitImg = fruit.createImage();
        images.push(fruitImg);
      }
    }

    images.forEach( (image) => {
      image.onload = () => {
        this.ctx.save();
        this.ctx.clearRect(image.xpos, image.ypos, 80, 80);
        this.ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
        this.ctx.restore();
      };
    });
  }

  async draw() {
    this.ctx.clearRect(0, 0, this.ctx.height, this.ctx.width);
    requestAnimationFrame(this.draw);

    for(let i = 0; i < this.grid.length; i++) {
      for(let j = 0; j < this.grid[i].length; j++) {
        debugger
        let item = this.grid[i][j]
        item.draw(this.ctx);
      }
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
/* harmony import */ var _game_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_view */ "./lib/game_view.js");



document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  const ctx = canvasEl.getContext("2d");
  new _game_view__WEBPACK_IMPORTED_MODULE_1__["default"](ctx).start();
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
  }

  createImage() {
    let img = new Image();
    img.src = './images/emptyspace.png';
    img.xpos = (this.pos[0] * 80);
    img.ypos = (this.pos[1] * 80);
    return img;
  }

  draw(ctx) {
    let image = this.createImage();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
  }
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
  constructor(pos) {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];;
    this.pos = pos;
    this.vel = 0;
  }

  createImage() {
    let img = new Image();
    img.src = ICONS[this.type]
    img.xpos = (this.pos[0] * 80);
    img.ypos = (this.pos[1] * 80);
    return img;
  }

  shift() {

  }

  draw(ctx) {
    debugger
    let image = this.createImage();
    ctx.clearRect(image.xpos, image.ypos, 80, 80);
    ctx.drawImage(image, image.xpos, image.ypos, 80, 80);
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
  constructor(board) {
    this.objectiveScore = 1000;
    this.movesLeft = 5;
    this.board = board;
    this.prevMove = null;

    this.getMove = this.getMove.bind(this);
    this.handleMove = this.handleMove.bind(this);

    $("#canvas").on('click', this.handleMove);
    $(".target-score").text(`Target: ${this.objectiveScore}`);
    $(".moves-left").text(`${this.movesLeft}`);
  }

  play() {
  }

  checkWon() {
    if (this.movesLeft > 0 && this.board.score >= this.objectiveScore ) {
      alert('yerr')
    } else if (this.movesLeft === 0 && this.board.score !== this.objectiveScore) {
      alert('naa boi')
    } else if (this.movesLeft === 0 && this.board.score === this.objectiveScore) {
      alert('yerr')
    } else {
      return null;
    }
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

      this.board.moveFruit(fromMove, toMove);
      this.movesLeft -= 1;
      $(".moves-left").text(`${this.movesLeft}`);
      this.prevMove = false;
      this.checkWon();
    } else {
      this.prevMove = this.getMove(e);
    }
  }

}


/* harmony default export */ __webpack_exports__["default"] = (Game);


/***/ }),

/***/ "./lib/game_view.js":
/*!**************************!*\
  !*** ./lib/game_view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _board__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./board */ "./lib/board.js");
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game */ "./lib/game.js");



class GameView {
  constructor(ctx) {
    this.ctx = ctx;
    this.board = new _board__WEBPACK_IMPORTED_MODULE_0__["default"](ctx);
    this.game = new _game__WEBPACK_IMPORTED_MODULE_1__["default"](this.board);
  }

  start() {
    this.board.initialRender().then( () => {
      this.board.getStreak();
    });
    this.game.play();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/utility.js":
/*!************************!*\
  !*** ./lib/utility.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const Utility = {

  transpose(array) {
    return array[0].map((col, i) => array.map(row => row[i]));
  }

};

/* harmony default export */ __webpack_exports__["default"] = (Utility);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map