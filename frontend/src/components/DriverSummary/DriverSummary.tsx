import React from 'react';
import "./DriverSummary.css"
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';
import { useState } from 'react';
import { toast } from 'react-toastify';

function DriverSummary() {
  return <div className = "all-page">
    <button id="icon">
      <img className='backButton' src={NavBarButton_DARK} alt="Back Button"/>
    </button>

    <p className = "punchOutHeader"> Punch Out </p>

    <h1 className = "goodbyeMessage"> Bye Diana! </h1>
    <h2 className = "summary"> Today's Summary </h2>

  {/* Get Clock in/Clock Out */}

    <div className = "weight-container"> 
      <p className = "weight"> 100</p>
      <p className = "units">lbs</p>
    </div>

    <h3 className = "droppedOff">Dropped off</h3>

    <label className = "discrepancy"> Discrepancies </label>

    <form>
      <textarea className = "discrepancy-container" id="discrepancies" placeholder="Los Alamos Foundation">
      </textarea>
    </form>

    <button className = "signOutButton"> Sign Out </button>

  </div>
}

export default DriverSummary;
