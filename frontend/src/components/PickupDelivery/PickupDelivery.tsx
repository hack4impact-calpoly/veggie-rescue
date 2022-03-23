import React, { useState } from 'react';

import './PickupDelivery.css'

interface Props {
    setIsPickup : Function
}

export default function PickupDelivery({setIsPickup} : Props) {

    const [styleButton1, setStyleButton1] = useState<string>('large-wrapper');
    const [styleButton2, setStyleButton2] = useState<string>('large-wrapper');

    const changeStyle = (buttonToChange : number) => {
        if (buttonToChange === 1){
            setIsPickup(true)
            setStyleButton1('large-wrapper-selected')
            setStyleButton2('large-wrapper')
        }
        else{
            setIsPickup(false)
            setStyleButton2('large-wrapper-selected')
            setStyleButton1('large-wrapper')
        }
    }

    return (
        <div className='container'>
            <div className='wrapper'>
                <div className={styleButton1} onClick={() => changeStyle(1)}>
                    Pickup
                </div>
                <div className={styleButton2} onClick={() => changeStyle(2)}>
                    Delivery
                </div>
            </div>
        </div>
    );
}
