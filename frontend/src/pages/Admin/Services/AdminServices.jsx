import React, { useState, useEffect } from "react";
import axios from "axios";
import URL from "../../../config/api.js";

const AdminServices = () => {
    const [services, setServices] = useState([])
    const [newService, setNewService] = useState("")
    const [editId, setEditId] = useState(null)
    const [editValue, setEditValue] = useState("")

    useEffect(() => {
        fetchServices()
    }, [])

    const fetchServices = async () => {
        try {
            const response = await axios.get(URL.SERVICES)
            setServices(response.data)

        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (event) => {
        setNewService(event.target.value)
    }

    const handleCreate = async (event) => {
        event.preventDefault()
        if (!newService) return
        try {
            await axios.post(`${URL.SERVICES}/create`,
                { serviceName: newService },
                { withCredentials: true }
            )
            setNewService("")
            fetchServices()

        } catch (error) {
            console.log(error)
        }
    }

    const handleEdit = (service) => {
        setEditId(service._id)
        setEditValue(service.serviceName)
    }

    const handleUpdate = async (id) => {
        try {
            await axios.put(
                `${URL.SERVICES}/update/${id}`,
                { serviceName: editValue },
                { withCredentials: true }
            )
            setEditId(null)
            setEditValue("")
            fetchServices()

        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        if (!window.confirm("Supprimer ce service ?")) return
        try {
            await axios.delete(`${URL.SERVICES}/delete/${id}`, { withCredentials: true })
            fetchServices()

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container-fluid p-4">
            <h2 className="mb-4">Gestion des services</h2>

            <form className="d-flex gap-2 mb-4" onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Nom du service"
                    value={newService}
                    onChange={handleChange}
                />
                <button className="btn btn-primary" type="submit">
                    <i className="bi bi-pencil-square"></i>Ajouter
                </button>
            </form>

            <table className="table table-striped table-hover align-middle">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nom du service</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map(service => (
                        <tr key={service._id}>

                            <td>{service._id}</td>

                            <td>
                                {editId === service._id ? (
                                    <input
                                        className="form-control form-control-sm"
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                ) : (
                                    service.serviceName
                                )}
                            </td>

                            <td className="d-flex gap-2">
                                {editId === service._id ? (
                                    <button
                                        className="btn btn-success btn-sm"
                                        onClick={() => handleUpdate(service._id)}
                                    >
                                        <i className="bi bi-check"></i>
                                    </button>
                                ) : (
                                    <>
                                        <button
                                            className="btn btn-primary btn-sm"
                                            onClick={() => handleEdit(service)}
                                        >
                                            <i className="bi bi-pencil-square"></i>Modifier
                                        </button>

                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(service._id)}
                                        >
                                            <i className="bi bi-trash"></i>Supprimer
                                        </button>
                                    </>
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    )
}

export default AdminServices
