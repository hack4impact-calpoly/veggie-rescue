/* eslint-disable @typescript-eslint/naming-convention */
import { useLayoutEffect, useEffect, useState } from 'react';
import './TripLog.css';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

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
  const { trip: propsTrip, name: propsName, _id } = props;
  const dispatch = useAppDispatch();

  // global state
  const { vehicle, isSuccess: vehicleIsSuccess } = useAppSelector(
    (state) => state.vehicle
  );

  const [fontColor, setFontColor] = useState('');
  const [name, setName] = useState('');
  const [trip, setTrip] = useState('');
  const [pounds, setPounds] = useState<number>(0);
  const [editBtn, setEditBtn] = useState(false);

  useEffect(() => {
    if (vehicleIsSuccess) {
      dispatch(resetVehicles());
    }
  }, [vehicleIsSuccess]);
  useLayoutEffect(() => {
    setName(propsName);
    setTrip(propsTrip);
    setPounds(pounds);
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

  function handleClick() {
    setEditBtn((prev) => !prev);
  }

  const handleSubmit = async () => {
    let newWeight = vehicle.totalWeight;
    if (Object.keys(vehicle).length !== 0) {
      if (trip === 'Pickup') {
        newWeight -= +pounds;
        const updatedp: pickupObject[] = vehicle.currentPickups.map((v) => {
          if (v.name === name && v.lbsPickedUp === pounds) {
            return { ...v, lbsPickedUp: pounds } as unknown as pickupObject;
          }
          return v;
        });
        await dispatch(
          updateTwo({
            _id,
            currentPickups: updatedp,
            totalWeight: newWeight + +pounds
          } as PickupLog)
        );
        dispatch(getVehicle());
      } else {
        newWeight += pounds;
        if (newWeight - +pounds < 0) {
          toast.error(
            'Cannot drop off more weight than vehicle currently has.'
          );
          setPounds(pounds);
        } else {
          const updatedd: DropoffObject[] = vehicle.currentDropoffs.map((v) => {
            if (v.name === name && v.lbsDroppedOff === pounds) {
              return {
                ...v,
                lbsDroppedOff: pounds
              } as unknown as DropoffObject;
            }
            return v;
          });

          await dispatch(
            updateTwo({
              _id,
              currentDropoffs: updatedd,
              totalWeight: newWeight - +pounds
            } as DropoffLog)
          );
          dispatch(getVehicle());
        }
      }
    }
  };
  const handleDelete = async () => {
    if (vehicle) {
      if (trip === 'Pickup') {
        const updatedp: pickupObject[] = vehicle.currentPickups.filter(
          (v) => v.name !== name && v.lbsPickedUp !== pounds
        );

        await dispatch(
          updateTwo({
            _id,
            currentPickups: updatedp,
            totalWeight: vehicle.totalWeight - +pounds
          } as PickupLog)
        );
        dispatch(getVehicle());
      } else {
        const updatedd: dropoffObject[] = vehicle.currentDropoffs.filter(
          (v) => v.name !== name && v.lbsDroppedOff !== pounds
        );

        await dispatch(
          updateTwo({
            _id,
            currentDropoffs: updatedd,
            totalWeight: vehicle.totalWeight + +pounds
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
    <div>
      <div className="triplog-container">
        <div id="trip"> {trip}</div>
        <div id="name">{name}</div>
        <div id="pounds">
          {editBtn ? (
            <input
              className="input"
              type="text"
              name="lbs"
              onChange={(e) => handlePoundsChange(e.target.value)}
              value={pounds}
              placeholder={pounds.toString()}
            />
          ) : (
            <div className="pounds-container" style={{ color: fontColor }}>
              {trip === 'Pickup' ? <h1>+</h1> : <h1>-</h1>}
              {pounds} lbs
            </div>
          )}
        </div>

        <div id="pencil">
          <button type="button" onClick={handleClick}>
            <BiPencil id="bipencil" />
          </button>
        </div>
        <div className=" ">
          <button type="button" onClick={handleDelete}>
            <BiTrash className=" text-2xl" />
          </button>
        </div>
      </div>
      <div>
        {' '}
        {editBtn && (
          <button
            type="button"
            className="bg-[#FF9C55] w-full rounded-xl p-2 mb-4"
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        )}
      </div>
    </div>
  );

  interface PickupLog {
    _id: string;
    currentPickups: PickupObject[];
    totalFoodAllocation: Map<String, Number>;
  }
  interface DropoffLog {
    _id: string;
    currentDropoffs: DropoffObject[];
    totalFoodAllocation: Map<String, Number>;
  }
  interface PickupObject {
    // date: String;
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    foodType: String;
    area: String;
    lbsPickedUp: Number;
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
    lbsDroppedOff: Number;
  }
  interface PickupLog {
    _id: string;
    currentPickups: PickupObject[];
    totalFoodAllocation: Map<String, Number>;
  }
  interface DropoffLog {
    _id: string;
    currentDropoffs: DropoffObject[];
    totalFoodAllocation: Map<String, Number>;
  }
}

export default TripLog;
