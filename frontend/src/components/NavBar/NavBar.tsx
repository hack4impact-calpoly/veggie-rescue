import React, { useState } from 'react'

import NavBarButton_DARK from '../../imgs/button_dark_left.svg';
import NavBarButton_right_LIGHT from '../../imgs/button_light_right.svg';
import './NavBar.css'

export default function NavBar() {
    
    const [progressBarPercent, setProgressBarPercent] = useState<number>(33.3);
    const [currentPosition, setCurrentPosition] = useState<number>(0);
    const [maxPosition, setMaxPosition] = useState<number>(currentPosition);

    const shiftNavBarSection = (leftOrRight: number) => {
        //INPUT: -1 for shift left, else for shift right
        //OUTPUT: NULL
        if (leftOrRight === -1 && progressBarPercent > 33.3){
            setProgressBarPercent(progressBarPercent - 33.3)
            setCurrentPosition(currentPosition - 1);
        }
        else if (leftOrRight === 1 && progressBarPercent < 99){
            setProgressBarPercent(progressBarPercent + 33.3)
            setCurrentPosition(currentPosition + 1);

            setMaxPosition(Math.max(maxPosition, currentPosition + 1));
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

    const changeArrowColors = (buttonSide: number) => {
        if (maxPosition > currentPosition)
            return NavBarButton_DARK;
        else{
            if (buttonSide === 0)
                return NavBarButton_DARK;
            else
                return NavBarButton_right_LIGHT;
        }
    }

    const rotateArrow = () => {
        if (maxPosition > currentPosition){
            return {transform: `rotate(180deg)`}
        }
        else{
            return {}
        }
    }

    return (
        <main className='bg-[#F0F9F1] pt-[20px] w-full justify-around'>
            <div className="flex">
                <button className='border-none bg-[#F0F9F1] mr-auto ml-[15px] mt-[15px] rotate-0' onClick={() => shiftNavBarSection(-1)}>
                    <img src={changeArrowColors(0)} alt='leftButton'></img>
                </button>
                <p className="text-[#9BA3AC] font-Poppins text-[32px] not-italic font-normal leading-[48px] text-center">{changeString(currentPosition)}</p>
                <button className='border-none bg-[#F0F9F1] ml-auto mr-[15px] mt-[15px]' onClick={() => shiftNavBarSection(1)} style={rotateArrow()}>
                    <img src={changeArrowColors(1)} alt='rightButton'></img>
                </button>
            </div>
            <div className='mt-[20px] bg-[] w-[7/10] ml-auto mr-auto rounded-[30px]'>
                <div className='bg-[#FF9C55] rounded-[30px]' style={{width: `${progressBarPercent}%`}}>
                    &shy; {/* Can't get the div to render without some character here... */}
                </div>
            </div>
        </main>
    )
}