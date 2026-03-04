// src/components/Tetris.jsx

import { useState, useRef, useEffect, useCallback } from "react";
import "../../css/tetris.css";

import {
  TETROMINOS,
  COLORS
} from "../../game/constants";

import {
  createBoard,
  randomPiece,
  drawPiece,
  checkCollision,
  rotate,
  clearRows,
  getGhostPiece,
  advanceQueue
} from "../../game/utils";

import useClock from "../../hooks/useClock";
import Home from ".././Home";
import DisplayScore from "./DisplayScore";
import DisplayNextPiece from "./DisplayNextPiece";

export default function Tetris({ setScene , score, setScore}) {
    const [board, setBoard] = useState(createBoard());

    // Initialize queue and piece
    const initialQueue = Array.from({ length: 5 }, () => randomPiece(TETROMINOS));
    const { nextPiece, newQueue } = advanceQueue(initialQueue);

    const [piece, setPiece] = useState(nextPiece);
    const [pieceQueue, setQueue] = useState(newQueue);

    // Declare refs right after state
    const pieceRef = useRef(piece);
    const boardRef = useRef(board);


    useEffect(() => { pieceRef.current = piece; }, [piece]);
    useEffect(() => { boardRef.current = board; }, [board]);

    const lockPiece = useCallback(() => {
    // 1. Place current piece onto the board
    const newBoard = drawPiece(boardRef.current, pieceRef.current);
    //score
    const { newBoard: clearedBoard, rowsCleared} = clearRows(newBoard);
    if (rowsCleared > 0) {
        setScore(prev => prev + rowsCleared * 10);
    }
    setBoard(clearedBoard);

    // 2. Advance the queue
    setQueue(prevQueue => {
        const { nextPiece, newQueue } = advanceQueue(prevQueue);

        // 3. Check for game over AFTER board is updated
        if (checkCollision(nextPiece, clearedBoard)) {
        setScene("gameover");
        return prevQueue; // keep queue unchanged
        }

        // 4. Update active piece
        pieceRef.current = nextPiece;
        setPiece(nextPiece);

        return newQueue;
    });
    }, [setScene]);


    const movePiece = (dx, dy) => {
        const newPiece = {
        ...pieceRef.current,
        x: pieceRef.current.x + dx,
        y: pieceRef.current.y + dy
        };

        if (!checkCollision(newPiece, boardRef.current)) {
        pieceRef.current = newPiece;
        setPiece(newPiece);
        return;
        }

        if (dy === 1) lockPiece();
    };

    const hardDrop = () => {
        let newPiece = { ...pieceRef.current };

        while (!checkCollision({ ...newPiece, y: newPiece.y + 1 }, boardRef.current)) {
        newPiece.y += 1;
        }

        pieceRef.current = newPiece;
        setPiece(newPiece);
        
        lockPiece();
    };

    const rotatePiece = () => {
        const rotatedShape = rotate(pieceRef.current.shape);
        let newPiece = { ...pieceRef.current, shape: rotatedShape };

          if (checkCollision(newPiece, boardRef.current)) {
            const shiftedLeft = { ...newPiece, x: newPiece.x - 1 };
            if (!checkCollision(shiftedLeft, boardRef.current)) {
                    newPiece = shiftedLeft;
            } else {
                const shiftedRight = { ...newPiece, x: newPiece.x + 1 };
                if (!checkCollision(shiftedRight, boardRef.current)) {
                    newPiece = shiftedRight;
                } else {
                    return; // Rotation not possible
                }
            }
        }
        pieceRef.current = newPiece;
        setPiece(newPiece);

    };

    const keysRef = useRef({});
    useEffect(() => {
        const handleKeyDown = (e) => {
            keysRef.current[e.key] = true;
            // instant actions
            if (e.key === "ArrowUp") rotatePiece();
            if (e.key === " ") hardDrop();
        };
        const handleKeyUp = (e) => {
            keysRef.current[e.key] = false;
        };
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []); 

    useClock(() => {
        movePiece(0, 1);
    }, 1000);

    useClock(() => {
        if (keysRef.current["ArrowLeft"]) {
            movePiece(-1, 0);
        }
        if (keysRef.current["ArrowRight"]) {
            movePiece(1, 0);
        }
        if (keysRef.current["ArrowDown"]) {
            movePiece(0, 1);
        }
    }, 80); // ~16fps input polling

    const ghostPiece = getGhostPiece(piece, board);
    let displayBoard = drawPiece(board, ghostPiece, true);
    displayBoard = drawPiece(displayBoard, piece);

    return (
        <div className="tetris-container">
            <div className="sidebar-left"> 
                <DisplayScore score={score}/>
                <div className="back-button">
                    <button onClick={() => setScene("home")}>Back</button>
                </div>
            </div>
            <div className="board">
                {displayBoard.flat().map((cell, idx) => (
                <div
                    key={idx}
                    className={`cell ${
                        cell
                        ? cell.includes("_ghost")
                            ? "ghost"
                            : "filled"
                        : ""
                    }`}
                    style={
                        cell
                        ? { "--base": COLORS[cell.replace("_ghost", "")] }
                        : undefined
                    }
                    />
                ))}
            </div>

            <div className="sidebar">
                <DisplayNextPiece queue={pieceQueue}/>
            </div>
        </div>
    );
}