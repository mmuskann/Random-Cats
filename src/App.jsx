import { useState } from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_ACCESS_KEY;

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
        <h1>Random Cats</h1>
        <h2>Are you a cat lover? Let's see some cats!</h2>
        <button>Discover!</button>
      </div>
      <div>
        <h2>Ban List</h2>
        <h3>Select an attribute in your listing to ban it</h3>
      </div>
    </div>
  )
}

export default App
