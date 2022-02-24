import React, { useState } from 'react'

import NumPad from '../NumPad/NumPad'
import './Weight.css'

export default function Weight() {

    const [charNum, setCharNum] = useState('');

    const charNumToInt = (charNum: string) => {
        if (charNum.length === 0){
            return 0;
        }
        return parseInt(charNum);
    }

    const buttonHandler = (btnId: string) => {
        setCharNum(charNum + btnId);
      };
    
      const clearHandler = () => {
          setCharNum('');
      };
    
      const backSpaceHandler = () =>{
        setCharNum(charNum.slice(0, -1));
      }

      const submitButton = () => {
          console.log("submitting with: " + charNum + ' lbs');
      }
    
    return (
        <main>
            <div className='NumberForm'>{charNumToInt(charNum)} <span>lbs</span></div>
            <NumPad 
                buttonHandler={buttonHandler}
                clearHandler={clearHandler}
                backSpaceHandler={backSpaceHandler}
            />
            {/* {charNumToInt(charNum)} */}
            <button onClick={submitButton}>Submit</button>
        </main>
    )
}