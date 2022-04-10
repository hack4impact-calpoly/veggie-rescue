import React, { useLayoutEffect, useState } from 'react';
import './DonorsCard.css';

const DonorsCard = (props: any) => {
  return(
    <div>
      <div className = "donors-card">
        <div className="donor-name">{ props.donor }</div>
        <div className="entry-container">
        <div className="donors-entry">
          <div className="donors-entry-title">Entity Type</div>
          <div className="donors-entry-text">{ props.entityType }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Location Type</div>
          <div className="donors-entry-text">{ props.locationType }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Food Type</div>
          <div className="donors-entry-text">
            {(props.foodType).map((v:any, index:any) => {
              return(
                <div>{(index ? ', ' : '')}{v}</div>
              );
            })}
          </div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Combined Area Name</div>
          <div className="donors-entry-text">{ props.areaName }</div>
        </div>
        </div>
    </div>
    </div>
  );
}

export default DonorsCard;