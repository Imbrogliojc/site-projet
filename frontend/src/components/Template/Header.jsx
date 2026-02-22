import React from 'react'

// Import { HEADER_LINK } from './Header.js'
import { HEADER_LINK } from '../../config/navigation'

// Import { Navlink } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

// Import du CSS
import './header.css'

const Header = () => {
    return (
        <header>Header

            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    {/* Brand */}
                    <NavLink className="navbar-brand d-flex align-items-center gap-2" to="/">
                        {/* React, image à mettre dans : public ou import depuis src/assets */}
                        <img
                            src="/05-assets/Logo_factice-v1.jpg"
                            alt="Logo Nom de l’entreprise"
                            height="32"
                            className="d-inline-block align-text-top"
                        />
                        <span className="fw-semibold">Nom de l’entreprise</span>
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
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header