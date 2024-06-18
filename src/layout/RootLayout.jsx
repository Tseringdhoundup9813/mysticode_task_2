import React, { useEffect, useState } from 'react'
// react router dom 
import { Outlet,NavLink} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
// custom tools
import { getFromLocalStorage } from '../utils/localStorage'
// components
import Navbar from '../app/components/Navbar'

function RootLayout() {
  const navigate = useNavigate();
  const [user,setUser] = useState(getFromLocalStorage('user'))
  useEffect(()=>{
    if(!user){
      navigate('/login')
    }else if(user){
      navigate('/home')
    }

  },[user])

  return (
    <div>
        <Navbar/>
        <Outlet/>
    </div>
  )
}

export default RootLayout