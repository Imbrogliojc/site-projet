import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import ServiceCard from '../../components/Cards/ServiceCard'
import { servicesData } from '../../utils/data/servicesData'
import { NavLink } from 'react-router'

const Services = () => {
  return (
    <div>

      {/* 🔹 HERO */}
      <Carousel variant="services" />

      <div className="container my-5">

        {/* 🔹 SERVICES PRINCIPAUX */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Nos prestations</h2>

          <div className="row g-4">
            {servicesData.map((service, index) => (
              <div className="col-12 col-lg-4" key={index}>
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  image={service.image}
                />
              </div>
            ))}
          </div>
        </section>

        {/* 🔹 APPROCHE (CARD HORIZONTALE) */}
        <section>
          <h2 className="text-center mb-4">Notre approche</h2>
          <div className="card card-orange-outline rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">
              <div className="col-md-6">
                <img
                  src="/images/services/approcheAdaptee.webp"
                  alt="Une approche adaptée à chaque projet"
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">Une approche adaptée à chaque projet</h5>
                  <p className="text-muted mb-0 horizontal-card-text">
                    Chaque demande est étudiée selon l’état du véhicule, le type d’intervention
                    et les attentes du client. Nous proposons un accompagnement clair, avec une
                    estimation adaptée sur place ou à partir des informations transmises en ligne.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mt-5">
          <NavLink to="/devis" className="btn btn-warning btn-lg">
            Demander un devis
          </NavLink>
        </section>

      </div>
    </div>
  )
}

export default Services