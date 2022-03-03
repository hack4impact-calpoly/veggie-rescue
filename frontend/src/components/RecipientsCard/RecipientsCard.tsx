import React, { useLayoutEffect, useState } from 'react';
import './RecipientsCard.css';

const RecipientsCard = (props: any) => {
  return(
    <div className = "donors-card">
      <div className="donor-name">{ props.donor }</div>
      <div className="entry-container">
        <div className="donors-entry">
          <div className="donors-entry-title">Entity Type</div>
          <div className="donors-entry-text">{ props.entityType }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Demographic Name</div>
          <div className="donors-entry-text">{ props.demographicName }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Food Type</div>
          <div className="donors-entry-text">{ props.foodType }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Combined Area Name</div>
          <div className="donors-entry-text">{ props.areaName }</div>
        </div>
      </div>
    </div>
  );
}

export default RecipientsCard;