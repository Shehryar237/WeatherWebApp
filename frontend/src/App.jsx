import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar.jsx'
import WeatherPage from './pages/WeatherPage.jsx'

function App() {
  return (
    <>
      <NavBar/>
      <WeatherPage/>

    </>
  )
}

export default App
