export default function GameOver({setScene, score}) {
  return (
    <div>
      <h1>Game Over!</h1>
      <h1>Score: {score}</h1>
      <button onClick={() => setScene("tetris")}>Play Again</button>
      <button onClick={() => setScene("home")}>Main Menu</button>
    </div>
  )
}