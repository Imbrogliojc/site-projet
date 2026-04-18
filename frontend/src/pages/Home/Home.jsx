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
        <section className="row align-items-center mb-5">
          <div className="col-md-6">
            <h3>Un savoir-faire reconnu</h3>
            <p>
              Carrosserie, peinture et rénovation intérieure.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="col-md-6">
            <img 
              src="https://placehold.co/600x400"
              alt=""
              className="img-fluid rounded shadow"
            />
          </div>
        </section>

        {/* 🔹 BLOC 2 */}
        <section className="row align-items-center mb-5">
          <div className="col-md-6 order-md-2">
            <h3>Des prestations sur mesure</h3>
            <p>
              Adaptées à chaque véhicule et chaque client.
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <img 
              src="https://placehold.co/600x400"
              alt=""
              className="img-fluid rounded shadow"
            />
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