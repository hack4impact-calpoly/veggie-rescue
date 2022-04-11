import React, { useState, useEffect } from 'react';

import './PickupDelivery.css'

interface Props {
    setPickupDeliveryObject : Function
    PickupDeliveryObject    : pickupDeliveryObjectSchema
}

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

export default function PickupDelivery({setPickupDeliveryObject, PickupDeliveryObject} : Props) {

    const [styleButton1, setStyleButton1] = useState<string>('large-wrapper');
    const [styleButton2, setStyleButton2] = useState<string>('large-wrapper');

    useEffect(() => {
        initStyle(PickupDeliveryObject.pickupOrDelivery)
    })

    const changeStyle = (buttonToChange : number) => {
        if (buttonToChange === 1){
            setPickupDeliveryObject({
                ...PickupDeliveryObject,
                pickupOrDelivery : 1
            })
            setStyleButton1('large-wrapper-selected')
            setStyleButton2('large-wrapper')
        }
        else{
            setPickupDeliveryObject({
                ...PickupDeliveryObject,
                pickupOrDelivery : 2
            })
            setStyleButton2('large-wrapper-selected')
            setStyleButton1('large-wrapper')
        }
    }

    const initStyle = (isPickup : number) => {
        if (isPickup === 0 ){
            setStyleButton1('large-wrapper')
            setStyleButton2('large-wrapper')
        }
        else if (isPickup === 1){
            setStyleButton1('large-wrapper-selected')
            setStyleButton2('large-wrapper')
        }
        else if (isPickup === 2){
            setStyleButton1('large-wrapper')
            setStyleButton2('large-wrapper-selected')
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
