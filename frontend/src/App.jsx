import { Route, Routes } from 'react-router-dom'

import './App.css'

import Template from './components/Template/Template'
import Home from './pages/Home/Home'
import Services from './pages/Services/Services'
import Realisations from './pages/Realisations/Realisations'
import Devis from './pages/Devis/Devis'
import Auth from './pages/Auth/Login'
import Profil from './pages/Profil/Profil'
import Contact from './pages/Contact/Contact'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Template />}>

        <Route index element={<Home />} />
        <Route path='services' element={<Services />} />
        <Route path='realisations' element={<Realisations />} />
        <Route path='devis' element={<Devis />} />
        <Route path='login' element={<Auth />} />
        <Route path='profil' element={<Profil />} />
        <Route path='contact' element={<Contact />} />


      </Route>
    </Routes>
  )
}

export default App
