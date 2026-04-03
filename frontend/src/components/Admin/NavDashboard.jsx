import { NavLink } from 'react-router-dom'

const NavDashboard = () => {
  return (
    <aside>
      <NavLink to="/admin">Dashboard</NavLink>
      <br />
      <NavLink to="/admin/services">Services</NavLink>
    </aside>
  )
}

export default NavDashboard