import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card card-orange-outline rounded-4">
                        <div className="card-body p-4 p-md-5 text-center">
                            <h1 className="display-5 fw-bold mb-3">404</h1>

                            <h2 className="h4 fw-semibold mb-3">
                                Page introuvable
                            </h2>

                            <p className="text-muted mb-4">
                                La page demandée n’existe pas ou a été déplacée.
                            </p>

                            <Link to="/" className="btn btn-warning fw-semibold">
                                Retour à l’accueil
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default NotFound;