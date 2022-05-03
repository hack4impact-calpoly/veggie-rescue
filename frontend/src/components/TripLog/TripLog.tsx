import React, {
  useLayoutEffect,
  useEffect,
  useState,
  ChangeEvent
} from 'react';
import './TripLog.css';
import Select from 'react-select';
import { BiPencil, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

// import components
import Spinner from '../Spinner/Spinner';

// import features
import {
  getVehicle,
  updateTwo,
  reset as resetVehicles,
  clear as clearVehicles
} from '../../features/vehicles/VehiclesSlice';

const TripLog = (props: any) => {
  const dispatch = useAppDispatch();

  // global state
  const {
    vehicle,
    isSuccess: vehicleIsSuccess,
  } = useAppSelector((state) => state.vehicle);

  const [fontColor, setFontColor] = useState('');
  const [name, setName] = useState('');
  const [trip, setTrip] = useState('');
  const [pounds, setPounds] = useState<number>(0);
  const [editBtn, setEditBtn] = useState(false);

  const options = [
    { value: 'Dropoff', label: 'Dropoff' },
    { value: 'Pickup', label: 'Pickup' }
  ];

  function handleTripChange(e: any) {
    setTrip(e.value);
    trip === 'Dropoff'
      ? setFontColor('#3FB551')
      : trip === 'Pickup'
        ? setFontColor('#D23434')
        : setFontColor('black');
  }
  useEffect(() => {
    if (vehicleIsSuccess) {
      dispatch(resetVehicles());
    }
  }, [vehicleIsSuccess]);
  useLayoutEffect(() => {
    setName(props.name);
    setTrip(props.trip);
    setPounds(props.pounds);
  }, []);

  useLayoutEffect(() => {
    trip === 'Pickup'
      ? setFontColor('#3FB551')
      : trip === 'Dropoff'
        ? setFontColor('#D23434')
        : setFontColor('black');
  }, [fontColor]);

  function handleClick() {
    setEditBtn((prev) => !prev);
  }

  const handleSubmit = async () => {
    let newWeight = vehicle.totalWeight;
    if (Object.keys(vehicle).length !== 0) {
      if (trip === 'Pickup') {
        newWeight -= +props.pounds;
        const updatedp: pickupObject[] = vehicle.currentPickups.map((v) => {
          if (v.name === props.name && v.lbsPickedUp === props.pounds) {
            return { ...v, lbsPickedUp: pounds } as unknown as pickupObject;
          } else {
            return v;
          }
        });
        await dispatch(
          updateTwo({
            _id: props._id,
            currentPickups: updatedp,
            totalWeight: newWeight + +pounds
          } as PickupLog)
        );
        dispatch(getVehicle());
      } else {
        newWeight += props.pounds;
        if((newWeight - +pounds) < 0){
          toast.error('Cannot drop off more weight than vehicle currently has.')
          setPounds(props.pounds)
        }
        else{
        const updatedd: dropoffObject[] = vehicle.currentDropoffs.map((v) => {
          if (v.name === props.name && v.lbsDroppedOff === props.pounds) {
            return { ...v, lbsDroppedOff: pounds } as unknown as dropoffObject;
          } else {
            return v;
          }
        });
        
        await dispatch(
          updateTwo({
            _id: props._id,
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
          (v) => v.name !== props.name && v.lbsPickedUp !== props.pounds
        );

        await dispatch(
          updateTwo({
            _id: props._id,
            currentPickups: updatedp,
            totalWeight: vehicle.totalWeight - +pounds
          } as PickupLog)
        );
        dispatch(getVehicle());
      } else {
        const updatedd: dropoffObject[] = vehicle.currentDropoffs.filter(
          (v) => v.name !== props.name && v.lbsDroppedOff !== props.pounds
        );

        await dispatch(
          updateTwo({
            _id: props._id,
            currentDropoffs: updatedd,
            totalWeight: vehicle.totalWeight + +pounds
          } as DropoffLog)
        );
        dispatch(getVehicle());
      }
    }
  };
  function handlePoundsChange(e: any) {
    {
      isNaN(e) || e === '-'
        ? alert('Please enter a numerical value for pounds.')
        : setPounds(+e);
    }
  }

  function changeFontColor() {
    trip === 'Dropoff'
      ? setFontColor('#3FB551')
      : trip === 'Pickup'
        ? setFontColor('#D23434')
        : setFontColor('black');
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
          <button onClick={handleClick}>
            <BiPencil id="bipencil" />
          </button>
        </div>
        <div className=" ">
          <button onClick={handleDelete}>
            <BiTrash className=" text-2xl" />
          </button>
        </div>
      </div>
      <div>
        {' '}
        {editBtn && (
          <button
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
    currentPickups: pickupObject[];
    totalWeight: number;
  }
  interface DropoffLog {
    _id: string;
    currentDropoffs: dropoffObject[];
    totalWeight: number;
  }
  interface pickupObject {
    //date: String;
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    foodType: String;
    area: String;
    lbsPickedUp: Number;
  }

  interface dropoffObject {
    //date: String;
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
    currentPickups: pickupObject[];
    totalWeight: number;
  }
  interface DropoffLog {
    _id: string;
    currentDropoffs: dropoffObject[];
    totalWeight: number;
  }
};

export default TripLog;
