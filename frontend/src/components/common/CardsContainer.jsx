import React from 'react';
import './CardsContainer.scss';

const CardsContainer = ({ fetchedData, children }) => {
  return (
    <section className="cards">
      {children}
      <div className="cards-wrapper">{fetchedData}</div>
    </section>
  );
};

export default CardsContainer;
