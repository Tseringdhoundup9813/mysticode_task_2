import React, { useState } from 'react'
// custom tools
import { difficultyLevel } from '../../utils/constants'
// redux toolkit
import { useDispatch,useSelector} from 'react-redux';
import { difficultyLevelFunc } from '../../features/gameLogicSlice';


function DifficultyLevel() {
  const dispatch = useDispatch();
  const gameState = useSelector((state)=>state.gameLogic)


  return (
    <div className='difficulty-leve-main-container'>
        <select onClick={(e)=>dispatch(difficultyLevelFunc(JSON.parse(e.target.value)))}>
            {
                difficultyLevel.map((item,index)=>{
                    return(
                        <option key={index} 
                          value={JSON.stringify(item)} 
                          selected={item.name ==gameState.difficultyLevel.name}>
                            {item.name}
                        </option>
                    )
                })
            }

        </select>
        <div>
          <ul>
            <li>difficulty level {gameState.difficultyLevel.name}</li>
            <li>to win must match {gameState.difficultyLevel.box} boxes</li>
            <li>if you won you will receive {gameState.difficultyLevel.points}x times </li>
          </ul>
    

        </div>
      
    </div>
  )
}

export default DifficultyLevel