import React from 'react'
import Carousel from '../../components/Carousel/Carousel'

const Home = () => {
  return (
    <div>

      {/* 🔹 HERO */}
      <Carousel
        variant="home"
        title="Votre spécialiste automobile"
        description="Achat, rénovation et personnalisation de véhicules"
        image="https://placehold.co/1200x400"
      />

      <div className="container my-5">

        {/* 🔹 PRESENTATION */}
        <section className="text-center mb-5">
          <h2 className="mb-3">À propos de nous</h2>
          <p className="lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Nous accompagnons nos clients dans leurs projets automobiles
            avec expertise et passion.
          </p>
        </section>

        {/* 🔹 BLOC 1 */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">

              <div className="col-md-6">
                <div className="card-body p-4">
                  <h3>Un savoir-faire reconnu</h3>
                  <p className="text-muted mb-0">
                    Carrosserie, peinture et rénovation intérieure.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="col-md-6">
                <img
                  src="https://placehold.co/600x400"
                  alt=""
                  className="img-fluid h-100 w-100 object-fit-cover"
                />
              </div>

            </div>
          </div>
        </section>

        {/* 🔹 BLOC 2 */}
        <section className="mb-5">
          <div className="card border-0 shadow-sm rounded-4 overflow-hidden">
            <div className="row g-0 align-items-center">

              <div className="col-md-6 order-md-2">
                <div className="card-body p-4">
                  <h3>Des prestations sur mesure</h3>
                  <p className="text-muted mb-0">
                    Adaptées à chaque véhicule et chaque client.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>

              <div className="col-md-6 order-md-1">
                <img
                  src="https://placehold.co/600x400"
                  alt=""
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