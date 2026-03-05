import './App.css'
import Board from './components/board/Board'
import { BoardProvider } from './context/BoardContext'

function App() {

  return (
    <BoardProvider>
      <Board />
    </BoardProvider>
  )
}

export default App
