import React, { useEffect, useState } from 'react'
// this page css
import "../css/navbar.css"
// react router dom
import {NavLink, useNavigate} from 'react-router-dom'
// redux
import { useSelector} from 'react-redux'

// custom tools
import { getFromLocalStorage } from '../../utils/localStorage';
// components

function Navbar() {
  const navigate = useNavigate();
  const gameState = useSelector((state)=>state.gameLogic)
  const [user] = useState(getFromLocalStorage('user'))
 
 function logoutHandler(){
    localStorage.removeItem('user');
    navigate('/login')
 }

  return (
    <nav className='navbar-main-container'>
        <ul>
            <li><span>{gameState.balance}</span>Balance</li>
            <li><span>{user?.username}</span></li>
            <li className='logout-button'>
              <NavLink onClick={logoutHandler}>Logout</NavLink> 
            </li>
        </ul>
    </nav>
  )
}

export default Navbar