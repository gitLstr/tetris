export default function Home({ setScene, text }) {
  return (
    <div>
      <h1>Hello {text}</h1>
      <button onClick={() => setScene("tetris")}>Play</button>
    </div>
  )
}