import React, { useContext, useState } from 'react'
import { AuthContext } from '../../utils/context/AuthContext.jsx'

// Import { HEADER_LINK } from './Header.js'
import { HEADER_LINK } from '../../config/navigation'

// Import { Navlink } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

// Import du CSS
import './header.css'

const Header = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const closeMenu = () => {
        setIsMenuOpen(false)
    }

    return (
        <header>

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* Brand */}
                    <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
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
                        onClick={() => setIsMenuOpen(prev => !prev)}
                        aria-controls="navbarNav"
                        aria-expanded={isMenuOpen}
                        aria-label="Ouvrir / fermer le menu"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Links */}
                    <div className={`navbar-collapse ${isMenuOpen ? "show" : "collapse"}`} id="navbarNav">
                        <ul className="navbar-nav main-nav-center align-items-lg-center">

                            {/* C'est ici que je .map mon fichier header.js */}
                            {HEADER_LINK.map((Link) => (
                                <li className="nav-item" key={Link.label}>

                                    <NavLink
                                        to={Link.path}
                                        onClick={closeMenu}
                                        className={({ isActive }) =>
                                            `nav-link nav-link-custom ${isActive ? 'active' : ''}`
                                        }
                                    >
                                        {Link.label}
                                    </NavLink>

                                </li>
                            ))}
                        </ul>

                        <ul className="navbar-nav ms-lg-auto align-items-lg-center">
                            {!currentUser ? (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/login" onClick={closeMenu} className="nav-auth-link nav-auth-outline">
                                            <i className="bi bi-box-arrow-in-right me-1"></i>
                                            Se connecter
                                        </NavLink>
                                    </li>

                                    <li className="nav-item">
                                        <NavLink to="/register" onClick={closeMenu} className="nav-auth-link nav-auth-filled">
                                            <i className="bi bi-person-plus me-1"></i>
                                            Créer un compte
                                        </NavLink>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item d-flex align-items-center">
                                        <span className="user-name-text">
                                            Bonjour {currentUser?.userName}
                                        </span>
                                    </li>

                                    {currentUser?.role === "admin" && (
                                        <li className="nav-item">
                                            <NavLink
                                                to="/admin"
                                                onClick={closeMenu}
                                                className={({ isActive }) =>
                                                    `nav-link nav-link-custom ${isActive ? "active" : ""}`
                                                }
                                            >
                                                Admin
                                            </NavLink>
                                        </li>
                                    )}

                                    <li className="nav-item">
                                        <NavLink to="/profil" onClick={closeMenu} className="profile-badge-link">
                                            <i className="bi bi-person-circle me-1"></i>
                                            Mon profil
                                        </NavLink>
                                    </li>


                                    <li className="nav-item">
                                        <button type="button"
                                            onClick={() => {
                                                closeMenu()
                                                logout()
                                            }}
                                            className="nav-logout-button">
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