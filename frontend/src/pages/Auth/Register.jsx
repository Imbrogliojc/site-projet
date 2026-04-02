import React, { useState, useContext } from 'react';
import { AuthContext } from "../../utils/context/AuthContext.jsx";
import { FIELD_REGISTER } from '../../utils/constants/FieldRegister.js';

const Register = () => {

    const { register, error, isLoading } = useContext(AuthContext)
    const [user, setUser] = useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!user.name || !user.email || !user.password || !user.confirmPassword) {
            return
        }
        const { confirmPassword, ...dataToSend } = user
        register(dataToSend)
    }

    return (
        <form onSubmit={handleSubmit}>

            {FIELD_REGISTER.map((field) => (
                <div key={field.id}>
                    <label htmlFor={field.id}>{field.label}</label>
                    <input
                        id={field.id}
                        type={field.type}
                        name={field.name}
                        placeholder={field.placeholder}
                        value={user[field.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            {error && <p style={{ color: "red" }}>{error}</p>}
            <button type="submit" disabled={isLoading}>
                {isLoading ? "Chargement en cours !" : "Register"}
            </button>
        </form>
    )

}

export default Register