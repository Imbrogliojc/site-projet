import React from 'react';
import axios from 'axios';
import URL from '../../config/api.js';
import { useState } from 'react';

const ForgotPassword = () => {

    const [email, setEmail] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) return;

        try {
            const response = await axios.post(
                `${URL.USER}/forgotPassword`,
                { email }
            );

            console.log("Email envoyé :", response.data)

        } catch (error) {
            console.log("Erreur :", error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                />
            </div>
            <button type="submit">Envoyer</button>
        </form>
    )
}

export default ForgotPassword