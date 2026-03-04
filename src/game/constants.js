// src/game/constants.js

export const BOARD_WIDTH = 10;
export const BOARD_HEIGHT = 20;

export const PIECE_TYPES = ["I","O","T","S","Z","J","L"];

export const TETROMINOS = {
  I: [[0,1,0,0], [0,1,0,0], [0,1,0,0], [0,1,0,0]],
  O: [[1,1],[1,1]],
  T: [[0,1,0],[1,1,1]],
  S: [[0,1,1],[1,1,0]],
  Z: [[1,1,0],[0,1,1]],
  J: [[1,0,0],[1,1,1]],
  L: [[0,0,1],[1,1,1]],
};

export const COLORS = {
  I: "cyan",
  O: "yellow",
  T: "purple",
  S: "green",
  Z: "red",
  J: "blue",
  L: "orange",
};