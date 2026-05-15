import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../../config/api.js";

const formatDate = (date) => {
    if (!date) return "-"
    return new Date(date).toLocaleDateString("fr-FR")
}

const formatTypeClient = (typeClient) => {
    if (typeClient === "particulier") return "Particulier"
    if (typeClient === "pro") return "Professionnel"
}

const AdminDevis = () => {
    const [devis, setDevis] = useState([])
    const [editId, setEditId] = useState(null)
    const [services, setServices] = useState([])
    const [reservations, setReservations] = useState([])
    const [editValues, setEditValues] = useState({
        prixTtc: "",
        dateIt: "",
        heureIt: "",
        service: ""
    })

    useEffect(() => {
        fetchDevis()
        fetchServices()
        fetchReservations()
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

    const fetchReservations = async () => {
        try {
            const response = await axios.get(URL.RESERVATIONS, { withCredentials: true })
            setReservations(response.data)
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

            alert("Réservation créée avec succès !")
            fetchReservations()

        } catch (error) {
            console.log(error.response.data)
        }
    }

    const handleArchive = async (id) => {
        try {
            await axios.put(`${URL.DEVIS}/archive/${id}`,
                {},
                // { status: "archived" },
                { withCredentials: true }
            )
            fetchDevis()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Supprimer ce devis ?")
        if (!confirmDelete) return
        try {
            await axios.delete(`${URL.DEVIS}/delete/${id}`, {
                withCredentials: true
            })
            fetchDevis()

        } catch (error) {
            console.log(error)
        }
    }

    const devisEnCours = devis.filter(d => d.status !== "archived")
    const devisArchives = devis.filter(d => d.status === "archived")

    return (
        <div className="container-fluid p-4">

            <h2 className="mb-4">Gestion des devis</h2>
            <h3>Devis en cours</h3>

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>Client</th>
                        <th>Type client</th>
                        <th>Service</th>
                        <th>Véhicule</th>
                        <th>Photos</th>
                        <th>Réponse</th>
                        <th>Actions</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {devisEnCours.map((d) => {
                        const reservationExists = reservations.some(
                            (reservation) => reservation.devis?._id === d._id
                        )

                        return (
                            <tr key={d._id}>

                                {/* 🔹 CLIENT */}
                                <td>{d.member?.userName}</td>

                                {/* 🔹 TYPE CLIENT */}
                                <td>
                                    <span className="badge bg-light text-dark border">
                                        {formatTypeClient(d.typeClient)}
                                    </span>
                                </td>

                                {/* 🔹 SERVICE */}
                                <td>{d.service?.serviceName || "—"}</td>

                                {/* 🔹 VEHICULE */}
                                <td>
                                    {d.marqueVehicule} {d.modeleVehicule}
                                </td>

                                {/* 🔹 PHOTOS */}
                                <td>
                                    {d.pieceJointe && d.pieceJointe.length > 0 ? (
                                        <div className="d-flex flex-wrap gap-1">
                                            {d.pieceJointe.map((img, index) => (
                                                <img
                                                    key={index}
                                                    src={`http://localhost:8000${img}`}
                                                    alt="devis"
                                                    width="70"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() =>
                                                        window.open(`http://localhost:8000${img}`, "_blank")
                                                    }
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        "—"
                                    )}
                                </td>

                                {/* 🔹 REPONSE */}
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
                                            <span>{d.prixTtc ? `${d.prixTtc} €` : "—"}</span>

                                            <span className="text-muted small">
                                                <i className="bi bi-calendar-date"></i> {formatDate(d.dateIt)}
                                            </span>

                                            <span className="text-muted small">
                                                <i className="bi bi-clock"></i> {d.heureIt || "—"}
                                            </span>
                                        </div>
                                    )}
                                </td>

                                {/* 🔹 ACTIONS */}
                                <td>
                                    <div className="d-flex justify-content-center align-items-center gap-2">

                                        {editId === d._id ? (
                                            <button
                                                className="btn btn-success btn-sm"
                                                onClick={() => handleUpdate(d._id)}
                                            >
                                                <i className="bi bi-check"></i> Valider
                                            </button>
                                        ) : (
                                            <>
                                                <button
                                                    className={`btn btn-sm ${d.status === "validated"
                                                        ? "btn-primary"
                                                        : "btn-warning"
                                                        }`}
                                                    onClick={() => handleEdit(d)}
                                                >
                                                    <i className="bi bi-pencil-square"></i>{" "}
                                                    {d.status === "validated" ? "Modifier" : "Traiter"}
                                                </button>

                                                {d.status === "validated" && (
                                                    reservationExists ? (
                                                        <button
                                                            className="btn btn-success btn-sm"
                                                            disabled
                                                        >
                                                            <i className="bi bi-check-circle"></i> Réservé
                                                        </button>
                                                    ) : (
                                                        <button
                                                            className="btn btn-warning btn-sm"
                                                            onClick={() => handleCreateReservation(d._id)}
                                                        >
                                                            <i className="bi bi-calendar-plus"></i> Créer réservation
                                                        </button>
                                                    )
                                                )}

                                                {d.status === "validated" && (
                                                    <button
                                                        className="btn btn-secondary btn-sm"
                                                        onClick={() => handleArchive(d._id)}
                                                    >
                                                        <i className="bi -bi-archive"></i>Archiver
                                                    </button>
                                                )}

                                                <button
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(d._id)}
                                                >
                                                    <i className="bi bi-trash"></i> Supprimer
                                                </button>
                                            </>
                                        )}

                                    </div>
                                </td>

                                {/* 🔹 STATUS */}
                                <td>
                                    {d.status === "validated" ? (
                                        <span className="badge bg-success">Validé</span>
                                    ) : (
                                        <span className="badge bg-warning text-dark">En attente</span>
                                    )}
                                </td>

                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <h3>Devis archivés</h3>
            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>Client</th>
                        <th>Type client</th>
                        <th>Service</th>
                        <th>Véhicule</th>
                        <th>Photos</th>
                        <th>Réponse</th>
                        <th>Actions</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {devisArchives.map((d) => (
                        <tr key={d._id}>

                            {/* 🔹 CLIENT */}
                            <td>{d.member?.userName}</td>

                            {/* 🔹 TYPE CLIENT */}
                            <td>
                                <span className="badge bg-light text-dark border">
                                    {formatTypeClient(d.typeClient)}
                                </span>
                            </td>

                            {/* 🔹 SERVICE */}
                            <td>{d.service?.serviceName || "—"}</td>

                            {/* 🔹 VEHICULE */}
                            <td>
                                {d.marqueVehicule} {d.modeleVehicule}
                            </td>

                            {/* 🔹 PHOTOS */}
                            <td>
                                {d.pieceJointe && d.pieceJointe.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-1">
                                        {d.pieceJointe.map((img, index) => (
                                            <img
                                                key={index}
                                                src={`http://localhost:8000${img}`}
                                                alt="devis"
                                                width="70"
                                                style={{ cursor: "pointer" }}
                                                onClick={() =>
                                                    window.open(`http://localhost:8000${img}`, "_blank")
                                                }
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    "—"
                                )}
                            </td>

                            {/* 🔹 REPONSE */}
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
                                        <span>{d.prixTtc ? `${d.prixTtc} €` : "—"}</span>

                                        <span className="text-muted small">
                                            <i className="bi bi-calendar-date"></i> {formatDate(d.dateIt)}
                                        </span>

                                        <span className="text-muted small">
                                            <i className="bi bi-clock"></i> {d.heureIt || "—"}
                                        </span>
                                    </div>
                                )}
                            </td>

                            {/* 🔹 ACTIONS */}
                            <td>
                                <div className="d-flex justify-content-center align-items-center gap-2">
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(d._id)}
                                    >
                                        <i className="bi bi-trash"></i> Supprimer
                                    </button>
                                </div>
                            </td>

                            {/* 🔹 STATUS */}
                            <td>
                                <span className="badge bg-secondary">Archivé</span>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    )
}

export default AdminDevis