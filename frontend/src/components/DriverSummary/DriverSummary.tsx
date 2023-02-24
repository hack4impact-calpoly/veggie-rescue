import React from 'react';
import "./DriverSummary.css"
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';

function DriverSummary() {
  return <div className = "all-page">
    <button id="icon">
      <img className='backButton' src={NavBarButton_DARK} alt="Back Button"/>
    </button>

    <p className = "punchOutHeader">Punch Out</p>

    <h1 className = "goodbyeMessage">Bye Diana!</h1>
    <h2 className = "summary">Today's Summary</h2>

    <div className = "weight-container"> 
      <p className = "weight">100</p>
      <p className = "units">lbs</p>
    </div>

    <h3 className = "droppedOff">Dropped off</h3>

    <div className = "discrepancy">
      Discrepancies
      <label>
          <textarea className = "discrepancy-container">
            The Los Alamos Foundation
          </textarea>
      </label>
    </div>

    <button className = "signOutButton">Sign Out</button>

  </div>
}

export default DriverSummary;
