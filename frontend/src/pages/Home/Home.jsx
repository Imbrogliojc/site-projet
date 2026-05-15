import React from 'react'
import Carousel from '../../components/Carousel/Carousel'

const Home = () => {
  return (
    <div>

      {/* 🔹 HERO */}
      <Carousel variant="home" />

      <div className="container my-5">

        {/* 🔹 PRESENTATION */}
        <section className="text-center mb-5">
          <h2 className="mb-3">À propos de nous</h2>
          <p className="lead">
            Nous accompagnons nos clients dans l’achat, la remise en état
            et la valorisation de véhicules d’occasion. Notre objectif est de proposer
            des solutions adaptées, avec un suivi clair et un travail soigné.
          </p>
        </section>

        {/* 🔹 BLOC 1 */}
        <section className="mb-5">
          <div className="card card-orange-outline rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">

              <div className="col-12 col-lg-6 order-2 order-lg-1">
                <div className="card-body p-4">
                  <h3>Un savoir-faire automobile</h3>
                  <p className="text-muted mb-0 horizontal-card-text">
                    De la carrosserie à la peinture, nous intervenons sur différents besoins
                    afin de redonner de la valeur et du caractère à chaque véhicule.
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6 order-1 order-lg-2">
                <img
                  src="/images/home/savoirFaireAdapte.webp"
                  alt="Un savoir-faire automobile"
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>

            </div>
          </div>
        </section>

        {/* 🔹 BLOC 2 */}
        <section className="mb-5">
          <div className="card card-orange-outline rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">

              <div className="col-12 col-lg-6 order-2 order-lg-2">
                <div className="card-body p-4">
                  <h3>Des prestations sur mesure</h3>
                  <p className="text-muted mb-0 horizontal-card-text">
                    Chaque projet est étudié selon l’état du véhicule, les attentes du client
                    et le niveau d’intervention souhaité.
                  </p>
                </div>
              </div>

              <div className="col-12 col-lg-6 order-1 order-lg-1">
                <img
                  src="/images/home/prestationSurMesure.webp"
                  alt="Des prestations sur mesure"
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>

            </div>
          </div>
        </section>

        {/* 🔹 CTA */}
        <section className="text-center">
          <a href="/devis" className="btn btn-warning btn-lg">
            Demander un devis
          </a>
        </section>

      </div>
    </div>
  )
}

export default Home