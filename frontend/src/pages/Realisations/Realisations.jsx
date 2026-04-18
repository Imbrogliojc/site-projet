import React from 'react'
import Carousel from '../../components/Carousel/Carousel'
import RealisationCard from '../../components/Cards/RealisationCard'

const realisationsData = [
  {
    title: "Rénovation ciel de toit",
    description: "Remise à neuf complète.",
    image: "https://placehold.co/300x200"
  },
  {
    title: "Peinture complète",
    description: "Peinture intégrale du véhicule.",
    image: "https://placehold.co/300x200"
  },
  {
    title: "Réparation carrosserie",
    description: "Correction des impacts et rayures.",
    image: "https://placehold.co/300x200"
  },
  {
    title: "Intérieur personnalisé",
    description: "Aménagement sur mesure.",
    image: "https://placehold.co/300x200"
  },
  {
    title: "Préparation vente",
    description: "Mise en valeur avant revente.",
    image: "https://placehold.co/300x200"
  },
  {
    title: "Rénovation complète",
    description: "Projet complet véhicule.",
    image: "https://placehold.co/300x200"
  }
]

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
                variant="vertical"
                title={item.title}
                description={item.description}
                image={item.image}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default Realisations