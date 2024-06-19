
// react router dom 
import { Outlet} from 'react-router-dom'
// custom tools
// components
import Navbar from '../app/components/Navbar'
import { AuthContextProvider } from '../context/AuthContext'

function RootLayout() {
  return (
    <div>
      <AuthContextProvider>
    
          <Outlet/>          

      </AuthContextProvider>
    </div>
  )
}

export default RootLayout