import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// components and assets
import Spinner from '../Spinner/Spinner';
import NavBar from '../NavBar/NavBar';
import PickupDelivery from '../PickupDelivery/PickupDelivery';
import Location from '../Locations/Location';
import Weight from '../Weight/Weight';

// import vehicle for API call
import {
  updateVehicle,
  reset as resetVehicles
} from '../../features/vehicles/VehiclesSlice';

export default function NewLogWrapper() {
  // local state
  const [wrapperCurrentPosition, setWrapperCurrentPosition] =
    useState<number>(0);
  const [forceNext, setForceNext] = useState<boolean>(false);
  const [doneFlag, setDoneFlag] = useState<boolean>(false);
  const [pickupDeliveryObject, setPickupDeliveryObject] =
    useState<PickupDeliveryObjectSchema>({
      pickupOrDelivery: 0,
      id: '',
      date: '',
      driver: '',
      vehicle: '',
      name: '',
      EntityType: '',
      LocationType: '',
      Demographic: '',
      Area: '',
      foodAllocation: new Map<String, number>()
    });

  // setup navigation and services
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // get the vehicle object from the store
  const {
    vehicle,
    isLoading: vehicleIsLoading,
    isSuccess: vehicleIsSuccess,
    isUpdate
  } = useAppSelector((state) => state.vehicle);

  // Get the driver object from the store
  const { driver } = useAppSelector((state) => state.driverAuth);
  const { isError: isPickupError } = useAppSelector((state) => state.pickups);
  const { isError: isDropoffError } = useAppSelector((state) => state.dropoffs);

  useEffect(() => {
    // catches when a new log has been set
    if (doneFlag && !vehicleIsLoading) {
      setDoneFlag(false);
      // Check and see if it is pickup or delivery
      if (pickupDeliveryObject.pickupOrDelivery === 1) {
        // PICKUP
        // food items contains all of the valid food types/weights from the pickup -- filter out zero weights 
        const foodItems = new Map<String, number>();
        pickupDeliveryObject.foodAllocation.forEach(
          (value: number, key: String) => {
            if (value <= 0) {
              toast.error(`Food type ${key} must have a nonzero weight`);
            } else {
              foodItems.set(key, value);
            }
          }
        );

        foodItems.forEach((weight: number, foodType: String) => {
          // vehicle alreayd has food type -- add to existing weight
          if (vehicle.totalFoodAllocation.has(foodType)) {
            const newWeight =
              vehicle.totalFoodAllocation.get(foodType) + weight;
            vehicle.totalFoodAllocation.set(foodType, newWeight);
            // food type not already in vehicle
          } else {
            vehicle.totalFoodAllocation.set(foodType, weight);
          }
        });

        // this means the log was empty -- should never get here
        if (foodItems.size === 0) {
          toast.error('Pickup must contain at least one item');
        } else {
          const newPickup: Pickup = {
            date: Date.now().toString(),
            driver: driver.name,
            vehicle: vehicle.name,
            name: pickupDeliveryObject.name,
            donorEntityType: pickupDeliveryObject.EntityType,
            area: pickupDeliveryObject.Area,
            foodAllocation: foodItems
          };
          const addPickupToVehicle: PickupSchema = {
            _id: vehicle._id,
            currentPickups: newPickup,
            totalFoodAllocation: vehicle.totalFoodAllocation
          };

          dispatch(updateVehicle(addPickupToVehicle));
        }
        // const weightCalc = total + pickupDeliveryObject.lbsDroppedOff;
        // if (pickupDeliveryObject.lbsDroppedOff === 0) {
        //   toast.error('Log must have weight');
        // } else {
        //   const addPickupToVehicle: PickupSchema = {
        //     _id: vehicle._id,
        //     currentPickups: newPickup,
        //     totalWeight: weightCalc
        //   };

        //   // here we can dispatch the object
        //   dispatch(updateVehicle(addPickupToVehicle));
        // }
      } else if (pickupDeliveryObject.pickupOrDelivery === 2) {
        // DELIVERY

        // TODO
        // loop through the dropoff items and make sure none are zero, throw a specific error if they are
        // create a filtered list of dropoff foods/weights containing items with > 0 weight
        // loop through each nonzero weight in the dropoff, and check if it exists in the vehicle
        // if the food type is not in the vehicle throw an error specifying food type
        // if the food type is in the vehicle make sure the amount they want to drop off can be subtracted,
        // if not throw an error saying the food type, how much they tried to drop off and how much is in the vehicle
        // if all is good then subtract the weight and create a new dropoff 
        const newDropoff: Dropoff = {
          date: Date.now().toString(),
          driver: driver.name,
          vehicle: vehicle.name,
          name: pickupDeliveryObject.name,
          recipientEntityType: pickupDeliveryObject.EntityType,
          demographic: pickupDeliveryObject.Demographic,
          area: pickupDeliveryObject.Area,
          foodAllocation: pickupDeliveryObject.foodAllocation
        };

        // error checking for dropoff log
        let total = 0;
        vehicle.totalFoodAllocation.forEach((value: number) => {
          if (value === 0) {
            toast.error('Log must have weight');
          } else {
            total += value;
          }
        });
        const weightCalc = total - pickupDeliveryObject.lbsDroppedOff;
        if (weightCalc < 0) {
          toast.error('Not enough produce in vehicle.');
        } else if (pickupDeliveryObject.lbsDroppedOff === 0) {
          toast.error('Must enter some weight.!!');
        } else {
          const addDropOffToVehicle: DropoffSchema = {
            _id: vehicle._id,
            currentDropoffs: newDropoff,
            totalWeight: weightCalc
          };

          // here we can dispatch the object
          dispatch(updateVehicle(addDropOffToVehicle));
        }
      }
    }

    if (vehicleIsSuccess && isUpdate) {
      dispatch(resetVehicles());
      navigate('/Dashboard');
    }
    // if(isPickupError || isDropoffError)
    // {
    //     toast.error("Something went wrong with your api call.")
    // }
  }, [
    doneFlag,
    pickupDeliveryObject,
    navigate,
    driver.name,
    vehicle.name,
    vehicle.totalFoodAllocation,
    vehicleIsSuccess,
    vehicle._id,
    dispatch,
    vehicleIsLoading,
    isUpdate,
    isPickupError,
    isDropoffError
  ]);

  if (vehicleIsLoading) {
    return <Spinner />;
  }
  return (
    <div className="container pt-10 pl-5 pr-5">
      <NavBar
        setWrapperCurrentPosition={setWrapperCurrentPosition}
        forceNext={forceNext}
        setForceNext={setForceNext}
      />
      {wrapperCurrentPosition === 0 && (
        <PickupDelivery
          setPickupDeliveryObject={setPickupDeliveryObject}
          PickupDeliveryObject={pickupDeliveryObject}
          setForceNext={setForceNext}
        />
      )}
      {wrapperCurrentPosition === 1 && (
        <Location
          setPickupDeliveryObject={setPickupDeliveryObject}
          PickupDeliveryObject={pickupDeliveryObject}
          setForceNext={setForceNext}
        />
      )}
      {wrapperCurrentPosition === 2 && (
        <Weight
          setPickupDeliveryObject={setPickupDeliveryObject}
          PickupDeliveryObject={pickupDeliveryObject}
          setDoneFlag={setDoneFlag}
        />
      )}
    </div>
  );

  interface PickupDeliveryObjectSchema {
    pickupOrDelivery: number;
    id: String;
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    EntityType: String;
    LocationType: String;
    Demographic: String;
    Area: String;
    foodAllocation: Map<String, number>;
  }
  interface PickupSchema {
    _id: String;
    currentPickups: {
      date: String;
      driver: String;
      vehicle: String;
      name: String;
      donorEntityType: String;
      area: String;
      foodAllocation: Map<String, number>;
    };
    totalFoodAllocation: Map<String, number>;
  }

  interface DropoffSchema {
    _id: String;
    currentDropoffs: {
      date: String;
      driver: String;
      vehicle: String;
      name: String;
      recipientEntityType: String;
      demographic: String;
      area: String;
      foodAllocation: Map<String, number>;
    };
    totalFoodAllocation: Map<String, number>;
  }
  interface Dropoff {
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    recipientEntityType: String;
    demographic: String;
    area: String;
    foodAllocation: Map<String, number>;
  }
  interface Pickup {
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    area: String;
    foodAllocation: Map<String, number>;
  }
}
function useRecoilState(value: WritableDraft<Number>) {
  throw new Error('Function not implemented.');
}
