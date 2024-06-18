// splits screen handle layout design 
// separate component and layout


import "../app/css/splitscreen.css"
import React from 'react'

function SplitScreen({children}) {
  const[StatsComponent,MessageComponent,GamePlayAreaComponent] = children;
  return (
    <div className="splitscreen-main-wrapper">
        <div className="message-main-wrapper">{MessageComponent}</div>
        <div className="stats-main-wrapper">{StatsComponent}</div>
        <div className="game-play-area-main-wrapper">{GamePlayAreaComponent}</div>
    </div>
  )
}

export default SplitScreen
