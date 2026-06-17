import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router';
import axios from 'axios';
import URL from '../../config/api.js';

import { validatePassword } from "../../utils/validators/passwordValidator.js";
import PasswordChecklist from '../../components/Auth/PasswordChecklist.jsx';

const formatDate = (date) => {
  if (!date) return "-"
  return new Date(date).toLocaleDateString("fr-FR")
}

const Profil = () => {

  const { currentUser, logout } = useContext(AuthContext)
  const navigate = useNavigate()

// ====================
// STATES — DEVIS & RÉSERVATIONS
// ====================

// Données récupérées avec fetchDevis()
// Utilisées pour afficher les devis du user connecté
  const [myDevis, setMyDevis] = useState([])

// Données récupérées avec fetchReservation()
// Utilisées pour savoir si un devis possède déjà une réservation  
  const [myReservation, setMyReservation] = useState([])

// ====================
// STATES — PROFIL UTILISATEUR
// ====================

// Données récupérées avec fetchUser()
  const [user, setUser] = useState(null)

// Active ou désactive le mode édition du profil
  const [editUser, setEditUser] = useState(false)

// Valeurs du formulaire de modification du profil
  const [userValues, setUserValues] = useState({
    userName: "",
    email: ""
  })

// ====================
// STATES — ADRESSES UTILISATEUR
// ====================

// Données récupérées avec fetchAddress()
  const [addresses, setAddresses] = useState([])

// Indique quelle adresse est en cours de création ou de modification
// null = aucun formulaire ouvert
// "new" = création d'une nouvelle adresse
// id MongoDB = modification d'une adresse existante
  const [editId, setEditId] = useState(null)

// Valeurs du formulaire d'adresse
// Utilisées à la fois pour créer et modifier une adresse
  const [editValues, setEditValues] = useState({
    rue: "",
    codePostal: "",
    ville: "",
    numeroTelephone: ""
  })

// ====================
// STATES — MOT DE PASSE
// ====================

// Valeurs du formulaire de modification du mot de passe
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

// Message d'erreur affiché si la modification du mot de passe échoue
  const [passwordError, setPasswordError] = useState("")

// Partie devis
  const fetchDevis = async () => {
    try {
      const response = await axios.get(`${URL.DEVIS}/user`, { withCredentials: true })
      console.log("Devis récupérés :", response.data)
      setMyDevis(response.data)

    } catch (error) {
      console.log("Erreur récupération du devis :", error)
    }
  }

// Partie réservation
  const fetchReservation = async () => {
    try {
      const response = await axios.get(`${URL.RESERVATIONS}/user`, { withCredentials: true })
      console.log("Réservation récupérée :", response.data)
      setMyReservation(response.data)

    } catch (error) {
      console.log("Erreur de récupération de la réservation :", error)
    }
  }

// Partie User
  const fetchUser = async () => {
    try {
      const response = await axios.get(`${URL.USER}/profile`, {
        withCredentials: true
      })

      setUser(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateUser = async () => {
    try {
      const response = await axios.put(`${URL.USER}/profile`,
        userValues,
        { withCredentials: true }
      )

      setUser(response.data)
      setEditUser(false)

    } catch (error) {
      console.log(error)
    }
  }

// Partie address
  const fetchAddress = async () => {
    try {
      const response = await axios.get(`${URL.ADDRESS}/profile`, {
        withCredentials: true
      })

      setAddresses(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleCreateAddress = async () => {
    try {
      await axios.post(`${URL.ADDRESS}/create`,
        editValues,
        { withCredentials: true }
      )

      setEditId(null)
      fetchAddress()

    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateAddress = async (id) => {
    try {
      await axios.put(`${URL.ADDRESS}/profile/${id}`,
        editValues,
        { withCredentials: true }
      )

      setEditId(null)
      fetchAddress()

    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteAddress = async (id) => {
    const confirmDelete = window.confirm("Supprimer cette adresse ?")
    if (!confirmDelete) return

    try {
      await axios.delete(`${URL.ADDRESS}/profile/${id}`, {
        withCredentials: true
      })

      fetchAddress()

    } catch (error) {
      console.log(error)
    }
  }

// Partie password
  const handleUpdatePassword = async () => {
    if (!passwordValues.oldPassword || !passwordValues.newPassword || !passwordValues.confirmPassword) {
      setPasswordError("Veuillez remplir tous les champs.")
      return
    }

    if (passwordValues.newPassword !== passwordValues.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.")
      return
    }

    const passwordValidation = validatePassword(passwordValues.newPassword)

    if (!passwordValidation.isValid) {
      setPasswordError("Le nouveau mot de passe ne respecte pas les règles de sécurité.")
      return
    }

    try {
      await axios.put(`${URL.USER}/password`,
        {
          oldPassword: passwordValues.oldPassword,
          newPassword: passwordValues.newPassword
        },
        { withCredentials: true }
      )

      setPasswordValues({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      })

      setPasswordError("")
      alert("Mot de passe mis à jour !")

    } catch (error) {
      console.log(error)
      setPasswordError("Erreur lors de la modification du mot de passe.")
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Supprimer votre compte !")
    if (!confirmDelete) return

    try {
      await axios.delete(`${URL.USER}/profile`, {
        withCredentials: true
      })

      logout()

    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return navigate('/login')
    }
    fetchDevis()
    fetchReservation()
    fetchUser()
    fetchAddress()
  }, [])

  return (
    <div className="container mt-4">

      {/* ==================== */}
      {/* MON PROFIL */}
      {/* ==================== */}
      <div className="card mb-4">
        <div className="card-body">

          <h4 className="card-title mb-3">Mon profil</h4>

          {editUser ? (
            <>
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Nom"
                value={userValues.userName}
                onChange={(e) =>
                  setUserValues(prev => ({ ...prev, userName: e.target.value }))
                }
              />

              <input
                className="form-control mb-3"
                type="email"
                placeholder="Email"
                value={userValues.email}
                onChange={(e) =>
                  setUserValues(prev => ({ ...prev, email: e.target.value }))
                }
              />

              <button className="btn btn-success me-2" onClick={handleUpdateUser}>
                Valider
              </button>

              <button className="btn btn-secondary" onClick={() => setEditUser(false)}>
                Annuler
              </button>
            </>
          ) : (
            <>
              <p><strong>Nom :</strong> {user?.userName}</p>
              <p><strong>Email :</strong> {user?.email}</p>

              <button className="btn btn-primary" onClick={() => {
                setEditUser(true)
                setUserValues({
                  userName: user.userName,
                  email: user.email
                })
              }}>
                Modifier
              </button>
            </>
          )}

        </div>
      </div>

      {/* ==================== */}
      {/* MES ADRESSES */}
      {/* ==================== */}
      <div className="card mb-4">
        <div className="card-body">

          <h4 className="card-title mb-3">Mes adresses</h4>

          <button
            className="btn btn-primary mb-3"
            onClick={() => {
              setEditId("new")
              setEditValues({
                rue: "",
                codePostal: "",
                ville: "",
                numeroTelephone: ""
              })
            }}
          >
            Ajouter une adresse
          </button>

          {/* FORMULAIRE CREATION */}
          {editId === "new" && (
            <div className="mb-3 border rounded p-3">
              <input
                className="form-control mb-2"
                placeholder="Rue"
                value={editValues.rue}
                onChange={(e) =>
                  setEditValues(prev => ({ ...prev, rue: e.target.value }))
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Code postal"
                value={editValues.codePostal}
                onChange={(e) =>
                  setEditValues(prev => ({ ...prev, codePostal: e.target.value }))
                }
              />

              <input
                className="form-control mb-2"
                placeholder="Ville"
                value={editValues.ville}
                onChange={(e) =>
                  setEditValues(prev => ({ ...prev, ville: e.target.value }))
                }
              />

              <input
                className="form-control mb-3"
                placeholder="Téléphone"
                value={editValues.numeroTelephone}
                onChange={(e) =>
                  setEditValues(prev => ({ ...prev, numeroTelephone: e.target.value }))
                }
              />

              <button
                className="btn btn-success me-2"
                onClick={handleCreateAddress}
              >
                Créer
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setEditId(null)}
              >
                Annuler
              </button>
            </div>
          )}

          {addresses.length === 0 && (
            <p>Aucune adresse enregistrée</p>
          )}

          {/* LISTE DES ADRESSES */}
          {addresses.map((addr) => (
            <div key={addr._id} className="mb-3 border-top pt-3">

              {editId === addr._id ? (
                <>
                  <input
                    className="form-control mb-2"
                    value={editValues.rue}
                    onChange={(e) =>
                      setEditValues(prev => ({ ...prev, rue: e.target.value }))
                    }
                  />

                  <input
                    className="form-control mb-2"
                    value={editValues.codePostal}
                    onChange={(e) =>
                      setEditValues(prev => ({ ...prev, codePostal: e.target.value }))
                    }
                  />

                  <input
                    className="form-control mb-2"
                    value={editValues.ville}
                    onChange={(e) =>
                      setEditValues(prev => ({ ...prev, ville: e.target.value }))
                    }
                  />

                  <input
                    className="form-control mb-3"
                    value={editValues.numeroTelephone}
                    onChange={(e) =>
                      setEditValues(prev => ({ ...prev, numeroTelephone: e.target.value }))
                    }
                  />

                  <button
                    className="btn btn-success me-2"
                    onClick={() => handleUpdateAddress(addr._id)}
                  >
                    Valider
                  </button>

                  <button
                    className="btn btn-secondary"
                    onClick={() => setEditId(null)}
                  >
                    Annuler
                  </button>
                </>
              ) : (
                <>
                  <p className="mb-1">{addr.rue}</p>
                  <p className="mb-1">{addr.codePostal} {addr.ville}</p>
                  <p className="mb-2">{addr.numeroTelephone}</p>

                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => {
                      setEditId(addr._id)
                      setEditValues({
                        rue: addr.rue,
                        codePostal: addr.codePostal,
                        ville: addr.ville,
                        numeroTelephone: addr.numeroTelephone
                      })
                    }}
                  >
                    Modifier
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDeleteAddress(addr._id)}
                  >
                    Supprimer
                  </button>
                </>
              )}

            </div>
          ))}

        </div>
      </div>

      {/* ==================== */}
      {/* DEVIS EN COURS */}
      {/* ==================== */}
      <div className="card mb-4">
        <div className="card-body">

          <h4 className="card-title mb-3">Mes devis</h4>

          <table className="table table-striped table-hover">
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
                          {formatDate(reservation.devis?.dateIt)}
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

        </div>
      </div>

      {/* ==================== */}
      {/* ACTIONS COMPTE */}
      {/* ==================== */}
      <div className="card mb-4">
        <div className="card-body">

          <h4 className="card-title mb-3">Gestion du compte</h4>

          {/* 🔹 PASSWORD */}
          <div className="mb-4">
            <h5>Modifier mot de passe</h5>

            <input
              className="form-control mb-2"
              type="password"
              placeholder="Ancien mot de passe"
              value={passwordValues.oldPassword}
              onChange={(e) =>
                setPasswordValues(prev => ({ ...prev, oldPassword: e.target.value }))
              }
            />

            <input
              className="form-control mb-2"
              type="password"
              placeholder="Nouveau mot de passe"
              value={passwordValues.newPassword}
              onChange={(e) =>
                setPasswordValues(prev => ({ ...prev, newPassword: e.target.value }))
              }
            />

            <PasswordChecklist password={passwordValues.newPassword} />

            <input
              className="form-control mb-3"
              type="password"
              placeholder="Confirmer le nouveau mot de passe"
              value={passwordValues.confirmPassword}
              onChange={(e) =>
                setPasswordValues(prev => ({ ...prev, confirmPassword: e.target.value }))
              }
            />

            {passwordError && (
              <div className="alert alert-danger py-2" role="alert">
                {passwordError}
              </div>
            )}

            <button className="btn btn-warning" onClick={handleUpdatePassword}>
              Modifier mot de passe
            </button>
          </div>

          {/* 🔴 DANGER ZONE */}
          <div className="border-top pt-3">
            <h5 className="text-danger">Zone de danger</h5>

            <button
              className="btn btn-danger"
              onClick={handleDeleteAccount}
            >
              Supprimer mon compte
            </button>
          </div>

        </div>
      </div>

    </div >
  );
};

export default Profil