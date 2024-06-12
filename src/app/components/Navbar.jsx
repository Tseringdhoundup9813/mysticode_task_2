import React, { useEffect, useState } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import "../css/navbar.css"
import { useSelector,useDispatch} from 'react-redux'
import { animateCountFunc } from '../features/gamelogicSlice';
import { selectLimit } from '../../utils/constants';
import { getFromLocalStorage } from '../../utils/localstorage';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameState = useSelector((state)=>state.gameLogic)
  const [user,setUser] = useState(getFromLocalStorage('user'))
 
 function logoutHandler(){
    localStorage.removeItem('user');
    navigate('/login')
 }

  useEffect(()=>{
    let interval;
    if(gameState.countAnimate < gameState.balance){
        interval = setInterval(function(){
         
            dispatch(animateCountFunc())

        },100)
    }
    return()=>{
        clearInterval(interval);
    }
  },[gameState.balance,gameState.countAnimate])

  return (
    <nav className='navbar-main-container'>
        <ul>
            {/* game states sections */}
            <div className="game-stats-container">
                <p>select {selectLimit-gameState.selectCount}/10</p>
                 {/* how many box needs to match */}
                 <p>to win {gameState.matchCount}/{gameState.difficultyLevel.box}</p>             
            </div>
            {/* login and balance section */}
            <div>
                <li><span>{gameState.countAnimate}</span>Balance</li>
                <li><span>{user?.username}</span></li>
                
                <NavLink onClick={logoutHandler}>Logout</NavLink> 
            </div>
            {/* -------------------------- */}
        </ul>
    </nav>
  )
}

export default Navbar