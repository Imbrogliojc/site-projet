import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import ServiceCard from '../../components/Cards/ServiceCard'
import { servicesData } from '../../utils/data/servicesData'

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
              <div className="col-md-4" key={index}>
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
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">
              <div className="col-md-6">
                <img
                  src="https://placehold.co/600x400"
                  alt=""
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>
              <div className="col-md-6">
                <div className="card-body">
                  <h5 className="card-title">Une prestation sur mesure</h5>
                  <p className="card-text">
                    Nous travaillons à l’heure ou sur devis selon vos besoins.
                    Chaque projet est étudié individuellement pour vous proposer
                    la solution la plus adaptée.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="text-center mt-5">
          <a href="/devis" className="btn btn-warning btn-lg">
            Demander un devis
          </a>
        </section>

      </div>
    </div>
  )
}

export default Services