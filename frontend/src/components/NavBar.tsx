import React, { useState } from 'react'

import NavBarButton_DARK from './button_dark.svg';
import NavBarButton_LIGHT from './button_light.svg';
import './NavBar.css'

//notes: 3 stages: trip type, pickup location, and pounds picked up
// Change button dudes to just a div with onclick={() => move Scroll}

export default function NavBar(dataFilledOut: number ) {
    
    const [progressBarPercent, setProgressBarPercent] = useState<number>(33.3);
    const [currentPosition, setCurrentPosition] = useState<number>(0);


    const shiftLeftRight = (leftOrRight: number) => {
        //INPUT: -1 for shift left, else for shift right
        //OUTPUT: NULL
        if (leftOrRight === -1 && progressBarPercent > 33.3){
            setProgressBarPercent(progressBarPercent - 33.3)
            setCurrentPosition(currentPosition - 1);
        }
        else if (leftOrRight === 1 && progressBarPercent < 99){
            setProgressBarPercent(progressBarPercent + 33.3)
            setCurrentPosition(currentPosition + 1);
        }
    }

    const changeString = (position: number) => {
        switch (position) {
            case 0:
                return 'Trip Type';
            case 1:
                return 'Pickup Location';
            case 2:
                return 'Pounds Picked Up';
            default:
                console.error("Position went over 2 or under 0 somehow...");
                return '';
        }
    }

    const changeArrowColors = (dataFilledOut: number) => {
        if (dataFilledOut === 1) {
            return NavBarButton_DARK;
        }
        else{
            return NavBarButton_LIGHT;
        }
    }

    return (
        <main>
            <div className="topLayer">
                <button className='leftButton' onClick={() => shiftLeftRight(-1)}>
                    <img src={NavBarButton_DARK} alt='leftButton'></img>
                </button>
                <p className="text">{changeString(currentPosition)}</p>
                <button className='rightButton' onClick={() => shiftLeftRight(1)}>
                    <img src={NavBarButton_DARK} alt='rightButton'></img>
                </button>
            </div>
            <div className='progressBarWrapper'>
                <div className='progressBarMain' style={{width: `${progressBarPercent}%`}}>
                    &shy; {/*Horrifically jank. Can't get the div to render without some character here...*/}
                </div>
            </div>
        </main>
    )
}