import React from 'react'

import './RealisationCard.css';


const RealisationCard = ({ variant, title, description, image }) => {
  return (
    <div className={`card realisation-card realisation-card--${variant}`}>
      <img
        src={ image }
        className="card-img-top"
        alt={ title }
      />

      <div className="card-body">
        <h5 className="card-title">{ title }</h5>
        <p className="card-text">{ description }</p>

        <button type="button" className="btn btn-primary" disabled>
          Cliquer ici !
        </button>
      </div>
    </div>
  );
}

export default RealisationCard;