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
    <table border="1" cellPadding="10">
      <thead>
        <tr>
          <th>Service</th>
          <th>Véhicule</th>
          <th>Prix</th>
          <th>Statut</th>
          <th>Réservation</th>
        </tr>
      </thead>

      <tbody>
        {myDevis?.map((devis) => {

          const reservation = myReservation.find(
            (r) => r.devis?._id === devis._id
          );

          // LOGIQUE STATUT MÉTIER
          let statusLabel = "En attente";
          let statusClass = "badge bg-warning text-dark";

          if (reservation) {
            statusLabel = "Réservé";
            statusClass = "badge bg-primary";
          } else if (devis.status === "validated") {
            statusLabel = "Validé";
            statusClass = "badge bg-success";
          }

          return (
            <tr key={devis._id}>

              <td>{devis.service?.serviceName}</td>

              <td>
                {devis.marqueVehicule} {devis.modeleVehicule}
              </td>

              <td>
                {devis.prixTtc ? `${devis.prixTtc} €` : "—"}
              </td>

              <td>
                <span className={statusClass}>
                  {statusLabel}
                </span>
              </td>

              <td>
                {reservation ? (
                  <>
                    <strong>Date :</strong>{" "}
                    {reservation.devis?.dateIt
                      ? new Date(reservation.devis.dateIt).toLocaleDateString()
                      : "—"}
                    <br />
                    <strong>Heure :</strong>{" "}
                    {reservation.devis?.heureIt || "—"}
                  </>
                ) : (
                  "Aucune"
                )}
              </td>

            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Profil