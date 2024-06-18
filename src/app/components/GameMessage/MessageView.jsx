

export default function Message({gameState,restart}){
    return(
        <div className='game-loose-and-win-container'>
        {gameState.win&&<h1>WOW! congratulation,<br/> you win the bet<span onClick={restart}>Lets play again</span>
        </h1>}
        {gameState.loose&&
            <h1>Sorry! you don't have luck today<span onClick={restart}>Let's try again</span></h1>}
      </div>
    )
}