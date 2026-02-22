import React from 'react'

// Import { HEADER_LINK } from './Header.js
import { HEADER_LINK } from '../../config/navigation'

// Import { Navlink } from 'react-router'
import { Link, NavLink } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      {/* NOTE: Pied de page commun (à factoriser sur toutes les pages). */}
      {/* TODO: Mettre en page avec Bootstrap (ex: container-fluid + row/cols). */}
      {/* TODO: Contenu prévu : logo + navigation rapide + bloc "Nous contacter". */}

      <footer class="bg-dark text-light pt-5 pb-4">
        <div class="container">
          <div class="row">

            {/* 🔹 Colonne 1 : Logo et nom de l'entreprise */}
            <div class="col-md-4 mb-4 mb-md-0 d-flex flex-column align-items-start">
              {/* Logo de l’entreprise */}
              <img
                src="/05-assets/Logo_factice-v1.jpg"
                alt="Logo de l’entreprise"
                width="120"
                class="mb-2"
              />

              {/* Nom de l’entreprise */}
              <h5 class="fw-semibold">Nom de l’entreprise</h5>
            </div>

            {/* 🔹 Colonne 2 : Navigation rapide */}
            <div class="col-md-4 mb-4 mb-md-0">
              <h6 class="text-uppercase fw-bold mb-3">Navigation</h6>
              <ul class="list-unstyled">

                {/* C'est ici que je .map mon fichier header.js */}
                {HEADER_LINK.map((Link) => (
                  <li key={Link.label}>
                    <NavLink
                      to={Link.path}
                      className={({ isActive }) =>
                        `text-light text-decoration-none ${isActive ? 'active' : ''}`
                      }
                    >
                      {Link.label}
                    </NavLink>
                  </li>
                ))}
          
              </ul>
            </div>

            {/* 🔹 Colonne 3 : Informations de contact */}
            <div class="col-md-4">
              <h6 class="text-uppercase fw-bold mb-3">Nous contacter</h6>

              {/* Adresse complète */}
              <address class="mb-2">
                123 Rue de l’Entreprise<br />
                75000 Paris<br />
                France<br />
                <strong>Ouverture :</strong> Lun–Ven, 9h–18h<br />
                <strong>Email :</strong> contact@entreprise.com
              </address>

              {/* Icônes réseaux sociaux */}
              <div class="mt-2">
                <a href="#" class="text-light me-3" title="Facebook">
                  <i class="bi bi-facebook fs-5"></i>
                </a>
                <a href="#" class="text-light me-3" title="Instagram">
                  <i class="bi bi-instagram fs-5"></i>
                </a>
                <a href="#" class="text-light" title="LinkedIn">
                  <i class="bi bi-linkedin fs-5"></i>
                </a>
              </div>
            </div>

          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer
