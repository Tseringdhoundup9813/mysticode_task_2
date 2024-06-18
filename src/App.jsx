import { useState } from 'react'
import './App.css'
import { createBrowserRouter,RouterProvider,Route } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Login from './pages/Login'
import Home from './pages/Home'
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
