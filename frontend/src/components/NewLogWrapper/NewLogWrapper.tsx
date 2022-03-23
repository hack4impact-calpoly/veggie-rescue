import React, { useState } from 'react';

import NavBar from '../NavBar/NavBar'
import Location from '../Locations/Location'
import Weight from '../Weight/Weight'

export default function NewLogWrapper() {

    const [wrapperCurrentPosition, setWrapperCurrentPosition] = useState<number>(0);

    return (
        <div className='container'>
            <NavBar setWrapperCurrentPosition={setWrapperCurrentPosition}/>
            {wrapperCurrentPosition === 0 && 
            <div>Nice</div>
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
