import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Styles from './App.module.css'
import {DrawingBoard} from './components/DrawingBoard'

function App() {
  return (
    <>
      <div className={Styles.main}>Welcome to TCGMCUBE!</div>
      <DrawingBoard/>
    </>
  )
}

export default App
