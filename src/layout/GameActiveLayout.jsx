import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../app/components/Navbar'

function GameActiveLayout() {
  return (
        <>
          <Navbar/>
          <Outlet/>
        </>
  )
}

export default GameActiveLayout