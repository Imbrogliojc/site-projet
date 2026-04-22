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
  const [user, setUser] = useState(null)
  const [editUser, setEditUser] = useState(false)
  const [userValues, setUserValues] = useState({
    userName: "",
    email: ""
  })
  const [addresses, setAddresses] = useState([])
  const [editId, setEditId] = useState(null)
  const [editValues, setEditValues] = useState({
    rue: "",
    codePostal: "",
    ville: "",
    numeroTelephone: ""
  })
  const [passwordValues, setPasswordValues] = useState({
    oldPassword: "",
    newPassword: ""
  })

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
      await axios.put(`${URL.ADDRESS}/update/${id}`,
        editValues,
        { withCredentials: true }
      )

      setEditId(null)
      fetchAddress()

    } catch (error) {
      console.log(error)
    }
  }

  // Partie password

  const handleUpdatePassword = async () => {
    try {
      await axios.put(`${URL.USER}/password`,
        passwordValues,
        { withCredentials: true }
      )

      setPasswordValues({
        oldPassword: "",
        newPassword: ""
      })

      alert("Mot de passe mis à jour !")

    } catch (error) {
      console.log(error)
    }
  };

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Supprimer votre compte !")
    if (!confirmDelete) return

    try {
      await axios.delete(`${URL.USER}/profile`, {
        withCredentials: true
      })

      localStorage.removeItem("auth")
      navigate('/')

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
      {/* MON ADRESSE */}
      {/* ==================== */}
      <div className="card mb-4">
        <div className="card-body">

          <h4 className="card-title mb-3">Mon adresse</h4>

          {addresses.length === 0 ? (
            <>
              <p>Aucune adresse enregistrée</p>

              <button
                className="btn btn-primary mb-3"
                onClick={() => setEditId("new")}
              >
                Ajouter une adresse
              </button>

              {editId === "new" && (
                <>
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
                    className="btn btn-success"
                    onClick={handleCreateAddress}
                  >
                    Créer
                  </button>
                </>
              )}
            </>
          ) : (
            addresses.map((addr) => (
              <div key={addr._id} className="mb-3">

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
                      className="btn btn-primary btn-sm"
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
                  </>
                )}

              </div>
            ))
          )}

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
              className="form-control mb-3"
              type="password"
              placeholder="Nouveau mot de passe"
              value={passwordValues.newPassword}
              onChange={(e) =>
                setPasswordValues(prev => ({ ...prev, newPassword: e.target.value }))
              }
            />

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

    </div>
  );
};

export default Profil