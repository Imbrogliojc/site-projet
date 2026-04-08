import React from "react";
import { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "../context/AuthContext.jsx";

const PrivateRouteAdmin = () => {
    const { currentUser } = useContext(AuthContext)

    // ❌ pas connecté
    if (!currentUser) {
        return <Navigate to="/login" />
    }

    // ❌ pas admin
    if (currentUser.role !== "admin") {
        return <Navigate to="/" />
    }

    // ✅ admin connecté
    return <Outlet />
}

export default PrivateRouteAdmin