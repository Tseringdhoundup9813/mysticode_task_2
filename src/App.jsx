import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom'
import RootLayout from './app/layout/RootLayout'
import Login from './app/pages/Login'
import Home from './app/pages/Home'
const routers = createBrowserRouter([
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {
        path:"home",
        element:<Home/>
      }
    ]
  },
  {
    path:"login",
    element:<Login/>
  }
])
function App() {
  return <RouterProvider router={routers}/>
}

export default App
