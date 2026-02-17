import React from 'react'

import Carousel from '../../components/Carousel/Carousel'

const Home = () => {
  return (
    <div className="container mt-4">Home
    <Carousel
    variant="home"
    title="Vous êtes à l'accueil."
    description="Découvrez toutes nos nouveautés."
    image="https://placehold.co/300x200" /> 
    </div>
  )
}

export default Home