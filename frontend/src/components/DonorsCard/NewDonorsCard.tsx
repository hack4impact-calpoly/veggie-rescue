import React, { useLayoutEffect, useState } from 'react';
import './DonorsCard.css';
import { RiUser3Fill } from 'react-icons/ri';

const NewDonorsCard = (props: any) => {
 return(
    <div className="donors-card" id="new-card">
      <h3 className="new-card-text">Add New</h3>
      <h3 className="new-card-text">+</h3>
    </div>
 );
}

export default NewDonorsCard;