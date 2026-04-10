import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import URL from '../../config/api.js';

const Profil = () => {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [myDevis, setMyDevis] = useState([])
  const [myReservation, setMyReservation] = useState([])


  const fetchDevis = async () => {
    try {
      const response = await axios.get(`${URL.DEVIS}/user`, { withCredentials: true })
      console.log("Devis récupérés :", response.data)
      setMyDevis(response.data)

    } catch (error) {
      console.log("Erreur récupération du devis :", error)
    }
  }

  const fetchReservation = async () => {
    try {
      const response = await axios.get(`${URL.RESERVATIONS}/user`, { withCredentials: true })
      console.log("Réservation récupérée :", response.data)
      setMyReservation(response.data)

    } catch (error) {
      console.log("Erreur de récupération de la réservation :", error)
    }
  }

  useEffect(() => {
    if (!currentUser) {
      return navigate('/login')
    }
    fetchDevis()
    fetchReservation()
  }, [])

  return (
    <div>
      <h1>Mon profil</h1>

      <h2>Mes devis</h2>

      {myDevis.length === 0 ? (
        <p>Aucun devis</p>
      ) : (
        myDevis.map((d) => (
          <div key={d._id}>
            <p>Service : {d.service?.serviceName}</p>
            <p>Véhicule : {d.marqueVehicule} {d.modeleVehicule}</p>
            <p>Prix : {d.prixTtc} €</p>
            <hr />
          </div>
        ))
      )}

      <h2>Mes réservations</h2>

      {myReservation.length === 0 ? (
        <p>Aucune réservation</p>
      ) : (
        myReservation.map((r) => (
          <div key={r._id}>
            <p>Date : {r.devis?.dateIt}</p>
            <p>Heure : {r.devis?.heureIt}</p>
            <hr />
          </div>
        ))
      )}

    </div>
  )
}

export default Profil