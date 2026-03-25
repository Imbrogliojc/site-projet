import React, { useState, useContext } from 'react';
import { AuthContext } from "../../utils/context/AuthContext.jsx";
import { FIELD_LOGIN } from "../../utils/constants/FieldLogin.js";

const Login = () => {

    const { login, error, isLoading } = useContext(AuthContext)

    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        login(user)
    }

    return (
        <form onSubmit={handleSubmit}>

            {FIELD_LOGIN.map((field) => (
                <div key={field.id}>
                    <label>{field.label}</label>
                    <input
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
                {isLoading ? "Chargement en cours !" : "Login"}
            </button>

        </form>
    )
}

export default Login