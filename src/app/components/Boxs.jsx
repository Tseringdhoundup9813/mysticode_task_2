import React, { useState } from 'react'
import { generateBoxs } from '../../utils/generateBoxs'
import "../css/box.css"
import { useSelector,useDispatch } from 'react-redux'
import { selectBoxFunc,restartFunc} from '../features/gamelogicSlice'

import StartModel from './StartModel'

function Boxs() {
     const dispatch = useDispatch();
     const[startModelActive,setStartModelActive] = useState(false);
     const gameState = useSelector((state)=>state.gameLogic)
    

    //  box selection handler
     function boxSelectHandler(id,column,row){
        // when box select reach certain point show start model component
        if(gameState.selectCount===1){
            setStartModelActive(true);
        }
      
        if(gameState.selectCount > 0 && !gameState.playerSelectedBoxs.includes(id)){
            dispatch(selectBoxFunc(id,column,row))            
        }
    }


  return (
    <div className='box-parent-wrapper'>
        {/* show start model component when it is active  */}
        {
            startModelActive&& <StartModel setStartModelActive={setStartModelActive}/> 
        }
        {/* game win */}
            <div className='game-loose-and-win-container'>
                {gameState.win&&<h1>You won the game</h1>}
                {gameState.loose&&<h1>You have loose</h1>}
                {(gameState.win || gameState.loose)&&<button onClick={()=>dispatch(restartFunc())}>Play again</button>}
            </div>
        {
          gameState?.boxlist.map((boxRow,columnIndex)=>{
            return(
                <div className='box-column-container' key={columnIndex}>
                    {
                        boxRow.map((item,rowIndex)=>{
                            return(
                                <div key={rowIndex} 
                                    className={`box-row-container ${item.revel&&'highlight'} ${item.computerSelect&&'computerselect'} ${item.match&&'matchHighlight'}`} 
                                    onClick={()=>boxSelectHandler({id:item.id,column:columnIndex,row:rowIndex})} >{item.id}</div>
                            )
                        })
                    }
                </div>
            )
          })
        }
    </div>
  )
}

export default Boxs