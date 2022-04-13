import React, { useLayoutEffect, useState } from 'react';
import './VolunteersCard.css';
import { RiUser3Fill } from 'react-icons/ri';

const NewVolunteersCard = (props: any) => {

  return(
    <div className="volunteer-card" id="new-card">
      <h3 className="new-card-text">Add New</h3>
      <h3 className="new-card-text">+</h3>
    </div>
  );
}

export default NewVolunteersCard;