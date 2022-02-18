import React from 'react';
import './Logs.css';
import { IoIosArrowBack } from "react-icons/io";

const Logs = () => {
  function handleClick(){
      console.log("button clicked!");
  }

  return(
    <div className="container">
      <div className="logs-container">
        <div className="your-logs">
          <button id="icon" onClick={handleClick}>
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
    </div>
  );
}

export default Logs;