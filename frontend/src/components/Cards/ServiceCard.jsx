import React from 'react';
import './ServiceCard.css';

const ServiceCard = ({ title, description, image }) => {
  return (
    <div className="card h-100 card-orange-outline rounded-4 overflow-hidden">
      <img
        src={image}
        className="card-img-top service-card-img"
        alt={title}
      />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>

        <p className="card-text text-muted horizontal-card-text">
          {description}
        </p>
      </div>
    </div>
  )
}

export default ServiceCard