import React, { useState, useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import URL from '../../config/api.js';

const Devis = () => {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [services, setServices] = useState([])
  const [addresses, setAddresses] = useState([])
  const [addressValues, setAddressValues] = useState({
    rue: "",
    codePostal: "",
    ville: "",
    numeroTelephone: ""
  })
  const [showAddressForm, setShowAddressForm] = useState(false)
  const [devis, setDevis] = useState({
    typeClient: "",
    marqueVehicule: "",
    modeleVehicule: "",
    service: "",
    address: "",
    img: []
  })

  const [success, setSuccess] = useState(false)

  const fileInputRef = useRef(null)

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
    if (currentUser) {
      fetchAddress()
    }
  }, [])

  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${URL.ADDRESS}/profile`, {
        withCredentials: true
      })

      console.log("Adresses récupérées :", response.data)
      setAddresses(response.data)

    } catch (error) {
      console.log("Erreur récupération d'adresses :", error)
    }
  }

  const handleCreateAddress = async () => {
    try {
      const response = await axios.post(`${URL.ADDRESS}/create`, addressValues, { withCredentials: true })
      setAddressValues({
        rue: "",
        codePostal: "",
        ville: "",
        numeroTelephone: ""
      })
      setShowAddressForm(false)
      await fetchAddress()
      setDevis(prev => ({
        ...prev,
        address: response.data._id
      }))

    } catch (error) {
      console.log("Erreur création d'adresse :", error)
    }
  }

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
    if (!devis.address) {
      alert("Veuillez sélectionner ou ajouter une adresse de facturation.")
      return
    }

    // CREATION : objet FormData pour envoyer des données multipart/form-data. Permet l'envoi de fichiers et de données textuelles
    const formData = new FormData()

    // CHAMPS : ajout champs formulaire dans FormData
    formData.append("typeClient", devis.typeClient)
    formData.append("marqueVehicule", devis.marqueVehicule)
    formData.append("modeleVehicule", devis.modeleVehicule)
    formData.append("service", devis.service)
    formData.append("address", devis.address)

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
      setSuccess(true)

      setDevis({
        typeClient: "",
        marqueVehicule: "",
        modeleVehicule: "",
        service: "",
        address: "",
        img: []
      })

      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }

    } catch (error) {
      console.log("Erreur devis :", error)
    }
  }

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h1>Demande de devis</h1>
        <p className="text-muted">
          Présentez votre véhicule et le service souhaité afin d’obtenir une première estimation adaptée à votre besoin.
        </p>
      </div>

      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm p-4">

            <h3 className="mb-3">Votre projet automobile</h3>

            <p className="text-muted mb-4">
              Après l’envoi de votre demande, celle-ci sera étudiée afin de vous proposer une réponse adaptée.
              Vous pourrez suivre son avancement depuis votre espace <strong>Mon profil</strong>.
            </p>

            {success && (
              <div className="alert alert-success">
                Votre demande de devis a bien été envoyée. Elle sera étudiée prochainement et vous pourrez suivre son avancement depuis votre espace Mon profil.
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Type de client</label>
                <select
                  className="form-select"
                  name="typeClient"
                  value={devis.typeClient}
                  onChange={handleChange}
                >
                  <option value="">-- Choisir --</option>
                  <option value="particulier">Particulier</option>
                  <option value="pro">Professionnel</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Marque du véhicule</label>
                <input
                  type="text"
                  name="marqueVehicule"
                  className="form-control"
                  value={devis.marqueVehicule}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Modèle du véhicule</label>
                <input
                  type="text"
                  name="modeleVehicule"
                  className="form-control"
                  value={devis.modeleVehicule}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Service souhaité</label>
                <select
                  className="form-select"
                  name="service"
                  value={devis.service}
                  onChange={handleChange}
                >
                  <option value="">-- Choisir un service --</option>
                  {services.map(service => (
                    <option key={service._id} value={service._id}>
                      {service.serviceName}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label">Adresse de facturation</label>

                {addresses.length > 0 ? (
                  <select
                    className="form-select mb-2"
                    name="address"
                    value={devis.address}
                    onChange={handleChange}
                  >
                    <option value="">-- Choisir une adresse --</option>

                    {addresses.map((addr) => (
                      <option key={addr._id} value={addr._id}>
                        {addr.rue} - {addr.codePostal} {addr.ville}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="text-muted">
                    Aucune adresse enregistrée. Vous pouvez en ajouter une directement avant d’envoyer votre demande.
                  </p>
                )}

                <button
                  type="button"
                  className="btn btn-outline-primary btn-sm mb-3"
                  onClick={() => setShowAddressForm(!showAddressForm)}
                >
                  {showAddressForm ? "Annuler l’ajout" : "Ajouter une adresse"}
                </button>

                {showAddressForm && (
                  <div className="border rounded p-3 mb-3">
                    <input
                      className="form-control mb-2"
                      placeholder="Rue"
                      value={addressValues.rue}
                      onChange={(e) =>
                        setAddressValues(prev => ({ ...prev, rue: e.target.value }))
                      }
                    />

                    <input
                      className="form-control mb-2"
                      placeholder="Code postal"
                      value={addressValues.codePostal}
                      onChange={(e) =>
                        setAddressValues(prev => ({ ...prev, codePostal: e.target.value }))
                      }
                    />

                    <input
                      className="form-control mb-2"
                      placeholder="Ville"
                      value={addressValues.ville}
                      onChange={(e) =>
                        setAddressValues(prev => ({ ...prev, ville: e.target.value }))
                      }
                    />

                    <input
                      className="form-control mb-3"
                      placeholder="Téléphone"
                      value={addressValues.numeroTelephone}
                      onChange={(e) =>
                        setAddressValues(prev => ({ ...prev, numeroTelephone: e.target.value }))
                      }
                    />

                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={handleCreateAddress}
                    >
                      Enregistrer cette adresse
                    </button>
                  </div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label">Photos du véhicule</label>
                <input
                  type="file"
                  name="img"
                  className="form-control"
                  multiple
                  ref={fileInputRef}
                  onChange={handleChange}
                />

                <div className="form-text">
                  Vous pouvez ajouter jusqu’à 5 photos afin de faciliter l’analyse de votre demande.
                </div>

                {devis.img.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mt-3">
                    {devis.img.map((file, index) => (
                      <img
                        key={index}
                        src={window.URL.createObjectURL(file)}
                        alt="preview"
                        width="100"
                        className="rounded border"
                      />
                    ))}
                  </div>
                )}
              </div>

              <button type="submit" className="btn btn-warning w-100 fw-semibold">
                <i className="bi bi-send me-1"></i>
                Envoyer la demande
              </button>

            </form>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Devis