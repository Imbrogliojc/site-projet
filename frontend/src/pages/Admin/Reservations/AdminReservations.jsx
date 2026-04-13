import React, { useState, useEffect } from 'react';
import axios from "axios";
import URL from "../../../config/api.js";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([])
  const [editId, setEditId] = useState(null)
  const [editValues, setEditValues] = useState({
    note: "",
    dateIt: "",
    heureIt: ""
  })

  useEffect(() => {
    fetchReservations()
  }, [])

  const fetchReservations = async () => {
    try {
      const response = await axios.get(URL.RESERVATIONS, {
        withCredentials: true
      })
      console.log(response.data)
      setReservations(response.data)

    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Voulez-vous vraiment supprimer cette réservation ?")
    if (!confirmDelete) return
    try {
      await axios.delete(`${URL.RESERVATIONS}/delete/${id}`, {
        withCredentials: true
      })
      fetchReservations()

    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdate = async (reservation) => {
    try {
      // 1️⃣ update note (reservation)
      await axios.put(
        `${URL.RESERVATIONS}/update/${reservation._id}`,
        { note: editValues.note },
        { withCredentials: true }
      )

      // 2️⃣ update date + heure (devis)
      if (reservation.devis?._id) {
        await axios.put(
          `${URL.DEVIS}/update/${reservation.devis?._id}`,
          {
            dateIt: editValues.dateIt,
            heureIt: editValues.heureIt
          },
          { withCredentials: true }
        )
      }
      setEditValues({
        note: "",
        dateIt: "",
        heureIt: ""
      })

      setEditId(null)
      fetchReservations()

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="container-fluid p-4">

      <h2 className="mb-4">Gestion des réservations</h2>

      <table className="table table-striped table-hover align-middle">

        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Client</th>
            <th>Service</th>
            <th>Véhicule</th>
            <th>Date</th>
            <th>Heure</th>
            <th>Prix</th>
            <th>Note</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation._id}>

              <td className="text-muted small">{reservation._id}</td>

              <td>{reservation.devis?.member?.userName || "-"}</td>

              <td>{reservation.devis?.service?.serviceName || "-"}</td>

              <td>
                {reservation.devis?.marqueVehicule || "-"} {reservation.devis?.modeleVehicule || "-"}
              </td>

              <td>
                <i className="bi bi-calendar-date"></i>{" "}
                {reservation.devis?.dateIt || "—"}
              </td>

              <td>
                <i className="bi bi-clock"></i>{" "}
                {reservation.devis?.heureIt || "—"}
              </td>

              <td>{reservation.devis?.prixTtc ? `${reservation.devis.prixTtc}€` : "-"} </td>

              {/* ========================= */}
              {/* NOTE */}
              {/* ========================= */}
              <td>
                {editId === reservation._id ? (
                  <div className="d-flex flex-column gap-2">

                    <input
                      className="form-control form-control-sm"
                      type="text"
                      placeholder="Note"
                      value={editValues.note}
                      onChange={(e) =>
                        setEditValues(prev => ({ ...prev, note: e.target.value }))
                      }
                    />

                    <input
                      className="form-control form-control-sm"
                      type="date"
                      value={editValues.dateIt}
                      onChange={(e) =>
                        setEditValues(prev => ({ ...prev, dateIt: e.target.value }))
                      }
                    />

                    <input
                      className="form-control form-control-sm"
                      type="time"
                      value={editValues.heureIt}
                      onChange={(e) =>
                        setEditValues(prev => ({ ...prev, heureIt: e.target.value }))
                      }
                    />

                  </div>
                ) : (
                  reservation.note || "Aucune note"
                )}
              </td>

              {/* ========================= */}
              {/* ACTIONS */}
              {/* ========================= */}
              <td>
                <div className="d-flex justify-content-center align-items-center gap-2">

                  {editId === reservation._id ? (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => handleUpdate(reservation)}
                    >
                      <i className="bi bi-check"></i> Valider
                    </button>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => {
                          setEditId(reservation._id)
                          setEditValues({
                            note: reservation.note || "",
                            dateIt: reservation.devis?.dateIt || "",
                            heureIt: reservation.devis?.heureIt || ""
                          })
                        }}
                      >
                        <i className="bi bi-pencil-square"></i> Modifier
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(reservation._id)}
                      >
                        <i className="bi bi-trash"></i> Supprimer
                      </button>
                    </>
                  )}

                </div>
              </td>

            </tr>
          ))}
        </tbody>

      </table>
    </div>
  )
}

export default AdminReservations