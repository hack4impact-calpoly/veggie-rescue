/* eslint-disable @typescript-eslint/naming-convention */
import { useLayoutEffect, useEffect, useState } from 'react';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
import './TripLog.css';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// import features
import {
  getVehicle,
  updateTwo,
  reset as resetVehicles,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  clear as clearVehicles
} from '../../features/vehicles/VehiclesSlice';

function TripLog(props: any) {
  // food allocation is the original pickup/dropoff amount
  const {
    trip: propsTrip,
    name: propsName,
    foodAllocation: originalFoodWeights,
    _id
  }: Props = props;
  const dispatch = useAppDispatch();

  console.log(originalFoodWeights);
  console.log(propsTrip);

  // global state
  const { vehicle, isSuccess: vehicleIsSuccess } = useAppSelector(
    (state) => state.vehicle
  );
  console.log(vehicle);

  const [fontColor, setFontColor] = useState('');
  const [name, setName] = useState('');
  const [trip, setTrip] = useState('');
  // food weights is whatever the user enters
  const [editedFoodWeights, setEditedFoodWeights] =
    useState<Map<String, number>>();
  const [editBtn, setEditBtn] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (vehicleIsSuccess) {
      dispatch(resetVehicles());
    }
    setEditedFoodWeights(originalFoodWeights);
  }, [vehicleIsSuccess]);

  useLayoutEffect(() => {
    setName(propsName);
    setTrip(propsTrip);
  }, []);

  useLayoutEffect(() => {
    if (trip === 'Pickup') {
      setFontColor('#3FB551');
    } else if (trip === 'Dropoff') {
      setFontColor('#D23434');
    } else {
      setFontColor('black');
    }
  }, [fontColor]);

  const totalWeight = originalFoodWeights
    ? Array.from(originalFoodWeights.values()).reduce(
        (total, weight) => total + weight,
        0
      )
    : 0;

  function handleClick() {
    setEditBtn((prev) => !prev);
  }

  const handleSubmit = async () => {
    // newAllocation is what will be in the vehicle, mongo converts to obj so convert to map
    const updatedFoodWeights = new Map<String, number>(
      Object.entries(vehicle.totalFoodAllocation).map(([key, value]) => [
        String(key),
        value
      ])
    );
    if (Object.keys(vehicle).length !== 0 && editedFoodWeights?.size !== 0) {
      if (trip === 'Pickup') {
        editedFoodWeights!.forEach((weight: number, food: String) => {
          if (updatedFoodWeights.has(food)) {
            // update food in vehicle
            const newWeight = updatedFoodWeights.get(food)! + weight;
            updatedFoodWeights.set(food, newWeight);
          }
        });

        const updatedp: PickupObject[] = vehicle.currentPickups.map((v) => {
          if (
            v.name === name &&
            JSON.stringify(v.foodAllocation) ===
              JSON.stringify(editedFoodWeights)
          ) {
            return {
              ...v,
              lbsPickedUp: editedFoodWeights
            } as unknown as PickupObject;
          }
          return v;
        });
        await dispatch(
          updateTwo({
            _id,
            currentPickups: updatedp,
            totalFoodAllocation: updatedFoodWeights
          } as PickupLog)
        );
        dispatch(getVehicle());
      } else {
        let valid = true;
        editedFoodWeights!.forEach((weight: number, food: String) => {
          if (updatedFoodWeights.has(food)) {
            const newWeight = updatedFoodWeights.get(food)! - weight;
            if (newWeight < 0) {
              toast.error(
                'Cannot drop off more weight than vehicle currently has.'
              );
              valid = false;
            }
            updatedFoodWeights.set(food, newWeight);
          }
        });
        if (valid) {
          const updatedd: DropoffObject[] = vehicle.currentDropoffs.map((v) => {
            if (
              v.name === name &&
              JSON.stringify(v.foodAllocation) ===
                JSON.stringify(editedFoodWeights)
            ) {
              return {
                ...v,
                lbsDroppedOff: editedFoodWeights
              } as unknown as DropoffObject;
            }
            return v;
          });

          await dispatch(
            updateTwo({
              _id,
              currentDropoffs: updatedd,
              totalFoodAllocation: originalFoodWeights
            } as DropoffLog)
          );
          dispatch(getVehicle());
        } else {
          setEditedFoodWeights(editedFoodWeights);
        }
      }
    }
  };
  const handleDelete = async () => {
    if (vehicle) {
      if (trip === 'Pickup') {
        const updatedp: PickupObject[] = vehicle.currentPickups.filter(
          (v) =>
            v.name !== name &&
            JSON.stringify(v.foodAllocation) !==
              JSON.stringify(editedFoodWeights)
        );
        const updatedVehicleWeights = vehicle.totalFoodAllocation;

        editedFoodWeights!.forEach((weight: number, food: String) => {
          if (updatedVehicleWeights.has(food)) {
            const newWeight = updatedVehicleWeights.get(food)! - weight;
            if (newWeight <= 0) {
              updatedVehicleWeights.delete(food);
            } else {
              updatedVehicleWeights.set(food, newWeight);
            }
          }
        });

        await dispatch(
          updateTwo({
            _id,
            currentPickups: updatedp,
            totalFoodAllocation: updatedVehicleWeights
          } as PickupLog)
        );
        dispatch(getVehicle());
      } else {
        const updatedd: DropoffObject[] = vehicle.currentDropoffs.filter(
          (v) =>
            v.name !== name &&
            JSON.stringify(v.foodAllocation) !==
              JSON.stringify(editedFoodWeights)
        );
        const updatedVehicleWeights = vehicle.totalFoodAllocation;

        editedFoodWeights!.forEach((weight: number, food: String) => {
          if (updatedVehicleWeights.has(food)) {
            const newWeight = updatedVehicleWeights.get(food)! + weight;
            updatedVehicleWeights.set(food, newWeight);
          } else {
            updatedVehicleWeights.set(food, weight);
          }
        });

        await dispatch(
          updateTwo({
            _id,
            currentDropoffs: updatedd,
            totalFoodAllocation: updatedVehicleWeights
          } as DropoffLog)
        );
        dispatch(getVehicle());
      }
    }
  };
  function handlePoundsChange(e: any) {
    if (Number.isNaN(e) || e === '-') {
      // eslint-disable-next-line no-alert
      alert('Please enter a numerical value for pounds.');
    } else {
      setPounds(+e);
    }
  }

  return (
    <div className="triplog-container">
      <div className="flex flex-col">
        <div id="trip">{trip}</div>
        <div className="text-sm text-black">Tue May 30 2023 14:47:12</div>
      </div>
      <div id="name">{name}</div>
      <div id="foods" className="flex">
        {Object.entries(originalFoodWeights).map(([food, weight]) => (
          <div className="flex items-center" key={food} id={food}>
            {editBtn ? (
              <input
                className="shadow-sm rounded-lg h-9 px-4 text-black"
                type="text"
                name="lbs"
                onChange={(e) => handlePoundsChange(e.target.value)}
                value={weight}
                placeholder={weight.toString()}
              />
            ) : (
              <div className="flex items-center" style={{ color: fontColor }}>
                {trip === 'Pickup' ? (
                  <h1 className="text-3xl">+</h1>
                ) : (
                  <h1 className="text-3xl">-</h1>
                )}
                <span className="text-base ml-1">{weight} lbs</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  interface PickupLog {
    _id: string;
    currentPickups: PickupObject[];
    totalFoodAllocation: Map<String, number>;
  }
  interface DropoffLog {
    _id: string;
    currentDropoffs: DropoffObject[];
    totalFoodAllocation: Map<String, number>;
  }
  interface PickupObject {
    // date: String;
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    foodType: String;
    area: String;
    foodAllocation: Map<String, number>;
  }

  interface DropoffObject {
    // date: String;
    driver: String;
    vehicle: String;
    name: String;
    recipientEntityType: String;
    demographic: String;
    foodType: String;
    area: String;
    foodAllocation: Map<String, number>;
  }
  interface PickupLog {
    _id: string;
    currentPickups: PickupObject[];
    totalFoodAllocation: Map<String, number>;
  }
  interface DropoffLog {
    _id: string;
    currentDropoffs: DropoffObject[];
    totalFoodAllocation: Map<String, number>;
  }

  interface Props {
    trip: string;
    name: string;
    foodAllocation: Map<String, number>;
    _id: string;
  }
}

export default TripLog;
