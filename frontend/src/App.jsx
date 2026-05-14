import { Route, Routes } from 'react-router-dom'
import './App.css'

// IMPORT DES TEMPLATES
import TemplateAdmin from "./components/Template/TemplateAdmin.jsx"

// IMPORT DES SERVICES
import AdminServices from "./pages/Admin/Services/AdminServices.jsx"
import AdminDevis from "./pages/Admin/Devis/AdminDevis.jsx"
import AdminReservations from './pages/Admin/Reservations/AdminReservations.jsx'
import AdminAddress from './pages/Admin/Address/AdminAddress.jsx'
import AdminUsers from './pages/Admin/Users/AdminUsers.jsx'

// IMPORT DES PAGES ADMINISTRATEUR
import Dashboard from "./pages/Admin/Dashboard.jsx"

// IMPORT DES PAGES PUBLIQUES
import Template from './components/Template/Template'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import Realisations from './pages/Realisations/Realisations'
import Devis from './pages/Devis/Devis'
import Profil from './pages/Profil/Profil'
import Contact from './pages/Contact/Contact'
import CGU from './pages/Publiques/CGU.jsx'
import CGV from './pages/Publiques/CGV.jsx'
import MentionsLegales from './pages/Publiques/MentionsLegales.jsx'
import PolitiqueConfidentialite from './pages/Publiques/PolitiqueConfidentialite.jsx'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import ResetPassword from './pages/Auth/ResetPassword.jsx'

// IMPORT DES PAGES PRIVEES
import PrivateRoute from './utils/helpers/PrivateRoute.jsx'
import PrivateRouteAdmin from "./utils/helpers/PrivateRouteAdmin.jsx"

function App() {

  return (
    <Routes>

      {/* ROUTES PUBLIQUES */}
      {/* ROUTES PRIVEES */}

      <Route path='/' element={<Template />}>

        <Route index element={<Home />} />
        <Route path='services' element={<Services />} />
        <Route path='realisations' element={<Realisations />} />
        <Route path='contact' element={<Contact />} />

        <Route path='CGU' element={<CGU />} />
        <Route path='CGV' element={<CGV />} />
        <Route path='mentions-legales' element={<MentionsLegales />} />
        <Route path='politique-confidentialite' element={<PolitiqueConfidentialite />} />

        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />
        <Route path='forgotPassword' element={<ForgotPassword />} />
        <Route path='reset-password/:token' element={<ResetPassword />} />

        <Route element={<PrivateRoute />}>
          <Route path='devis' element={<Devis />} />
          <Route path='profil' element={<Profil />} />
        </Route>

      </Route>

      {/* ROUTES ADMINISTRATEURS */}
      <Route element={<PrivateRouteAdmin />} >
        <Route path="admin" element={<TemplateAdmin />}>
          <Route index element={<Dashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="devis" element={<AdminDevis />} />
          <Route path="reservations" element={<AdminReservations />} />
          <Route path="adresses" element={<AdminAddress />} />
          <Route path="users" element={<AdminUsers />} />
        </Route>
      </Route>

    </Routes>
  )
}

export default App
