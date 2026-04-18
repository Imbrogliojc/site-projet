import React from 'react'
import Carousel from '../../components/Carousel/Carousel'

const Services = () => {
  return (
    <div>

      {/* 🔹 HERO */}
      <Carousel
        variant="services"
        title="Nos services"
        description="Des prestations adaptées à tous vos besoins automobiles"
        image="https://placehold.co/1200x400"
      />

      <div className="container my-5">

        {/* 🔹 SERVICES PRINCIPAUX */}
        <section className="mb-5">
          <h2 className="text-center mb-4">Nos prestations</h2>

          <div className="row g-4">

            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
                <img src="https://placehold.co/400x250" className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">Achat / Revente</h5>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet, accompagnement complet pour l'achat
                    ou la vente de votre véhicule.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
                <img src="https://placehold.co/400x250" className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">Carrosserie / Peinture</h5>
                  <p className="card-text">
                    Réparation, rénovation et peinture de votre véhicule avec
                    un rendu professionnel.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow">
                <img src="https://placehold.co/400x250" className="card-img-top" alt="" />
                <div className="card-body">
                  <h5 className="card-title">Aménagement intérieur</h5>
                  <p className="card-text">
                    Personnalisation intérieure : ciel de toit, finitions et
                    amélioration du confort.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* 🔹 APPROCHE (CARD HORIZONTALE) */}
        <section>
          <h2 className="text-center mb-4">Notre approche</h2>

          <div className="card shadow">
            <div className="row g-0 align-items-center">

              <div className="col-md-6">
                <img
                  src="https://placehold.co/600x400"
                  alt=""
                  className="img-fluid rounded-start"
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
                  <a href="/devis" className="btn btn-warning">
                    Demander un devis
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default Services