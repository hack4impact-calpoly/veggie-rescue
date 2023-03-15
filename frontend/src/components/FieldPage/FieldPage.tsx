import React, { useLayoutEffect, useState } from 'react';
import './VehiclesCard.css';
import { IoCar } from 'react-icons/io5';


const VehiclesCard = (props: any) => {
  const sendData = () =>{
    props.handleShow()
    props.vehicleHandler(props.vehicle)
  }
  return(

    <button onClick={sendData} >
    <div className="volunteer-card ">
      
      <div><IoCar className="car-icon" style={{color: '#FF9C55'}}/></div>
      <h3 className="volunteer-text">{ props.vehicle.name }</h3>
     
    </div>
    </button>
  );
}

export default VehiclesCard;