import Game from "./game";

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementsByTagName("canvas")[0];

  const ctx = canvasEl.getContext("2d");
  new Game(ctx).start();
});
