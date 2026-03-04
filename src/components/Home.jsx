export default function Home({ setScene }) {
  return (
    <div>
      <h1>Tetris</h1>
      <h4>
      up - rotate<br></br>
      left/right - move left/right<br></br>
      down - move down<br></br>
      space - drop piece<br></br>
      </h4>
      <button onClick={() => setScene("tetris")}>Play</button>
    </div>
  )
}