import React, { useEffect } from 'react'
import { Carousel as BootstrapCarousel } from 'bootstrap'

import './Carousel.css';
import { CAROUSEL_SLIDES } from '../../config/carousel';

const Carousel = ({ variant }) => {
    const slides = CAROUSEL_SLIDES[variant] || [];
    const carouselId = `carousel-${variant}`;

    useEffect(() => {
        const carouselElement = document.getElementById(carouselId)

        if (carouselElement) {
            BootstrapCarousel.getOrCreateInstance(carouselElement, {
                interval: 4000,
                ride: "carousel"
            })
        }
    }, [carouselId])

    if (slides.length === 0) {
        return null;
    }

    return (

        <div id={carouselId} className="carousel slide" data-bs-ride="carousel" data-bs-interval="4000">
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
                        <div className="carousel-slide text-white d-flex align-items-center position-relative"
                            style={{
                                height: '400px',
                                backgroundImage: `linear-gradient(rgba(255, 193, 7, 0.07), rgba(20, 20, 20, 0.08)), url(${slide.image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center'
                            }}>
                            <div className="carousel-text-wrapper">
                                <div className="carousel-text-box">
                                    <h1 className="display-5 fw-bold mb-3">{slide.title}</h1>
                                    <p className="lead mb-0">{slide.description}</p>
                                </div>
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