import { useState } from 'react'

type Language = 'somali' | 'english'

function App() {
  const [language, setLanguage] = useState<Language>('somali')
  const isSomali = language === 'somali'

  function switchLanguage() {
    setLanguage((current) => (current === 'somali' ? 'english' : 'somali'))
  }

  return (
    <main>
      <button type="button" onClick={switchLanguage}>
        {isSomali ? 'Switch to English' : 'U beddel Af-Soomaali'}
      </button>
      <h1>{isSomali ? 'Salaan!' : 'Hello!'}</h1>
    </main>
  )
}

export default App
