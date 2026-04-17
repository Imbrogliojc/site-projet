import React from 'react';
import axios from 'axios';
import URL from '../../config/api.js'
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [password, setPassword] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!password) return;

        try {
            const response = await axios.post(
                `${URL.USER}/resetPassword/${token}`,
                { password }
            );

            console.log("Password reset :", response.data);
            toast.success("Mot de passe modifié !");
            navigate('/login');

        } catch (error) {
            console.log("Erreur :", error)
            toast.error("Erreur lors du reset !")
        }
    };

    return (
        <form onSubmit={handleSubmit} >
            <div>
                <label>Nouveau mot de passe</label>
                <input
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
            </div>
            <button type="submit">Réinitialiser</button>
        </form>
    )
}

export default ResetPassword