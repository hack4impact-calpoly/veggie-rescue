import React, { useState } from 'react'
import './NavBar.css'

//notes: 3 stages: trip type, pickup location, and pounds picked up
// Change button dudes to just a div with onclick={() => move Scroll}

export default function NavBar() {

    const [progressBarPercent, setProgressBarPercent] = useState<number>(33);

    const shiftLeftRight = (leftOrRight: number) => {
        //INPUT: -1 for shift left, else for shift right
        //OUTPUT: NULL
        if (leftOrRight === -1 && progressBarPercent > 33){
            setProgressBarPercent(progressBarPercent - 33)
        }
        else if (leftOrRight === 1 && progressBarPercent < 99){
            setProgressBarPercent(progressBarPercent + 33)
        }
    }

    // const shiftBar = () => {

    // }

    return (
        <main>
            <div className="topLayer">
                <button onClick={() => shiftLeftRight(-1)}>Left!</button>
                <p className="text">Paragraph</p>
                <button onClick={() => shiftLeftRight(1)}>Right</button>
            </div>
            <div className='progressBar'>
                {/* <Progress completed={50}/> */}
            </div>
        </main>
    )
}