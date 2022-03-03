import React, { useLayoutEffect, useState } from 'react';
import './VolunteersCard.css';
import { RiUser3Fill } from 'react-icons/ri';

const VolunteersCard = (props: any) => {
  return(
    <div className="volunteer-card">
      <div><RiUser3Fill className="user-icon" style={{color: 'FF9C55'}}/></div>
      <h3 className="volunteer-text">{ props.name }</h3>
      <h3 className="pin-text">pin: { props.pin }</h3>
    </div>
  );
}

export default VolunteersCard;