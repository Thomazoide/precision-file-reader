import { useState } from 'react'
import { Container } from 'react-bootstrap'
import Pagina from './pages/pagina'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Pagina/>
      </div>
    </>
  )
}

export default App
