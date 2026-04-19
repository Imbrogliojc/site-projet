import { NavLink } from 'react-router-dom'

const NavDashboard = () => {
  return (
    <aside className="bg-dark text-white p-3" style={{ minHeight: "100vh", width: "220px" }}>

      <h5 className="mb-4">Admin</h5>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink to="/admin/services" className="nav-link text-white">
            🛠 Services
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/devis" className="nav-link text-white">
            📄 Devis
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/reservations" className="nav-link text-white">
            📅 Réservations
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink to="/admin/adresses" className="nav-link text-white">
            🏚️​ Adresses
          </NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/admin/users" className="nav-link text-white">
            🙍‍♂️​​ Users
          </NavLink>
        </li>

        <li className="nav-item mt-3">
          <NavLink to="/" className="nav-link text-warning">
            ⬅ Retour au site
          </NavLink>
        </li>

      </ul>
    </aside>
  )
}

export default NavDashboard