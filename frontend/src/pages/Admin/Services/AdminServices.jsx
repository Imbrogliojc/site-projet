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
        <div>
            <h1>Gestion des services</h1>

            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    placeholder="Nom du service"
                    value={newService}
                    onChange={handleChange}
                />
                <button type="submit">Ajouter</button>
            </form>

            <table border="1" cellPadding="10">
                <thead>
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
                                        value={editValue}
                                        onChange={(e) => setEditValue(e.target.value)}
                                    />
                                ) : (
                                    service.serviceName
                                )}
                            </td>

                            <td>
                                {editId === service._id ? (
                                    <button onClick={() => handleUpdate(service._id)}>
                                        Valider
                                    </button>
                                ) : (
                                    <>
                                        <button onClick={() => handleEdit(service)}>
                                            Modifier
                                        </button>

                                        <button onClick={() => handleDelete(service._id)}>
                                            Supprimer
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
