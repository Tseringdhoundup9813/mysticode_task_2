
import React from 'react'

function GameActiveArea({gameState,boxSelectHandler}) {
  return (
    <div className='box-parent-wrapper'>
        {gameState?.boxes_list.map((boxRow,columnIndex)=>{
            return(
                <div className='box-column-container' key={columnIndex}>
                    {
                        boxRow.map((item,rowIndex)=>{
                            return(
                            <div 
                                className={`box-row-container ${item.revel&&'highlight'}
                                 ${item.computerSelect&&'computerselect'} ${item.match&&'matchHighlight'}`} 
                                 onClick={()=>boxSelectHandler({id:item.id,column:columnIndex,row:rowIndex})} >
                                    {item.id}
                            </div>
                            )
                        })
                    }
                </div>
            )
          })}
    </div>
  )
}

export default GameActiveArea