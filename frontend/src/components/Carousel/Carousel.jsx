import React from 'react'

import './Carousel.css';
import { CAROUSEL_SLIDES } from '../../config/carousel';

const Carousel = ({ variant }) => {
    const slides = CAROUSEL_SLIDES[variant] || [];
    const carouselId = `carousel-${variant}`;
    if (slides.length === 0) {
        return null;
    }

    return (

        <div id={carouselId} className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {slides.map((slide, index) => (
                    <button
                        key={index}
                        type="button"
                        data-bs-target={`#${carouselId}`}
                        data-bs-slide-to={index}
                        className={index === 0 ? "active" : ""}
                        aria-current={index === 0 ? "true" : undefined}
                        aria-label={`Slide ${index + 1}`}
                    ></button>
                ))}
            </div>

            <div className="carousel-inner">
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""}`}>
                        <div className="text-white d-flex align-items-center justify-content-center position-relative"
                            style={{
                                height: '400px',
                                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                            <div className="text-center px-4">
                                <h1 className="display-4 fw-bold">{slide.title}</h1>
                                <p className="lead">{slide.description}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>

            <button className="carousel-control-prev" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="prev">
                <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target={`#${carouselId}`} data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
        </div>
    )
}

export default Carousel