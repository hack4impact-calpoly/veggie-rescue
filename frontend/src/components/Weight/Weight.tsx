import React, { useState } from 'react';

import NumPad from '../NumPad/NumPad';

import './Weight.css';

interface PickupDeliveryObjectSchema {
  pickupOrDelivery: number;
  id: String;
  date: String;
  driver: String;
  vehicle: String;
  name: String;
  EntityType: String;
  LocationType: String;
  Demographic: String;
  Area: String;
  foodAllocation: Map<String, number>;
}

interface Props {
  setPickupDeliveryObject: Function;
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setDoneFlag: Function;
}

export default function Weight({
  PickupDeliveryObject,
  setPickupDeliveryObject,
  setDoneFlag
}: Props) {
  const [charNum, setCharNum] = useState('');
  // const [weightNum, setWeightNum] = useState(0);

  const charNumToInt = (charNum2: string) => {
    if (charNum.length === 0) {
      return 0;
    }
    return parseInt(charNum2, 10);
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
      lbsDroppedOff: charNumToInt(charNum)
    });
    setDoneFlag(true);
  };

  return (
    <div className="container mb-10">
      <main className="main">
        <div className="NumberForm">
          <span className="text-4xl">{charNumToInt(charNum)}</span>{' '}
          <span className="text-3xl text-emerald-700 font-semibold">
            &nbsp; lbs
          </span>
        </div>
      </main>
      <NumPad
        buttonHandler={buttonHandler}
        clearHandler={clearHandler}
        backSpaceHandler={backSpaceHandler}
      />
      <main className="w-1/2 mb-10 mt-5 ">
        <button
          type="submit"
          className="bg-amber-500 rounded-full mt-5 p-3 text-3xl text-white font-semibold shadow w-full"
          onClick={submitButton}
        >
          Submit
        </button>
      </main>
    </div>
  );
}
