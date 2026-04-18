import React from 'react'

// Import Outlet depuis react-router
import { Outlet } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

// Template parent de tous nos composants
const Template = () => {
  return (
    <div className="d-flex flex-column min-vh-100">

      <Header />

      <main className="flex-grow-1 container py-4">
        <Outlet />
      </main>

      <Footer />

    </div>
  )
}

export default Template