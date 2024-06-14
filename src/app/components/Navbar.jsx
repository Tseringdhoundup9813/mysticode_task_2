import React, { useEffect, useState } from 'react'
// this page css
import "../css/navbar.css"
// react router dom
import {NavLink, useNavigate} from 'react-router-dom'
// redux
import { useSelector,useDispatch} from 'react-redux'

// custom tools
import { selectLimit } from '../../utils/constants';
import { getFromLocalStorage } from '../../utils/localStorage';
// components
import StartModel from "../components/StartModel"

function Navbar() {
  const navigate = useNavigate();
  const gameState = useSelector((state)=>state.gameLogic)
  const[startModelActive,setStartModelActive] = useState(false);

  const [user,setUser] = useState(getFromLocalStorage('user'))
 
 function logoutHandler(){
    localStorage.removeItem('user');
    navigate('/login')
 }
 function startGameHandler(){
      // when box select reach certain point show start model component
        console.log(gameState.selectCount);
        if(gameState.selectCount===0){
            setStartModelActive(true);
        }
 }


  return (
    <nav className='navbar-main-container'>
        {/* show start model component when it is active  */}
        {
            startModelActive&& <StartModel setStartModelActive={setStartModelActive}/> 
        }
        <ul>
            {/* game states sections */}
                <li className={`${gameState.selectMaxReach&&'selectMaxReachAnimiate'}`}>
                  select {selectLimit-gameState.selectCount}/10  
                </li>
                <li>to win {gameState.matchCount}/{gameState.difficultyLevel.box}</li>
                <li className={`start-game-button ${gameState.selectMaxReach&&'highlight-start-button'}`} onClick={startGameHandler}>
                  Start Game
                </li>            
                <li><span>{gameState.balance}</span>Balance</li>
                <li><span>{user?.username}</span></li>
                <li className='logout-button'>
                   <NavLink onClick={logoutHandler}>Logout</NavLink> 
                </li>
            {/* -------------------------- */}
        </ul>
    </nav>
  )
}

export default Navbar