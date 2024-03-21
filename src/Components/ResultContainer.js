import '../App.css'
import React from 'react'

const ResultContainer = ({ WhichPlayer, DrawCount }) => {
  return (
    <div className='Result-Container'>
      <h1 style={{ color: 'var(--Color2)' }}>Result !</h1>
      {(DrawCount >= 8) ? <h1>Draw</h1> : <h1>" <span style={{ color: 'var(--Color2)' }} >{WhichPlayer}</span> " - Won the Game</h1>}
    </div>
  )
}

export default ResultContainer