import React from 'react'
import { useSelector} from 'react-redux'

function ModelLayout({children}) {
  const gameState = useSelector((state)=>state.gameLogic) 
  return (
    <>
      {gameState.isModel&&children}
    </>
  )
}

export default ModelLayout