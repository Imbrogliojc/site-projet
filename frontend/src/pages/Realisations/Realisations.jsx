import React from 'react'

import RealisationCard from '../../components/Cards/RealisationCard'


{/* Test import composant 'RealisationCard' avec ses propriétés propres */}

const Realisations = () => {
  return (
    <>
    
    <div className="container mt-4">
      <RealisationCard 
      variant="vertical"
      title="Rénovation ciel de toit"
      description="Remise à neuf complète du ciel de toit avec matériaux d'origine."
      image="https://placehold.co/300x200" />
    </div>

    </>
  )
}

export default Realisations