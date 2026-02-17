import React from 'react'

import './Carousel.css';
import { CAROUSEL_SLIDES } from '../../config/carousel';

const Carousel = ({ variant }) => {
    const slides = CAROUSEL_SLIDES[variant];
    return (

        // Se souvenir pour plus tard que id="heroCarousel" devra être dynamique : home, services, réalisations

        <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>

            <div className="carousel-inner">               

                {slides.map((slide, index) => (
                <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}>                
                    {/* Plus tard modification certainement avec montage image sur fond de couleur */}
                    <div className="bg-primary text-white d-flex align-items-center justify-content-center"
                        style={{
                            height: '400px',
                            backgroundImage: `url(${slide.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}>
                        {/* L'icone ne sera peut être pas conservé */}
                        <div className="text-center">
                            <i className="bi bi-stars fs-1 mb-3"></i>
                            <h1 className="display-4">{slide.title}</h1>
                            <p className="lead">{slide.description}</p>
                            <button type="button" className="btn btn-light btn-lg">Voir les nouveautés</button>
                        </div>
                    </div>
                </div>
                ))}

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    )
}

export default Carousel