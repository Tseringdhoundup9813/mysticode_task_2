import React, { useEffect, useState } from 'react'
import "../css/box.css"
import { useSelector,useDispatch } from 'react-redux'
import { selectBoxFunc,restartFunc,selectReachAnimateFunc} from '../features/gameLogicSlice'

function Boxes() {
     const dispatch = useDispatch();
     const gameState = useSelector((state)=>state.gameLogic)
  

     function boxSelectHandler(id,column,row){
        dispatch(selectBoxFunc(id,column,row))            
    }
    useEffect(function(){
        if(gameState.selectMaxReach){
            setTimeout(function(){

                dispatch(selectReachAnimateFunc())
            },500)

        }

    },[gameState.selectMaxReach])



  return (
    <div className='box-parent-wrapper'>
        
        {/* game win */}
            <div className='game-loose-and-win-container'>
                {gameState.win&&<h1>WOW! congratulation,<br/> you win the bet
                    <span onClick={()=>dispatch(restartFunc())}>
                        Lets play again
                    </span>
                </h1>}
                {gameState.loose&&
                <h1>Sorry! you don't have luck today
                    <span onClick={()=>dispatch(restartFunc())}>
                        Let's try again
                    </span>
                </h1>}
    
            </div>
        {
          gameState?.boxes_list.map((boxRow,columnIndex)=>{
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

export default Boxes