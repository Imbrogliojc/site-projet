import React from 'react'
import NavDashboard from '../Admin/NavDashboard'
import { Outlet } from 'react-router'

const TemplateAdmin = () => {
  return (
    <div>
      <div>
        <NavDashboard />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default TemplateAdmin