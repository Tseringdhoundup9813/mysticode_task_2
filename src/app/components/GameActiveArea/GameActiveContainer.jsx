
import React, { useEffect} from 'react'
import "../../css/box.css"
// redux
import { useSelector,useDispatch } from 'react-redux'
import {selectReachAnimateFunc,selectBoxFunc} from '../../../features/gameLogicSlice'
// component
import GameActiveArea from './GameActiveView'

function GameActiveContainer() {
  const dispatch = useDispatch();
  const gameState = useSelector((state)=>state.gameLogic)

  // box select handler
  function boxSelectHandler(id,column,row){
    dispatch(selectBoxFunc(id,column,row))            
  }

  // warn or highlight when player reaches max selection
  function maxSelectWarn(){
      if(gameState.selectMaxReach){
          setTimeout(function(){

              dispatch(selectReachAnimateFunc())
          },500)

      }
  }

  useEffect(function(){
    maxSelectWarn();
  },[gameState.selectMaxReach])
  // ----------------------------------------
  return <GameActiveArea gameState={gameState} boxSelectHandler={boxSelectHandler}/>
}

export default GameActiveContainer