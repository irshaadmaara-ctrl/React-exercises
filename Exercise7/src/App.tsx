import { useState } from 'react'

function App() {
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 })

  return (
    <main
      onMouseMove={(event) =>
        setCoordinates({ x: event.clientX, y: event.clientY })
      }
      style={{ minHeight: '100vh' }}
    >
      <p>Mouse X: {coordinates.x}</p>
      <p>Mouse Y: {coordinates.y}</p>
    </main>
  )
}

export default App
