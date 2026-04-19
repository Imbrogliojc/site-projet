import React, { useState, useEffect } from 'react';
import axios from "axios";
import URL from '../../../config/api';

const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [editId, setEditId] = useState(null)
    const [editValues, setEditValues] = useState({
        role: "",
    })

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${URL.USER}/get`, { withCredentials: true })
            console.log(response.data)
            setUsers(response.data)

        } catch (error) {
            console.log(error)
        }
    };

    const handleUpdate = async (id) => {
        const confirmUpdate = window.confirm("Êtes-vous certain de vouloir changer le statut de cet utilisateur ?")
        if (!confirmUpdate) return

        try {
            await axios.put(`${URL.USER}/update/${id}`,
                {
                    role: editValues.role
                },
                { withCredentials: true }
            )
            setEditValues({
                role: "",
            })
            setEditId(null)
            fetchUsers()

        } catch (error) {
            console.log(error)
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Voulez-vous vraiment supprimez cet utilisateur ?")
        if (!confirmDelete) return

        try {
            await axios.delete(`${URL.USER}/delete/${id}`, {
                withCredentials: true
            })
            fetchUsers()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid p-4">

            <h2 className="mb-4">Gestion des utilisateurs</h2>

            <table className="table table-striped table-hover align-middle">

                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nom</th>
                        <th>Email</th>
                        <th>Rôle</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>

                            <td className="text-muted small">{user._id}</td>

                            <td>{user.userName}</td>

                            <td>{user.email}</td>

                            {/* ROLE */}
                            <td>
                                {editId === user._id ? (
                                    <select
                                        className="form-select form-select-sm"
                                        value={editValues.role}
                                        onChange={(e) =>
                                            setEditValues(prev => ({ ...prev, role: e.target.value }))
                                        }
                                    >
                                        <option value="">Choisir</option>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                ) : (
                                    <span className={`badge ${user.role === "admin" ? "bg-success" : "bg-secondary"}`}>
                                        {user.role}
                                    </span>
                                )}
                            </td>

                            {/* ACTIONS */}
                            <td>
                                <div className="d-flex justify-content-center gap-2">

                                    {editId === user._id ? (
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleUpdate(user._id)}
                                        >
                                            <i className="bi bi-check"></i> Valider
                                        </button>
                                    ) : (
                                        <>
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => {
                                                    setEditId(user._id)
                                                    setEditValues({
                                                        role: user.role || ""
                                                    })
                                                }}
                                            >
                                                <i className="bi bi-pencil-square"></i> Modifier
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(user._id)}
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

export default AdminUsers