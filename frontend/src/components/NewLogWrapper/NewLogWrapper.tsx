import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// components and assets
import Spinner from '../Spinner/Spinner';
import NavBar from '../NavBar/NavBar';
import PickupDelivery from '../PickupDelivery/PickupDelivery';
import Location from '../Locations/Location';

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
      const errors: string[] = []; // list of popups to display if form is invalid
      // mongoDB converts ts maps into objets, so need to convert back to map
      const pickupDeliveryFoodMap = new Map(
        Object.entries(pickupDeliveryObject.foodAllocation)
      );
      const vehicleFoodMap = new Map<String, number>(
        Object.entries(vehicle.totalFoodAllocation).map(([key, value]) => [
          String(key),
          value
        ])
      );

      // Check and see if it is pickup or delivery
      if (pickupDeliveryObject.pickupOrDelivery === 1) {
        // PICKUP
        // pickupFoodItems contains all of the valid food types/weights from the pickup -- filter out zero weights
        const pickupFoodItems = new Map<String, number>();

        // Contains at least on item and all weights are positive numbers
        let allAreValid =
          Array.from(pickupDeliveryFoodMap.entries()).filter(
            ([food, weight]: [string, number]) => {
              if (weight <= 0) {
                errors.push(
                  `Food ${food} must have a positive nonzero weight.`
                );
                return true;
              }
              pickupFoodItems.set(food, weight);
              return false;
            }
          ).length === 0;

        if (pickupFoodItems?.size === 0) {
          allAreValid = false;
          errors.push('Pickup must contain at least one item');
        }

        // Log was invalid (should never get here)
        if (!allAreValid) {
          errors.forEach((error) => {
            toast.error(error);
          });
        } else {
          pickupFoodItems.forEach((weight: number, foodType: String) => {
            // vehicle already has food type -- add to existing weight
            if (vehicleFoodMap.has(foodType)) {
              const existingWeight = vehicleFoodMap.get(foodType);
              const newWeight = existingWeight! + weight;
              vehicleFoodMap.set(foodType, newWeight);
              // food type not already in vehicle
            } else {
              vehicleFoodMap.set(foodType, weight);
            }
          });

          const newPickup: Pickup = {
            date: Date.now().toString(),
            driver: driver.name,
            vehicle: vehicle.name,
            name: pickupDeliveryObject.name,
            donorEntityType: pickupDeliveryObject.EntityType,
            area: pickupDeliveryObject.Area,
            foodAllocation: Object.fromEntries(pickupFoodItems)
          };
          const addPickupToVehicle: PickupSchema = {
            _id: vehicle._id,
            currentPickups: newPickup,
            totalFoodAllocation: Object.fromEntries(vehicleFoodMap)
          };
          dispatch(updateVehicle(addPickupToVehicle));
        }
      } else if (pickupDeliveryObject.pickupOrDelivery === 2) {
        // DELIVERY
        // dropoffFoodItems contains all of the valid food types/weights to dropoff -- filter out zero weights
        const dropoffFoodItems = new Map<String, number>();

        pickupDeliveryFoodMap.forEach((weight: number, food: String) => {
          dropoffFoodItems.set(food, weight);
        });

        let allAreValid =
          Array.from(dropoffFoodItems.entries()).filter(
            ([foodType, weight]: [String, number]) => {
              if (weight <= 0) {
                errors.push(
                  `Food ${foodType} must have a positive nonzero weight.`
                );
                return true;
              }
              // vehicle has food type -- try to subtract from existing weight
              if (vehicleFoodMap.has(foodType)) {
                const existingWeight = vehicleFoodMap.get(foodType)!;
                const newWeight = existingWeight - weight;
                // ERROR vehicle does not have enough of food type to subtract from
                if (newWeight < 0) {
                  errors.push(
                    `Cannot drop off ${weight}lbs of ${foodType}. Only ${existingWeight}lbs is in the vehicle.`
                  );
                  return true;
                  // set new weight in vehicle
                }
                if (newWeight === 0) {
                  vehicleFoodMap.delete(foodType);
                  return false;
                }
                vehicleFoodMap.set(foodType, newWeight);
                return false;

                // ERROR food type does not exist in vehicle
              }
              errors.push(`Food type ${foodType} is not in the vehicle.`);
              return true;
            }
          ).length === 0;

        if (dropoffFoodItems?.size === 0) {
          allAreValid = false;
        }

        // this means the log was empty -- should never get here
        if (!allAreValid) {
          errors.forEach((error) => {
            toast.error(error);
          });
        } else {
          const newDropoff: Dropoff = {
            date: Date.now().toString(),
            driver: driver.name,
            vehicle: vehicle.name,
            name: pickupDeliveryObject.name,
            recipientEntityType: pickupDeliveryObject.EntityType,
            demographic: pickupDeliveryObject.Demographic,
            area: pickupDeliveryObject.Area,
            foodAllocation: Object.fromEntries(dropoffFoodItems)
          };
          const addDropOffToVehicle: DropoffSchema = {
            _id: vehicle._id,
            currentDropoffs: newDropoff,
            totalFoodAllocation: Object.fromEntries(vehicleFoodMap)
          };

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
