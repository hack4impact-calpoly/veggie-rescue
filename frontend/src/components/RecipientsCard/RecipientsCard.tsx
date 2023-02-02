import React, { useLayoutEffect, useState } from 'react';
import './RecipientsCard.css';

const RecipientsCard = (props: any) => {
  const sendData = () => {
    console.log(props.recipient);
    props.handleShow();
    props.recipientHandler(props.recipient);
  };
  return (
    <button onClick={sendData}>
      <div className="donors-card">
        <div className="donor-name">{props.recipient.name}</div>
        <div className="entry-container">
          <div className="donors-entry">
            <div className="donors-entry-title">Organizational Structure</div>
            <div className="donors-entry-text">
              {props.recipient.EntityType}
            </div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Demographics Served</div>
            <div className="donors-entry-text">
              {props.recipient.DemographicName}
            </div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Combined Area Name</div>
            <div className="donors-entry-text">
              {props.recipient.CombinedAreaName}
            </div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Food Distribution Model</div>
            <div className="donors-entry-text">change to use props</div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default RecipientsCard;
