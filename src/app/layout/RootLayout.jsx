import React, { useEffect, useState } from 'react'
import { Outlet,NavLink} from 'react-router-dom'
import Navbar from '../components/Navbar'
import { getFromLocalStorage } from '../../utils/localstorage'
import { useNavigate } from 'react-router-dom'
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