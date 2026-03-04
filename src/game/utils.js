import { BOARD_WIDTH, BOARD_HEIGHT, PIECE_TYPES, TETROMINOS } from "./constants";

export const createBoard = (width = BOARD_WIDTH, height = BOARD_HEIGHT) =>
    Array.from({ length: height }, () =>
        Array(width).fill(0)
);

export const randomPiece = (TETROMINOS) => {
    const type = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];

    return {
        type,
        shape: TETROMINOS[type],
        x: Math.floor(BOARD_WIDTH / 2) - 1,
        y: 0,
    };
};

export const advanceQueue = (queue) => {
  const [nextPiece, ...rest] = queue;
  const newQueue = [...rest, randomPiece(TETROMINOS)];
  return { nextPiece, newQueue };
};


export const drawPiece = (board, piece, isGhost = false) => {
    const { shape, x, y, type } = piece;
    const newBoard = board.map(row => [...row]);

    const height = newBoard.length;
    const width = newBoard[0].length;

    shape.forEach((row, i) =>
        row.forEach((cell, j) => {
            if (
                cell &&
                y + i >= 0 &&
                y + i < height &&
                x + j >= 0 &&
                x + j < width
            ) {
                if (isGhost && newBoard[y + i][x + j]) return;

                newBoard[y + i][x + j] = isGhost
                    ? `${type}_ghost`
                    : type;
            }
        })
    );

    return newBoard;
};

export const getGhostPiece = (piece, board) => {
    let ghost = { ...piece };

    while (
        !checkCollision(
        { ...ghost, y: ghost.y + 1 },
        board
        )
    ) {
        ghost.y += 1;
    }

    return ghost;
};

export const checkCollision = (piece, board) => {
    for (let i = 0; i < piece.shape.length; i++) {
        for (let j = 0; j < piece.shape[i].length; j++) {
        if (piece.shape[i][j]) {
            const y = piece.y + i;
            const x = piece.x + j;

            if (x < 0 || x >= BOARD_WIDTH || y >= BOARD_HEIGHT) return true;

            if (y >= 0 && board[y][x] && PIECE_TYPES.includes(board[y][x])) {
            return true;
            }
        }
        }
    }
    return false;
};

export const rotate = (shape) =>
    shape[0].map((_, i) =>
        shape.map(row => row[i]).reverse()
    );

export const clearRows = (board) => {
  const filtered = board.filter(row => row.some(cell => cell === 0));
  const rowsCleared = BOARD_HEIGHT - filtered.length;
  const newRows = Array.from({ length: rowsCleared }, () => Array(BOARD_WIDTH).fill(0));
  return {
    newBoard: [...newRows, ...filtered],
    rowsCleared
  };
};