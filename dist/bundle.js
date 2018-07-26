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
/* harmony import */ var _veggie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./veggie */ "./lib/veggie.js");
/* harmony import */ var _empty_space__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./empty_space */ "./lib/empty_space.js");



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
  }


  populate() {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid.length; j++) {
        this.grid[i][j] = new _veggie__WEBPACK_IMPORTED_MODULE_0__["default"]();
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

        numImages++;
        if (numImages === 36) {
          this.checkForStreaks();
        }
      };
    })
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
          if (horizontalStreaks.length > 0) {
            debugger
            this.eliminateStreaks(horizontalStreaks);
          }
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
          if (verticalStreaks.length > 0) {
            debugger
            this.eliminateStreaks(verticalStreaks);
          }
        }
      }
    }

    this.score = score;
  }


  eliminateStreaks(streaks) {
    if (streaks.length === 0){
      return null;
    }
    debugger
    streaks.forEach ((streak) => {
      for (let i = 0; i < streak.length; i++) {
        let row = streak[i]

        this.grid[row[0]].splice(row[1], 1);
        this.grid[row[0]].unshift(new _empty_space__WEBPACK_IMPORTED_MODULE_1__["default"]());
        this.draw(this.ctx);
      }

      for (let i = 0; i < streak.length; i++) {
        let row = streak[i];
        this.grid[row[0]][0] = new _veggie__WEBPACK_IMPORTED_MODULE_0__["default"]();
      }
    });

    this.checkForStreaks();
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
  constructor() {
    this.type = 'null';
  }
}

/* harmony default export */ __webpack_exports__["default"] = (EmptySpace);


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
    this.movesLeft = 10;
    this.board = board;
    this.won = false;
    this.prevMove = null;
    this.getMove = this.getMove.bind(this);

    $("#canvas").on('click', this.handleMove);
    $(".target-score").text(`Target: ${this.objectiveScore}`);
    $(".moves-left").text(`${this.movesLeft}`);
    $(".player-score").text(this.board.score);
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
    this.board.draw(this.ctx);
    this.game.play();
  }
}

/* harmony default export */ __webpack_exports__["default"] = (GameView);


/***/ }),

/***/ "./lib/veggie.js":
/*!***********************!*\
  !*** ./lib/veggie.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const DEFAULT = {
  TYPE: [
    "carrot",
    "tomato",
    "broccoli",
    "cucumber",
    "raddish",
    "potato"]
}

class Veggie {
  constructor() {
    this.type = DEFAULT.TYPE[Math.floor(Math.random() * DEFAULT.TYPE.length)];
  }
}

/* harmony default export */ __webpack_exports__["default"] = (Veggie);


/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map