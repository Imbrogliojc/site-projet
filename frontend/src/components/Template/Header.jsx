import React from 'react'
import { useContext } from 'react'
import { AuthContext } from '../../utils/context/AuthContext.jsx'

// Import { HEADER_LINK } from './Header.js'
import { HEADER_LINK } from '../../config/navigation'

// Import { Navlink } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

// Import du CSS
import './header.css'

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext)
    return (
        <header>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* Brand */}
                    <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
                        {/* React, image à mettre dans : public ou import depuis src/assets */}
                        <img
                            src="/05-assets/Logo_factice-v1.jpg"
                            alt="Logo"
                            height="32"
                            className="d-inline-block align-text-top"
                        />
                        <span className="brand-name">CMS Auto</span>
                    </NavLink>

                    {/* Burger */}
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Ouvrir / fermer le menu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Links */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {/* C'est ici que je .map mon fichier header.js */}
                            {HEADER_LINK.map((Link) => (
                                <li className="nav-item" key={Link.label}>

                                    <NavLink
                                        to={Link.path}
                                        className={({ isActive }) =>
                                            `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                                        }
                                    >
                                        {Link.label}
                                    </NavLink>

                                </li>
                            ))}
                            {!currentUser ? (
                                <>
                                    <li className="nav-item ms-lg-5">
                                        <NavLink to="/login" className="nav-auth-link nav-auth-outline">
                                            <i className="bi bi-box-arrow-in-right me-1"></i>
                                            Se connecter
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/register" className="nav-auth-link nav-auth-filled">
                                            <i className="bi bi-person-plus me-1"></i>
                                            Créer un compte
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item d-flex align-items-center ms-lg-5">
                                        <span className="user-name-text">
                                            Bonjour {currentUser?.userName}
                                        </span>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/profil" className="profile-badge-link">
                                            <i className="bi bi-person-circle me-1"></i>
                                            Mon profil
                                        </NavLink>
                                    </li>

                                    {currentUser?.role === "admin" && (
                                        <li className="nav-item">
                                            <NavLink
                                                to="/admin"
                                                className={({ isActive }) =>
                                                    `nav-link nav-link-custom ${isActive ? "active" : ""}`
                                                }
                                            >
                                                Admin
                                            </NavLink>
                                        </li>
                                    )}

                                    <li className="nav-item">
                                        <button type="button" onClick={logout} className="nav-logout-button">
                                            <i className="bi bi-box-arrow-right me-1"></i>
                                            Déconnexion
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header