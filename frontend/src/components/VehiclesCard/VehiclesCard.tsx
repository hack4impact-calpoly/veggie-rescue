import React, { useLayoutEffect, useState } from 'react';
import './VehiclesCard.css';
import { IoCar } from 'react-icons/io5';

const VehiclesCard = (props: any) => {
  return(
    <div className="volunteer-card">
      <div><IoCar className="car-icon" style={{color: 'FF9C55'}}/></div>
      <h3 className="volunteer-text">{ props.vehicle }</h3>
    </div>
  );
}

export default VehiclesCard;