import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import RealisationCard from '../../components/Cards/RealisationCard'
import { realisationsData } from '../../utils/data/realisationsData'
import { NavLink } from 'react-router'

const Realisations = () => {

  return (
    <div>

      {/* 🔹 HERO */}
      <Carousel variant="realisations" />

      <div className="container my-5">

        <h2 className="text-center mb-4">Nos projets</h2>

        <div className="row g-4">
          {realisationsData.map((item, index) => (
            <div className="col-12 col-lg-4" key={index}>
              <RealisationCard
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>

        <section className="text-center mt-5">
          <NavLink to="/devis" className="btn btn-warning btn-lg">
            Demander un devis
          </NavLink>
        </section>

      </div>
    </div>
  )
}

export default Realisations