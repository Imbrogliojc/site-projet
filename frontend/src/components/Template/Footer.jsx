import React from 'react'

// Import { HEADER_LINK } from './Header.js
import { HEADER_LINK } from '../../config/navigation'

// Import { Navlink } from 'react-router'
import { NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      {/* Footer commun du site : logo, navigation rapide et informations de contact. */}

      <footer className="bg-dark text-light pt-5 pb-4 mt-5 border-top border-secondary">
        <div className="container">
          <div className="row gy-4">

            {/* 🔹 Colonne 1 : Logo et nom de l'entreprise */}
            <div className="col-md-4 d-flex flex-column align-items-start">
              {/* Logo de l’entreprise */}
              <img
                src="/05-assets/Logo_factice-v1.jpg"
                alt="Logo de l’entreprise"
                width="120"
                className="mb-2"
              />

              {/* Nom de l’entreprise */}
              <h5 className="fw-bold mb-2">CMS Auto</h5>
              <p className="small text-light opacity-75 mb-0">
                Spécialiste en rénovation et esthétique automobile.
              </p>
            </div>

            {/* 🔹 Colonne 2 : Navigation rapide */}
            <div className="col-md-4">
              <h6 className="text-uppercase fw-bold mb-3">Navigation</h6>
              <ul className="list-unstyled d-flex flex-column gap-2">

                {/* C'est ici que je .map mon fichier header.js */}
                {HEADER_LINK.map((link) => (
                  <li key={link.label}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `text-light text-decoration-none small ${isActive ? 'fw-bold' : 'opacity-75'}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}

              </ul>
            </div>

            {/* 🔹 Colonne 3 : Informations de contact */}
            <div className="col-md-4">
              <h6 className="text-uppercase fw-bold mb-3">Nous contacter</h6>

              {/* Adresse complète */}
              <address className="small text-light opacity-75 mb-3">
                <p className="mb-1">
                  <i className="bi bi-geo-alt me-2"></i>
                  123 Rue de l’Entreprise, 75000 Paris
                </p>

                <p className="mb-1">
                  <i className="bi bi-envelope me-2"></i>
                  contact@entreprise.com
                </p>

                <p className="mb-0">
                  <i className="bi bi-clock me-2"></i>
                  Lun–Ven, 9h–18h
                </p>
              </address>

              {/* Icônes réseaux sociaux */}
              <div className="d-flex gap-3 mt-3">
                <a href="#" className="text-light opacity-75 fs-5" title="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>

                <a href="#" className="text-light opacity-75 fs-5" title="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>

                <a href="#" className="text-light opacity-75 fs-5" title="LinkedIn">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>

          </div>
          <hr className="border-secondary my-4" />

          <div className="text-center small text-light opacity-75">
            © 2026 CMS Auto — Tous droits réservés.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
