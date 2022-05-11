import React, { useState } from 'react';

import NumPad from '../NumPad/NumPad';


import './Weight.css';
    interface pickupDeliveryObjectSchema {
    pickupOrDelivery: number,
    id: String,
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    EntityType: String,
    LocationType: String,
    Demographic: String,
    FoodType: String,
    Area: String,
    lbsDroppedOff: number
}

interface Props {
  setPickupDeliveryObject : Function
  PickupDeliveryObject    : pickupDeliveryObjectSchema
  setDoneFlag             : Function
}

export default function Weight({PickupDeliveryObject, setPickupDeliveryObject, setDoneFlag} : Props) {
  const [charNum, setCharNum] = useState('');
  // const [weightNum, setWeightNum] = useState(0);

  const charNumToInt = (charNum: string) => {
    if (charNum.length === 0) {
      return 0;
    }
    return parseInt(charNum);
  };

  const buttonHandler = (btnId: string) => {
    if (charNum.length > 7) {
      return;
    }
    setCharNum(charNum + btnId);
  };

  const clearHandler = () => {
    setCharNum('');
  };

  const backSpaceHandler = () => {
    setCharNum(charNum.slice(0, -1));
  };

  const submitButton = () => {
    setPickupDeliveryObject({
      ...PickupDeliveryObject,
      lbsDroppedOff : charNumToInt(charNum)
    })
    setDoneFlag(true);
    
  };

  return (
    <div className='container'>
      <main className="main">
        <div className="NumberForm">
          <span className='text-4xl'>{charNumToInt(charNum)}</span> <span className='text-3xl text-emerald-700 font-semibold'>&nbsp; lbs</span>
        </div>
      </main>
      <NumPad
        buttonHandler={buttonHandler}
        clearHandler={clearHandler}
        backSpaceHandler={backSpaceHandler}
      />
      <main className="main">
        <button className="submit_button" onClick={submitButton}>
          Submit
        </button>
      </main>
    </div>
  );
}