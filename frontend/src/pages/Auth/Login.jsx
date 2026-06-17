import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext.jsx";
import { FIELD_LOGIN } from "../../utils/constants/FieldLogin.js";
import { Link } from "react-router-dom";

const Login = () => {
  const { login, error, isLoading } = useContext(AuthContext);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.email || !user.password) {
      return;
    }

    login(user);
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card card-orange-outline rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold">Connexion</h1>
                <p className="text-muted mb-0">
                  Connectez-vous pour accéder à votre espace personnel.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {FIELD_LOGIN.map((field) => (
                  <div className="mb-3" key={field.id}>
                    <label htmlFor={field.id} className="form-label">
                      {field.label}
                    </label>

                    <input
                      id={field.id}
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={user[field.name]}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                ))}
                {/* error sert à stocker une erreur liée à l'authentification */}
                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}
                {/* isLoading indique qu'une action est en cours */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-warning w-100 fw-semibold mt-2"
                >
                  {isLoading ? "Connexion en cours..." : "Se connecter"}
                </button>
              </form>

              <div className="text-center mt-3">
                <Link
                  to="/forgotPassword"
                  className="small text-decoration-none"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              <hr className="my-4" />

              <p className="text-center mb-0 small">
                Pas encore de compte ?{" "}
                <Link to="/register" className="fw-semibold text-decoration-none">
                  Créer un compte
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;