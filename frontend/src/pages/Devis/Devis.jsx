import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import URL from '../../config/api.js';

const Devis = () => {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [services, setServices] = useState([])
  const [devis, setDevis] = useState({
    typeClient: "",
    marqueVehicule: "",
    modeleVehicule: "",
    service: ""
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(URL.SERVICES)
        console.log("Services récupérés :", response.data)
        setServices(response.data)

      } catch (error) {
        console.log("Erreur récupération services :", error)
      }
    }
    fetchServices()
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target
    setDevis(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!currentUser) {
      navigate('/login')
      return
    }
    try {
      const response = await axios.post(
        "http://localhost:8000/api/devis/create",
        devis,
        { withCredentials: true }
      )
      console.log("Devis créé :", response.data)

    } catch (error) {
      console.log("Erreur devis :", error)
    }
  }

  return (
    <div>
      <h1>Demande de devis</h1>

      <form onSubmit={handleSubmit}>

        <div>
          <label>Type de client</label>
          <select name="typeClient" onChange={handleChange}>
            <option value="">-- Choisir --</option>
            <option value="particulier">Particulier</option>
            <option value="pro">Professionnel</option>
          </select>
        </div>

        <div>
          <label>Marque véhicule</label>
          <input
            type="text"
            name="marqueVehicule"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Modèle véhicule</label>
          <input
            type="text"
            name="modeleVehicule"
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Service</label>
          <select name="service" onChange={handleChange}>
            <option value="">-- Choisir --</option>
            {services.map(service => (
              <option key={service._id} value={service._id}>
                {service.serviceName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">
          Envoyer la demande
        </button>

      </form>
    </div>
  )
}

export default Devis