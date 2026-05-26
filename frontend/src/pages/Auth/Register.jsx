import React, { useState, useContext } from "react";
import { AuthContext } from "../../utils/context/AuthContext.jsx";
import { FIELD_REGISTER } from "../../utils/constants/FieldRegister.js";
import { Link } from "react-router-dom";

import { validatePassword } from "../../utils/validators/passwordValidator.js";
import PasswordChecklist from "../../components/Auth/PasswordChecklist.jsx";

const Register = () => {
  const { register, error, isLoading } = useContext(AuthContext);

  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("")

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user.userName || !user.email || !user.password || !user.confirmPassword) {
      return;
    }

    if (user.password !== user.confirmPassword) {
      setPasswordError("Les mots de passe ne correspondent pas.")
      return
    }

    const passwordValidation = validatePassword(user.password)

    if (!passwordValidation.isValid) {
      setPasswordError("Le mot de passe ne respecte pas les règles de sécurité.")
      return
    }

    setPasswordError("")

    const { confirmPassword, ...dataToSend } = user;
    register(dataToSend);
  };

  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-5">
          <div className="card card-orange-outline rounded-4">
            <div className="card-body p-4 p-md-5">
              <div className="text-center mb-4">
                <h1 className="h3 fw-bold">Créer un compte</h1>
                <p className="text-muted mb-0">
                  Créez votre espace personnel pour effectuer et suivre vos demandes de devis.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                {FIELD_REGISTER.map((field) => (
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

                    {field.name === "password" && (
                      <PasswordChecklist password={user.password} />
                    )}

                  </div>
                ))}

                {passwordError && (
                  <div className="alert alert-danger py-2" role="alert">
                    {passwordError}
                  </div>
                )}

                {error && (
                  <div className="alert alert-danger py-2" role="alert">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-warning w-100 fw-semibold mt-2"
                >
                  {isLoading ? "Création du compte..." : "Créer mon compte"}
                </button>
              </form>

              <hr className="my-4" />

              <p className="text-center mb-0 small">
                Déjà inscrit ?{" "}
                <Link to="/login" className="fw-semibold text-decoration-none">
                  Se connecter
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;