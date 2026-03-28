import { createContext, useState } from "react";
import { useNavigate } from "react-router";

// POUR COMMUNIQUER AVEC L'API
import URL from "../config/api.js";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const login = async (dataForm) => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                URL.LOGIN,
                dataForm,
                { withCredentials: true }
            )
            console.log("Login success :", response.data)

            setCurrentUser(response.data)
            setError(null)
            toast.success("Connexion réussie !")
            navigate('/')

        } catch (error) {
            console.log("Login error :", error)
            setError("Email ou mot de passe incorrect !")
            toast.error("Erreur de connexion !")
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

}

// const register = async (dataForm) => {
//     try {
//         const response = await axios.post(
//             URL_REGISTER,
//             dataForm
//         )
//         console.log("Register success :", response.data)

//     } catch (error) {
//         console.log("Register error :", error)
//     }
// }