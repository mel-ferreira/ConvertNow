import React from 'react'
import ConversorForm from './components/ConversorForm'

const App = () => {
  return (
  <div className="wrapper">
    <h2 className='titulo'>ConvertNow: Seu Conversor <br /> Inteligente ;)</h2>
      <div className='conversor'>
        <ConversorForm />
      </div>
  </div>

  )
}

export default App
