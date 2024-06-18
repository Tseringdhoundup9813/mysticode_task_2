import React from 'react'
import DifficultyLevel from "../DifficultyLevel"

function MenuView({startHandler,betPoint,setBetPoint,error}) {
  return (
    <div className='start-model-main-wrapper'>
        <button onClick={startHandler}>Let check your luck</button>
        <label>Bet: min 1 max 10</label>
        <input type="number" 
            value={betPoint}
            placeholder='bet your point' 
            onChange={(e)=>setBetPoint(e.target.value)}/>
        {/* bet error message */}
        {
         error.isError&& <p className='bet-error-message'>{error.message}</p>
        }
        <DifficultyLevel/>
    </div>
  )
}

export default MenuView