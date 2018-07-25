import Game from "./game";
import GameView from './game_view';

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  const ctx = canvasEl.getContext("2d");
  new GameView(ctx).start();
});
