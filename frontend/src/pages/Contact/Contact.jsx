import React, { useState, useEffect } from 'react';
import URL from '../../config/api';
import axios from 'axios';

const Contact = () => {

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    telephone: "",
    sujet: "",
    message: ""
  })

  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [success])

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await axios.post(URL.CONTACT, formData)

      console.log("Formulaire envoyé :", formData)

      setSuccess(true)

      setFormData({
        nom: "",
        prenom: "",
        email: "",
        telephone: "",
        sujet: "",
        message: ""
      })

    } catch (error) {
      console.log("Erreur envoi formulaire :", error)
    }
  }

  return (
    <div className="container py-5">

      {/* HEADER */}
      <div className="text-center mb-5">
        <h1>Contactez-nous</h1>
        <p className="text-muted">
          Une question ? Un projet ? N'hésitez pas à nous contacter.
        </p>
      </div>

      <div className="row g-4">

        {/* 🟦 FORMULAIRE */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4">

            <h3 className="mb-3">Envoyez-nous un message</h3>

            {success && (
              <div className="alert alert-success">
                Votre message a bien été envoyé !
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nom</label>
                <input
                  type="text"
                  name="nom"
                  className="form-control"
                  value={formData.nom}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Prénom</label>
                <input
                  type="text"
                  name="prenom"
                  className="form-control"
                  value={formData.prenom}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Téléphone</label>
                <input
                  type="tel"
                  name="telephone"
                  className="form-control"
                  value={formData.telephone}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Sujet</label>
                <input
                  type="text"
                  name="sujet"
                  className="form-control"
                  value={formData.sujet}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button className="btn btn-warning w-100">
                Envoyer le message
              </button>
            </form>

          </div>
        </div>

        {/* 🟨 INFOS */}
        <div className="col-md-6">
          <div className="card shadow-sm p-4 h-100">

            <h3 className="mb-3">Nos coordonnées</h3>

            <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
            <p><strong>Email :</strong> contact@monentreprise.com</p>

            <p>
              <strong>Adresse :</strong><br />
              123 Avenue des Champs-Élysées<br />
              75008 Paris
            </p>

            <p>
              <strong>Horaires :</strong><br />
              Lundi - Vendredi : 9h - 18h<br />
              Samedi : 10h - 16h
            </p>

            {/* MAP */}
            <div className="mt-3">
              <iframe
                src="https://www.google.com/maps?q=48.8698,2.3076&z=15&output=embed"
                width="100%"
                height="250"
                style={{ border: 0 }}
                loading="lazy"
              ></iframe>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default Contact