import { useState, useEffect } from 'react'
import Home from './components/Home.jsx'
import Tetris from './components/Tetris/Tetris.jsx'
import GameOver from './components/GameOver.jsx'
import './css/App.css'

export default function App() {
  const [scene, setScene] = useState("home")
  const [text, setText] = useState("World")
  const [score, setScore] = useState(0)
  useEffect(() => {
    if (scene === "home") setText("Home")
    if (scene === "tetris") {
      setScore(0);
    }
    if (scene === "gameover") setText("Game Over")
  }, [scene])

  return (
    <>
    <div>
      {scene === "home" && <Home setScene={setScene} text={text} />}
      {scene === "tetris" && (
        <Tetris setScene={setScene} setText={setText} score={score} setScore={setScore} />
      )}
      {scene === "gameover" && <GameOver setScene={setScene} score={score}/>}
    </div>
    </>
  )
}