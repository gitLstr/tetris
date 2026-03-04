import "../../css/tetris.css";
import { createBoard, drawPiece } from "../../game/utils";
import { COLORS } from "../../game/constants";


export default function DisplayNextPiece({ queue }) {
  return (
    <div className="next-pieces">
      {queue.map((piece, idx) => {
        const previewBoard = createBoard(5, 5);
        const centeredPiece = { ...piece, x: 1, y: 1 };
        const boardWithPiece = drawPiece(previewBoard, centeredPiece);

        return (
          <div key={idx} className="next-box">
            {boardWithPiece.flat().map((cell, i) => (
              <div
                key={i}
                className={`cell ${cell ? "filled" : ""}`}
                style={cell ? { "--base": COLORS[cell] } : undefined}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
}