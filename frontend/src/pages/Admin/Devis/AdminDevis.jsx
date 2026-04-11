import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../../config/api.js";

const AdminDevis = () => {
    const [devis, setDevis] = useState([])
    const [editId, setEditId] = useState(null)
    const [services, setServices] = useState([])
    const [editValues, setEditValues] = useState({
        prixTtc: "",
        dateIt: "",
        heureIt: "",
        service: ""
    })

    useEffect(() => {
        fetchDevis()
        fetchServices()
    }, [])

    const fetchDevis = async () => {
        try {
            const response = await axios.get(URL.DEVIS, { withCredentials: true })
            setDevis(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchServices = async () => {
        try {
            const response = await axios.get(URL.SERVICES)
            setServices(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (devis) => {
        setEditId(devis._id)
        setEditValues({
            prixTtc: devis.prixTtc || "",
            dateIt: devis.dateIt || "",
            heureIt: devis.heureIt || "",
            service: devis.service?._id || ""
        })
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setEditValues(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleUpdate = async (id) => {
        try {
            await axios.put(
                `${URL.DEVIS}/update/${id}`, {
                prixTtc: editValues.prixTtc,
                dateIt: editValues.dateIt,
                heureIt: editValues.heureIt,
                status: "validated",
                service: editValues.service
            },
                { withCredentials: true }
            )
            setEditId(null)
            fetchDevis()

        } catch (error) {
            console.log(error)
        }
    }

    const handleCreateReservation = async (devisId) => {
        try {
            await axios.post(
                `${URL.RESERVATIONS}/create`,
                { devis: devisId },
                { withCredentials: true }
            )
            console.log("Réservation créée !")

        } catch (error) {
            console.log(error.response.data)
        }
    }

    return (
        <div className="container-fluid p-4">

            <h2 className="mb-4">Gestion des devis</h2>

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Service</th>
                        <th>Véhicule</th>
                        <th>Réponse</th>
                        <th>Actions</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {devis.map((d) => (
                        <tr key={d._id}>

                            <td className="text-muted small">{d._id}</td>

                            <td>{d.member?.userName}</td>

                            <td>{d.service?.serviceName || "—"}</td>

                            <td>
                                {d.marqueVehicule} {d.modeleVehicule}
                            </td>

                            {/* ========================= */}
                            {/* REPONSE */}
                            {/* ========================= */}
                            <td>
                                {editId === d._id ? (
                                    <div className="d-flex flex-column gap-2">

                                        <select
                                            className="form-select form-select-sm"
                                            name="service"
                                            value={editValues.service}
                                            onChange={handleChange}
                                        >
                                            <option value="">Choisir un service</option>
                                            {services.map((s) => (
                                                <option key={s._id} value={s._id}>
                                                    {s.serviceName}
                                                </option>
                                            ))}
                                        </select>

                                        <input
                                            className="form-control form-control-sm"
                                            type="number"
                                            name="prixTtc"
                                            placeholder="Prix"
                                            value={editValues.prixTtc}
                                            onChange={handleChange}
                                        />

                                        <div className="d-flex gap-2">
                                            <input
                                                className="form-control form-control-sm"
                                                type="date"
                                                name="dateIt"
                                                value={editValues.dateIt}
                                                onChange={handleChange}
                                            />

                                            <input
                                                className="form-control form-control-sm"
                                                type="time"
                                                name="heureIt"
                                                value={editValues.heureIt}
                                                onChange={handleChange}
                                            />
                                        </div>

                                    </div>
                                ) : (
                                    <div className="d-flex flex-column">

                                        <span>
                                            {d.prixTtc ? `${d.prixTtc} €` : "—"}
                                        </span>

                                        <span className="text-muted small">
                                            <i className="bi bi-calendar-date"></i> {d.dateIt || "—"}
                                        </span>

                                        <span className="text-muted small">
                                            <i className="bi bi-clock"></i> {d.heureIt || "—"}
                                        </span>

                                    </div>
                                )}
                            </td>

                            {/* ========================= */}
                            {/* ACTIONS */}
                            {/* ========================= */}
                            <td>
                                <div className="d-flex justify-content-center align-items-center gap-2">

                                    {editId === d._id ? (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleUpdate(d._id)}
                                        >
                                            <i className="bi bi-check"></i>
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className={`btn btn-sm ${d.status === "validated" ? "btn-outline-success" : "btn-warning"}`}
                                                onClick={() => handleEdit(d)}
                                            >
                                                <i className="bi bi-pencil-square"></i>{" "}
                                                {d.status === "validated" ? "Modifier réponse" : "Traiter devis"}
                                            </button>

                                            {d.status === "validated" && (
                                                <button
                                                    className="btn btn-success btn-sm"
                                                    onClick={() => handleCreateReservation(d._id)}
                                                >
                                                    <i className="bi bi-calendar-check"></i>{" "}
                                                    Créer réservation
                                                </button>
                                            )}
                                        </>
                                    )}

                                </div>
                            </td>

                            {/* ========================= */}
                            {/* STATUS */}
                            {/* ========================= */}
                            <td>
                                {d.status === "validated" ? (
                                    <span className="badge bg-success">Validé</span>
                                ) : (
                                    <span className="badge bg-warning text-dark">En attente</span>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default AdminDevis