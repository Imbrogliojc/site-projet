import React, { useState } from "react";
import axios from "axios";
import URL from "../../config/api.js";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!email) return;

        try {
            const response = await axios.post(`${URL.USER}/forgotPassword`, {
                email,
            });

            console.log("Email envoyé :", response.data);

            setSuccess(true);
            setErrorMessage("");
            setEmail("");
        } catch (error) {
            console.log("Erreur :", error);

            setSuccess(false);
            setErrorMessage("Une erreur est survenue. Veuillez réessayer.");
        }
    };

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <div className="card card-orange-outline rounded-4">
                        <div className="card-body p-4 p-md-5">
                            <div className="text-center mb-4">
                                <h1 className="h3 fw-bold">Mot de passe oublié</h1>
                                <p className="text-muted mb-0">
                                    Entrez votre adresse email pour recevoir un lien de
                                    réinitialisation.
                                </p>
                            </div>

                            {success && (
                                <div className="alert alert-success py-2" role="alert">
                                    Si un compte existe avec cette adresse, un email de
                                    réinitialisation a été envoyé.
                                </div>
                            )}

                            {errorMessage && (
                                <div className="alert alert-danger py-2" role="alert">
                                    {errorMessage}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Adresse email
                                    </label>

                                    <input
                                        id="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Votre adresse email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-warning w-100 fw-semibold mt-2"
                                >
                                    Envoyer le lien
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

export default ForgotPassword;