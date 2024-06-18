import React from 'react'
// css
import "../../css/container/message.container.css"
// redux 
import { useSelector,useDispatch } from 'react-redux'
import { restartFunc } from '../../../features/gameLogicSlice';
// UI Component
import MessageView from "./MessageView"
function MessageContainer() {
  const dispatch = useDispatch();
  const gameState = useSelector((state)=>state.gameLogic)
  
  function restartHandler(){
    dispatch(restartFunc())
  }
  // render UI
  return <MessageView gameState={gameState} restart={()=>restartHandler()}/>
}

export default MessageContainer