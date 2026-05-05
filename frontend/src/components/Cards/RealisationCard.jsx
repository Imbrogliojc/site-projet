import React from 'react'

const RealisationCard = ({ title, description, image }) => {
  return (
    <div className={"card h-100 border-0 shadow-sm rounded-4 overflow-hidden"}>
      <img
        src={image}
        className="card-img-top"
        alt={title}
      />

      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
      </div>
    </div>
  );
}

export default RealisationCard;