import React from 'react';
import './Logs.css';
import { IoIosArrowBack } from "react-icons/io";
import TripLog from '../../components/TripLog/TripLog';
import { vehicle } from '../../data/dbMock';

const Logs = () => {

  function handleClick(){
    console.log("button clicked");
  }

  return(
    <div className="container">
      <div className="text-container">
        <div className="your-logs">
          <button id="icon" onClick={() => {alert("hi")}}>
            <IoIosArrowBack style={{color: "FF9C55"}} />
          </button>
          <h3 id="logs-text">Your Logs</h3>
        </div>
        <div className="subtitle">
          <h3>Trip</h3>
          <h3>Name</h3>
          <h3>Pounds</h3>
        </div>
      </div>
      <div className="logs">
        {(vehicle.currentPickups).map((v,index) => {
          return(
            <TripLog
              key={index}
              trip="Pickup"
              name={v.name}
              pounds={v.lbsPickedUp} />
          );
        })}
        {(vehicle.currentDropoffs).map((v,index) => {
          return(
            <TripLog
              key={index}
              trip="Dropoff"
              name={v.name}
              pounds={v.lbsDroppedOff} />
            );
        })}
      </div>
    </div>
  );
}

export default Logs;