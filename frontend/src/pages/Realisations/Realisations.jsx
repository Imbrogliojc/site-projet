import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import RealisationCard from '../../components/Cards/RealisationCard'
import { realisationsData } from '../../utils/data/realisationsData'

const Realisations = () => {
  return (
    <div>

      {/* 🔹 HERO */}
      <Carousel
        variant="realisations"
        title="Nos réalisations"
        description="Découvrez nos projets récents"
        image="https://placehold.co/1200x400"
      />

      <div className="container my-5">

        <h2 className="text-center mb-4">Nos projets</h2>

        <div className="row g-4">
          {realisationsData.map((item, index) => (
            <div className="col-md-4" key={index}>
              <RealisationCard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>

        <section className="text-center mt-5">
          <a href="/devis" className="btn btn-warning btn-lg">
            Demander un devis
          </a>
        </section>
        
      </div>
    </div>
  )
}

export default Realisations