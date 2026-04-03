import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

// POUR COMMUNIQUER AVEC L'API
import URL from "../../config/api.js";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

// AuthContext centralise les données d’authentification et les rend accessibles à toute l’application via le Provider
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        isLoggedIn()
    }, [])

    const login = async (dataForm) => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                URL.LOGIN,
                dataForm,
                { withCredentials: true }
            )
            console.log("Login success :", response.data)
            localStorage.setItem("auth", JSON.stringify(response.data))

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

    const register = async (dataForm) => {
        setIsLoading(true)
        try {
            const response = await axios.post(
                URL.REGISTER,
                dataForm
            )
            console.log("Register succes :", response.data)
            setError(null)
            toast.success("Inscription réussie !")
            navigate('/login')

        } catch (error){
            console.log("Register error :", error)
            setError("Erreur lors de l'inscription !")
            toast.error("Erreur lors de l'inscription !")
        } finally {
            setIsLoading(false)
        }
    }

    const isLoggedIn = () => {
        setIsLoading(true)
        try {
            const data = localStorage.getItem("auth")
            setCurrentUser(data ? JSON.parse(data) : null)

        } catch (error) {
            console.log("Erreur localStorage :", error)
            setCurrentUser(null)

        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        setCurrentUser(null)
        localStorage.removeItem("auth")
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, register, logout, error, isLoading }}>
            {children}
        </AuthContext.Provider>
    )

}