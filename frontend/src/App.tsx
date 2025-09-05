import './App.css'
import { Game } from './components/Game'
import Menu from './components/Menu'
import { useState } from 'react'


function App() {

  const [gameChosen, setGameChosen] = useState()

  return (
    <>
      <Menu />
      <Game />
    </>
  )
}

export default App
