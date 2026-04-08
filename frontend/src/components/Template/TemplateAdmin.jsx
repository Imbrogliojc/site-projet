import React from 'react'
import NavDashboard from '../Admin/NavDashboard'
import { Outlet } from 'react-router-dom'

const TemplateAdmin = () => {
  return (
    <div className="d-flex">

      <NavDashboard />

      <main className="p-4 flex-grow-1">
        <Outlet />
      </main>

    </div>
  )
}

export default TemplateAdmin