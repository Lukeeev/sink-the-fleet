import './App.css'
import { Game } from './components/Game'
import Menu from './components/Menu'
import { useState } from 'react'
import type { GameMode } from './components/Types/GameMode'

function App() {

  const [gameModeChosen, setGameModeChosen] = useState<GameMode | null>(null)

  const handleGameModeChosen = (mode: GameMode) => {
    setGameModeChosen(mode);
  }

  return (
    <>
    {
      gameModeChosen?.mode != null ? <Game gameMode={gameModeChosen} onGameChosen={handleGameModeChosen}/> 
      : <Menu onGameChosen={handleGameModeChosen}/>
    }
    </>
  )
}

export default App
