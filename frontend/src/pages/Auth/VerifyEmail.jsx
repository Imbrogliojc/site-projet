import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useSearchParams } from "react-router-dom";
import URL from "../../config/api.js";

const VerifyEmail = () => {

    // searchParams sert à lire les paramètres de l’URL. setSearchParams servirait à les modifier, mais ici je n’en ai pas besoin
    // const [searchParams, setSearchParams] = useSearchParams();

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");

    const [status, setStatus] = useState("loading");
    const [message, setMessage] = useState("Vérification de votre email en cours...");

    // Mémoire interne : évite de lancer deux fois la vérification email
    // si le useEffect est exécuté plusieurs fois en développement
    const hasRun = useRef(false);

    useEffect(() => {

        // Si la vérification a déjà été lancée, on stop
        // Sinon, on note qu’elle a été lancée
        if (hasRun.current) return;
        hasRun.current = true;

        const verifyEmail = async () => {
            if (!token) {
                setStatus("error");
                setMessage("Token de vérification manquant.");
                return;
            }

            try {
                await axios.get(`${URL.USER}/verify?token=${token}`);

                setStatus("success");
                setMessage("Votre email a bien été vérifié. Vous pouvez maintenant vous connecter.");

            } catch (error) {
                console.log(error);

                setStatus("error");
                setMessage("Le lien de vérification est invalide ou a déjà été utilisé.");
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-5">
                    <div className="card card-orange-outline rounded-4">
                        <div className="card-body p-4 p-md-5 text-center">

                            <h1 className="h3 fw-bold mb-3">
                                Vérification de l’email
                            </h1>

                            {status === "loading" && (
                                <div className="alert alert-info">
                                    {message}
                                </div>
                            )}

                            {status === "success" && (
                                <div className="alert alert-success">
                                    {message}
                                </div>
                            )}

                            {status === "error" && (
                                <div className="alert alert-danger">
                                    {message}
                                </div>
                            )}

                            <Link to="/login" className="btn btn-warning w-100 fw-semibold mt-3">
                                Aller à la connexion
                            </Link>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default VerifyEmail;