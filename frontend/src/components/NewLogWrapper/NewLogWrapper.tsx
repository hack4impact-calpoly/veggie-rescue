import React, { useState } from 'react';

import NavBar from '../NavBar/NavBar'
import PickupDelivery from '../PickupDelivery/PickupDelivery'
import Location from '../Locations/Location'
import Weight from '../Weight/Weight'

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
    lbsDroppedOff: Number
}

export default function NewLogWrapper() {

    const [wrapperCurrentPosition, setWrapperCurrentPosition] = useState<number>(0);

    const [pickupDeliveryObject, setPickupDeliveryObject] = useState<pickupDeliveryObjectSchema>(
        {
            pickupOrDelivery: 0,
            id: '',
            date: '',
            driver: '',
            vehicle: '',
            name: '',
            recipientEntityType: '',
            demographic: '',
            foodType: '',
            area: '',
            lbsDroppedOff: 0
          }
    );

    return (
        <div className='container'>
            <NavBar setWrapperCurrentPosition={setWrapperCurrentPosition}/>
            {wrapperCurrentPosition === 0 && 
                <PickupDelivery setPickupDeliveryObject={setPickupDeliveryObject} PickupDeliveryObject={pickupDeliveryObject} />
            }
            {wrapperCurrentPosition === 1 &&
                <Location />
            }
            {wrapperCurrentPosition === 2 && 
                <Weight />
            }
        </div>
    );
}
