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
    service: "",
    img: []
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
    const { name, value, files } = event.target
    if (name === "img") {
      setDevis((prev) => ({ ...prev, img: Array.from(files) }))
    } else {
      setDevis(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!currentUser) {
      navigate('/login')
      return
    }

    // CREATION : objet FormData pour envoyer des données multipart/form-data. Permet l'envoi de fichiers et de données textuelles
    const formData = new FormData()

    // CHAMPS : ajout champs formulaire dans FormData
    formData.append("typeClient", devis.typeClient)
    formData.append("marqueVehicule", devis.marqueVehicule)
    formData.append("modeleVehicule", devis.modeleVehicule)
    formData.append("service", devis.service)

    // IMAGES : parcours du tableau d'images et ajout de chaque image dans FormData. Le nom "img" doit correspondre au champs
    devis.img.forEach((file) => {
      formData.append("img", file)
    })

    try {
      const response = await axios.post(
        URL.DEVIS + "/create",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
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

        <div>
          <label>Photos du véhicule</label>
          <input
            type="file"
            name="img"
            multiple
            onChange={handleChange}
          />

          {devis.img.length > 0 && (
            <div style={{ display: "flex", gap: "10px", marginTop:"10px" }} >
              {devis.img.map((file, index) => (
                <img
                  key={index}
                  src={window.URL.createObjectURL(file)}
                  alt="preview"
                  width="100"
                />
              ))}
            </div>
          )}
        </div>

        <button type="submit">
          Envoyer la demande
        </button>

      </form>
    </div>
  )
}

export default Devis