import { useState } from 'react'
import './Profile.css'
import Header from './Header'
import Home from './ProfileHome'

function Profile() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='gridd-container'>
      <Header />
      <Home />
      {/* Profile */}
    </div>
  )
}

export default Profile
