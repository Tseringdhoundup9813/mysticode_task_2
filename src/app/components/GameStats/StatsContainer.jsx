import React,{useState} from 'react'
// css
import "../../css/container/stats.container.css"
// redux
import { useSelector,useDispatch} from 'react-redux'
import { modelIsActiveFunc } from '../../../features/gameLogicSlice'
// constant
import { selectLimit } from '../../../utils/constants'
// component
import StatsView from './StatsView'

function StatsLayout() {
  const gameState = useSelector((state)=>state.gameLogic)
  const dispatch = useDispatch();

  function startGameHandler(){
    // when box select reach certain point show start model component
      if(gameState.selectCount===0 &&(!gameState.win&&!gameState.loose)){
        dispatch(modelIsActiveFunc())
      }
  }
  const startButtonActive = gameState.selectCount<=0&&(!gameState.win)&&!gameState.loose;

  // render UI
  return <StatsView 
          gameState={gameState}
         startGame={()=>startGameHandler()}
         startButtonActive={startButtonActive} 
         selectLimit={selectLimit}/>
}

export default StatsLayout