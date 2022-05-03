import React, { useLayoutEffect, useState } from 'react';
import './DonorsCard.css';

const DonorsCard = (props: any) => {
  const sendData = () =>{
    console.log(props.donor)
    props.handleShow()
    props.donorHandler(props.donor)
  }
  return(
    <button onClick={sendData} >
      <div className = "donors-card">
        <div className="donor-name">{ props.donor.name }</div>
        <div className="entry-container">
        <div className="donors-entry">
          <div className="donors-entry-title">Entity Type</div>
          <div className="donors-entry-text">{ props.donor.donorEntityType }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Location Type</div>
          <div className="donors-entry-text">{ props.donor.donorLocationType }</div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Food Type</div>
          <div className="donors-entry-text">
            {(props.donor.foodType).map((v:any, index:any) => {
              return(
                <div>{(index ? ', ' : '')}{v}</div>
              );
            })}
          </div>
        </div>
        <div className="donors-entry">
          <div className="donors-entry-title">Combined Area Name</div>
          <div className="donors-entry-text">{ props.donor.area }</div>
        </div>
        </div>
    </div>
    </button>
  );
}

export default DonorsCard;