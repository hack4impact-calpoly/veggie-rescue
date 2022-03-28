import React, { useState, useEffect } from 'react';

import NavBar from '../NavBar/NavBar'
import PickupDelivery from '../PickupDelivery/PickupDelivery'
import Location from '../Locations/Location'
import Weight from '../Weight/Weight'

export default function NewLogWrapper() {

    const [wrapperCurrentPosition, setWrapperCurrentPosition] = useState<number>(0);
    const [isPickup, setIsPickup] = useState<boolean>(false);

    return (
        <div className='container'>
            <NavBar setWrapperCurrentPosition={setWrapperCurrentPosition}/>
            {wrapperCurrentPosition === 0 && 
                <PickupDelivery setIsPickup={setIsPickup} />
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
