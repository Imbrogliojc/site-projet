import React, { useState } from "react";
import axios from "axios";
import URL from "../../config/api.js";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import { validatePassword } from "../../utils/validators/passwordValidator.js";
import PasswordChecklist from "../../components/Auth/PasswordChecklist.jsx";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    const [passwordValues, setPasswordValues] = useState({
        password: "",
        confirmPassword: ""
    });

    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (event) => {
        const { name, value } = event.target;

        setPasswordValues((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!passwordValues.password || !passwordValues.confirmPassword) {
            setErrorMessage("Veuillez remplir les deux champs.");
            return;
        }

        if (passwordValues.password !== passwordValues.confirmPassword) {
            setErrorMessage("Les mots de passe ne correspondent pas.");
            return;
        }

        const passwordValidation = validatePassword(passwordValues.password)

        if (!passwordValidation.isValid) {
            setErrorMessage("Le mot de passe ne respecte pas les règles de sécurité.")
            return
        }

        try {
            const response = await axios.post(
                `${URL.USER}/resetPassword/${token}`,
                { password: passwordValues.password }
            );

            console.log("Password reset :", response.data);

            setErrorMessage("");
            toast.success("Mot de passe modifié !");
            navigate("/login");

        } catch (error) {
            console.log("Erreur :", error);
            setErrorMessage("Le lien est invalide ou expiré.");
            toast.error("Erreur lors du reset !");
        }
    };

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <div className="card card-orange-outline rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h1 className="h3 fw-bold">Nouveau mot de passe</h1>

                                <p className="text-muted mb-0">
                                    Choisissez un nouveau mot de passe pour sécuriser votre compte.
                                </p>
                            </div>

                            {errorMessage && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">
                                        Nouveau mot de passe
                                    </label>

                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder="Votre nouveau mot de passe"
                                        value={passwordValues.password}
                                        onChange={handleChange}
                                    />

                                    <PasswordChecklist password={passwordValues.password} />

                                </div>

                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">
                                        Confirmer le nouveau mot de passe
                                    </label>

                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        className="form-control"
                                        placeholder="Confirmez votre mot de passe"
                                        value={passwordValues.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100 fw-semibold mt-2"
                                >
                                    Réinitialiser le mot de passe
                                </button>
                            </form>

                            <hr className="my-4" />

                            <div className="text-center small">
                                <p className="mb-1">
                                    Vous vous souvenez de votre mot de passe ?
                                </p>

                                <Link to="/login" className="fw-semibold text-decoration-none">
                                    Se connecter
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ResetPassword;