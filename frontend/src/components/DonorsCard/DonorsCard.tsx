import React, { useLayoutEffect, useState } from 'react';
import './DonorsCard.css';

const DonorsCard = (props: any) => {
  const sendData = () => {
    console.log(props.donor);
    props.handleShow();
    props.donorHandler(props.donor);
  };
  return (
    <button onClick={sendData}>
      <div className="donors-card">
        <div className="donor-name">{props.donor.name}</div>
        <div className="entry-container">
          <div className="donors-entry">
            <div className="donors-entry-title">Organizational Structure</div>
            <div className="donors-entry-text">{props.donor.EntityType}</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Location Type</div>
            <div className="donors-entry-text">{props.donor.LocationType}</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Combined Area Name</div>
            <div className="donors-entry-text">
              {props.donor.CombinedAreaName}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default DonorsCard;
