import React, { useState } from 'react';

import NumPad from '../NumPad/NumPad';
// import NavBar from '../NavBar/NavBar';

import './Weight.css';

interface pickupDeliveryObjectSchema {
  pickupOrDelivery: number,
  id: String,
  date: String,
  driver: String,
  vehicle: String,
  name: String,
  recipientEntityType: String,
  demographic: String,
  foodType: String,
  area: String,
  lbsDroppedOff: number
}

interface Props {
  setPickupDeliveryObject : Function
  PickupDeliveryObject    : pickupDeliveryObjectSchema
}

export default function Weight({PickupDeliveryObject, setPickupDeliveryObject} : Props) {
  const [charNum, setCharNum] = useState('');
  const [weightNum, setWeightNum] = useState(0);

  const charNumToInt = (charNum: string) => {
    if (charNum.length === 0) {
      return 0;
    }
    return parseInt(charNum);
  };

  const buttonHandler = (btnId: string) => {
    if (charNum.length > 7) {
      console.log('input is unreasonably long...');
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
    console.log('submitting with: ' + charNum + ' lbs');
    setWeightNum(charNumToInt(charNum));
    setPickupDeliveryObject({
      ...PickupDeliveryObject,
      lbsDroppedOff : charNumToInt(charNum)
    })
  };

  return (
    <div className='container'>
      <main className="main">
        <div className="NumberForm">
          <span className='test1'>{charNumToInt(charNum)}</span> <span className='test'>&nbsp; lbs</span>
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
