import React, { useState, useEffect } from 'react';
import axios from "axios";
import URL from '../../../config/api';

const AdminAddress = () => {
    const [addresses, setAddresses] = useState([])
    const [editId, setEditId] = useState(null)
    const [editValues, setEditValues] = useState({
        rue: "",
        codePostal: "",
        ville: "",
        numeroTelephone: ""
    })

    useEffect(() => {
        fetchAddresses()
    }, [])

    const fetchAddresses = async () => {
        try {
            const response = await axios.get(URL.ADDRESS, {
                withCredentials: true
            })
            console.log(response.data)
            setAddresses(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async (address) => {
        try {
            await axios.put(
                `${URL.ADDRESS}/update/${address._id}`,
                {
                    rue: editValues.rue,
                    codePostal: editValues.codePostal,
                    ville: editValues.ville,
                    numeroTelephone: editValues.numeroTelephone
                },
                { withCredentials: true }
            )
            setEditValues({
                rue: "",
                codePostal: "",
                ville: "",
                numeroTelephone: ""
            })
            setEditId(null)
            fetchAddresses()

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimez cette adresse ?")
        if (!confirmDelete) return

        try {
            await axios.delete(`${URL.ADDRESS}/delete/${id}`, {
                withCredentials: true
            })
            fetchAddresses()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid p-4">

            <h2 className="mb-4">Gestion des adresses</h2>

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Utilisateur</th>
                        <th>Rue</th>
                        <th>Ville</th>
                        <th>Code postal</th>
                        <th>Téléphone</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {addresses.map((address) => (
                        <tr key={address._id}>

                            <td className="text-muted small">{address._id}</td>

                            <td>{address.member?.userName || "-"}</td>

                            {/* ========================= */}
                            {/* CHAMPS */}
                            {/* ========================= */}
                            <td>
                                {editId === address._id ? (
                                    <input
                                        className="form-control form-control-sm"
                                        value={editValues.rue}
                                        onChange={(e) =>
                                            setEditValues(prev => ({ ...prev, rue: e.target.value }))
                                        }
                                    />
                                ) : (
                                    address.rue
                                )}
                            </td>

                            <td>
                                {editId === address._id ? (
                                    <input
                                        className="form-control form-control-sm"
                                        value={editValues.ville}
                                        onChange={(e) =>
                                            setEditValues(prev => ({ ...prev, ville: e.target.value }))
                                        }
                                    />
                                ) : (
                                    <address className="ville"></address>
                                )}
                            </td>

                            <td>
                                {editId === address._id ? (
                                    <input
                                        className="form-control form-control-sm"
                                        value={editValues.codePostal}
                                        onChange={(e) =>
                                            setEditValues(prev => ({ ...prev, codePostal: e.target.value }))
                                        }
                                    />
                                ) : (
                                    address.codePostal
                                )}
                            </td>

                            <td>
                                {editId === address._id ? (
                                    <input
                                        className="form-control form-control-sm"
                                        value={editValues.numeroTelephone}
                                        onChange={(e) =>
                                            setEditValues(prev => ({ ...prev, numeroTelephone: e.target.value }))
                                        }
                                    />
                                ) : (
                                    address.numeroTelephone
                                )}
                            </td>

                            {/* ========================= */}
                            {/* ACTIONS */}
                            {/* ========================= */}
                            <td>
                                <div className="d-flex justify-content-center gap-2">

                                    {editId === address._id ? (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleUpdate(address)}
                                        >
                                            <i className="bi bi-check"></i>Valider
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    setEditId(address._id)
                                                    setEditValues({
                                                        rue: address.rue || "",
                                                        ville: address.ville || "",
                                                        codePostal: address.codePostal || "",
                                                        numeroTelephone: address.numeroTelephone || ""
                                                    })
                                                }}
                                            >
                                                <i className="bi bi-pencil-square"></i>Modifier
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(address._id)}
                                            >
                                                <i className="bi bi-trash"></i>Supprimer
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

export default AdminAddress