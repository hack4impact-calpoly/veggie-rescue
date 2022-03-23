import React, { useState } from 'react';

import NumPad from '../NumPad/NumPad';
// import NavBar from '../NavBar/NavBar';

import './Weight.css';

export default function Weight() {
  const [charNum, setCharNum] = useState('');
  const [weightNum, setWeightNum] = useState(0);

  const charNumToInt = (charNum: string) => {
    if (charNum.length === 0) {
      return 0;
    }
    return parseInt(charNum);
  };

  const buttonHandler = (btnId: string) => {
    if (charNum.length > 8) {
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
  };

  return (
    <div className='container'>
      <main className="main">
        {/* <NavBar /> */}
        <div className="NumberForm">
          {charNumToInt(charNum)} <span>&nbsp; lbs</span>
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
