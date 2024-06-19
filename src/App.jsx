import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider,createRoutesFromElements,Route } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Login from './pages/Login'
import Home from './pages/Home'
import GameActiveLayout from './layout/GameActiveLayout'
const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout/>}>
        <Route path="/" element={<GameActiveLayout/>}>
          <Route path='/home' element={<Home/>}/>
        </Route>
        <Route path='/login' element={<Login/>}/>        
    </Route>
  )
)

function App() {
  return <RouterProvider router={routers}/>
}

export default App
