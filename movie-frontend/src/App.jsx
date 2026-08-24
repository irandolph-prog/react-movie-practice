import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import MovieCard from './components/MovieCard'

function App() {
  // conditional rendering
  const movieNumber = 2;

  return (
    <>
      {movieNumber === 1 && <MovieCard movie={{title: "Placeholder Title", release_date: "2024", }} />}
      {movieNumber === 2 && <MovieCard movie={{title: "Sharknado 12", release_date: "2054", }} />}
    </>
  )
}

export default App
