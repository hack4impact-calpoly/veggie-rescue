import React, { useState, useEffect } from 'react';

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
    lbsDroppedOff: number
}

export default function NewLogWrapper() {

    const [wrapperCurrentPosition, setWrapperCurrentPosition] = useState<number>(0);
    const [forceNext, setForceNext] = useState<boolean>(false);
    const [doneFlag, setDoneFlag] = useState<boolean>(false);
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

    useEffect(() => {
        if (doneFlag === true) {
            // MAKE API CALL HERE
            console.log("submittng with: " + JSON.stringify(pickupDeliveryObject, null, 2));
        }
      }, [doneFlag, pickupDeliveryObject]);
    

    return (
        <div className='container'>
            <NavBar setWrapperCurrentPosition={setWrapperCurrentPosition} forceNext={forceNext} setForceNext={setForceNext}/>
            {wrapperCurrentPosition === 0 && 
                <PickupDelivery setPickupDeliveryObject={setPickupDeliveryObject} 
                                PickupDeliveryObject={pickupDeliveryObject} 
                                setForceNext={setForceNext}/>
            }
            {wrapperCurrentPosition === 1 &&
                <Location setPickupDeliveryObject={setPickupDeliveryObject} 
                          PickupDeliveryObject={pickupDeliveryObject} 
                          setForceNext={setForceNext} />
            }
            {wrapperCurrentPosition === 2 && 
                <Weight setPickupDeliveryObject={setPickupDeliveryObject} PickupDeliveryObject={pickupDeliveryObject} setDoneFlag={setDoneFlag}/>
            }
        </div>
    );
}
