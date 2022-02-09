import './TransferPage.css';
import React from 'react';

export default function TransferPage() {
  const vehicleType = "Van";
  const numOfPounds = 200;

  function transfer(){
    console.log("Do something to transfer!")
  }

  function leaveIt(){
    console.log("Do something to leave it!")
  }


  return (
    <>
      <div className="tPageString">{vehicleType} currently has</div>
      <div className="tPagePounds">{numOfPounds} pounds</div>
      <button className="flex items-center justify-center" onClick={transfer}> Transfer it </button>
      <button className="flex items-center justify-center" onClick={leaveIt}> Leave it </button>
    </>
  );
}
