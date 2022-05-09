import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// components and assets
import Spinner from '../Spinner/Spinner';
import NavBar from '../NavBar/NavBar'
import PickupDelivery from '../PickupDelivery/PickupDelivery'
import Location from '../Locations/Location'
import Weight from '../Weight/Weight'

// import vehicle for API call
import {
  updateVehicle,
  reset as resetVehicles,
} from '../../features/vehicles/VehiclesSlice';

export default function NewLogWrapper() {
    // local state
    const [wrapperCurrentPosition, setWrapperCurrentPosition] = useState<number>(0);
    const [forceNext, setForceNext] = useState<boolean>(false);
    const [doneFlag, setDoneFlag] = useState<boolean>(false);
    const [pickupDeliveryObject, setPickupDeliveryObject] = useState<pickupDeliveryObjectSchema>({
            pickupOrDelivery: 0,
            id: '',
            date: '',
            driver: '',
            vehicle: '',
            name: '',
            EntityType: '',
            LocationType: '',
            Demographic: '',
            FoodType: '',
            Area: '',
            lbsDroppedOff: 0
          }
    );



    // setup navigation and services
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // get the vehicle object from the store
  const {
    vehicle,
    isLoading: vehicleIsLoading,
    isSuccess : vehicleIsSuccess,
    isUpdate
  } = useAppSelector((state) => state.vehicle);

  // Get the driver object from the store
  const { driver } = useAppSelector((state) => state.driverAuth);
  const { isError: isPickupError } = useAppSelector((state) => state.pickups);
  const { isError: isDropoffError } = useAppSelector((state) => state.dropoffs);

  useEffect(() => {
    // catches when a new log has been set
    if(doneFlag && !vehicleIsLoading) {
        setDoneFlag(false)
        // Check and see if it is pickup or delivery
        if(pickupDeliveryObject.pickupOrDelivery === 1){
        // this is a pickup
        const newPickup : Pickup = {
            date: Date.now().toString(),
            driver: driver.name,
            vehicle: vehicle.name,
            name: pickupDeliveryObject.name,
            donorEntityType : pickupDeliveryObject.EntityType,
            foodType: pickupDeliveryObject.FoodType,
            area: pickupDeliveryObject.Area,
            lbsPickedUp: pickupDeliveryObject.lbsDroppedOff }
        
        const weightCalc = (vehicle.totalWeight + pickupDeliveryObject.lbsDroppedOff);
        if(pickupDeliveryObject.lbsDroppedOff === 0){
            toast.error("Log must have weight")
        }else{
            const addPickupToVehicle : PickupSchema = { 
                _id: vehicle._id, 
                currentPickups: newPickup,
                totalWeight: weightCalc }
                
            // here we can dispatch the object
            dispatch(updateVehicle(addPickupToVehicle))
        }
        } else if (pickupDeliveryObject.pickupOrDelivery === 2){
        const newDropoff : Dropoff = {          
            date: Date.now().toString(),
            driver: driver.name,
            vehicle: vehicle.name,
            name: pickupDeliveryObject.name,
            recipientEntityType : pickupDeliveryObject.EntityType,
            demographic : pickupDeliveryObject.Demographic,
            foodType: pickupDeliveryObject.FoodType,
            area: pickupDeliveryObject.Area,
            lbsDroppedOff: pickupDeliveryObject.lbsDroppedOff}

        // error checking for dropoff log
        const weightCalc = (vehicle.totalWeight - pickupDeliveryObject.lbsDroppedOff)
        if(weightCalc < 0){
            toast.error("Not enough produce in vehicle.")
        }else if(pickupDeliveryObject.lbsDroppedOff === 0){
            toast.error("Must enter some weight.!!")
        }else{
            const addDropOffToVehicle : DropoffSchema = { 
                _id: vehicle._id, 
                currentDropoffs: newDropoff ,
                totalWeight: weightCalc}

            // here we can dispatch the object
            dispatch(updateVehicle(addDropOffToVehicle));}

        }
        }

        if(vehicleIsSuccess && isUpdate){
            dispatch(resetVehicles())
            navigate("/Dashboard");
        }
        // if(isPickupError || isDropoffError)
        // {
        //     toast.error("Something went wrong with your api call.")
        // }
      }, [doneFlag, pickupDeliveryObject, navigate, driver.name, vehicle.name, vehicle.totalWeight, vehicleIsSuccess, vehicle._id, dispatch, vehicleIsLoading, isUpdate, isPickupError, isDropoffError]);
    
if(vehicleIsLoading){
 return <Spinner />
}
    return (
        <div className='container pt-10 pl-5 pr-5'>
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

    interface pickupDeliveryObjectSchema {
    pickupOrDelivery: number,
    id: String,
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    EntityType: String,
    LocationType: String,
    Demographic: String,
    FoodType: String,
    Area: String,
    lbsDroppedOff: number
}
interface PickupSchema {
    _id: String;
    currentPickups: {
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    donorEntityType: String,
    foodType: String,
    area: String,
    lbsPickedUp: number,
    },
    totalWeight: number

}

interface DropoffSchema {
    _id: String;
    currentDropoffs: {
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    recipientEntityType: String,
    foodType: String,
    demographic: String,
    area: String,
    lbsDroppedOff: number,
    }, 
    totalWeight: number

}
interface Dropoff {
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    recipientEntityType: String,
    foodType: String,
    demographic: String,
    area: String,
    lbsDroppedOff: number,

}
interface Pickup {
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    donorEntityType: String,
    foodType: String,
    area: String,
    lbsPickedUp: number,
}
}