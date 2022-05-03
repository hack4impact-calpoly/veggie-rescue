import React, { useLayoutEffect, useState } from 'react';
import './RecipientsCard.css';

const RecipientsCard = (props: any) => {
  const sendData = () =>{
    console.log(props.recipient)
    props.handleShow()
    props.recipientHandler(props.recipient)
  }
  return(
    <button onClick={sendData}>
      <div className = "donors-card">
        <div className="donor-name">{ props.recipient.name }</div>
        <div className="entry-container">
          <div className="donors-entry">
            <div className="donors-entry-title">Entity Type</div>
            <div className="donors-entry-text">{ props.recipient.recipientEntityType }</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Demographic Name</div>
            <div className="donors-entry-text">{ props.recipient.demographic }</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Food Type</div>
            <div className="donors-entry-text">
            {(props.recipient.foodType).map((v:any, index:any) => {
              return(
                <div>{(index ? ',' : '')}{v}</div>
              );
            })}
            </div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Combined Area Name</div>
            <div className="donors-entry-text">{ props.recipient.area }</div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default RecipientsCard;