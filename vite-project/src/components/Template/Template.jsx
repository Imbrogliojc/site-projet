import React from 'react'

// Import Outlet depuis react-router
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

// Template parent de tous nos composants
const Template = () => {
  return (
    <>
    <Header />

    <main>
        <Outlet />
    </main>
    
    <Footer />
    </>
  )
}

export default Template