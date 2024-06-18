import React from 'react'

function Stats({gameState,startGame,selectLimit,startButtonActive}) {
  return (
    <ul className='stats-container-wrapper'>
        <div>
        <li className={`${gameState.selectMaxReach&&'selectMaxReachAnimiate'}`}>
            select {selectLimit-gameState.selectCount}/10  
        </li>
        <li>to win {gameState.matchCount}/{gameState.difficultyLevel.box}</li>
        </div>
        <div>
        {
            startButtonActive&&
            <li className={`start-game-button ${gameState.selectMaxReach&&'highlight-start-button'}`} onClick={startGame}>
                Start Game
            </li>    
        }
        </div>
    </ul>
  )
}

export default Stats