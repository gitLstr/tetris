import "../../css/tetris.css";

export default function DisplayScore({score}) {
  return (
    <div className="box">
      <p>Score: {score}</p>
    </div>
  )
}