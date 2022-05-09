import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import components
import TransferElement from './TransferElement';
import Spinner from '../Spinner/Spinner';

// import features
import './Transfering.css';
import {
  getVehicles,
  getVehicle,
  updateTwo,
  reset as resetVehicles,
  clear as clearVehicles,
  logoutVehicle,
} from '../../features/vehicles/VehiclesSlice';
import { clear as clearDrivers } from '../../features/driverAuth/driverAuthSlice';


interface VehicleWeightTransfer {
  _id: string;
  totalWeight: number;
}

export default function Transferring() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // global state
  const {
    vehicle,
    vehicles,
    isLoading: vehicleIsLoading,
    isSuccess: vehicleIsSuccess,
    isLoggingOut,
    isLoggedOut,
    isUpdateCount,
    isUpdate
  } = useAppSelector((state) => state.vehicle);
  const { driver } = useAppSelector((state) => state.driverAuth);

  // local state
  const [currentWeight, setCurrentWeight] = useState(0); // tracks current weight of vehicle
  const [weightArray, setWeightArray] = useState<number[]>([]); // tracks all inputs
  const [vehicleArray, setVehicleArray] = useState<any>([]); // tracks vehicles
  const [sum, setSum] = useState<number>(0); // tracks sum of all inputs
  const [loading, setLoading] = useState<boolean>(true);
  const [dispatchCount, setDispatchCount] = useState<number>(0)
  // utility functions
  const setState = async () => {
    setCurrentWeight(vehicle.totalWeight);
    const vehArray = vehicles.filter((veh) => {
      return veh.name !== 'personal vehicle' && veh._id !== vehicle._id;
    });
    setVehicleArray(vehArray);
  };
  const logOut = async () => {
    //await dispatch(clearVehicles());
    await dispatch(clearDrivers());
  };

  useEffect(() => {

    // 1. we need to make sure that we have vehicle and vehicles, if not fetch them.
    // should only happen if page is refreshed
    const fetchVehicles = async () => {
      await dispatch(getVehicles());
    };
    const fetchVehicle = async () => {
      await dispatch(getVehicle());
    };
    if (vehicles.length === 0 && !vehicleIsLoading && !vehicleIsSuccess && !isLoggedOut) {
      setLoading(true)
      fetchVehicles();
    }
    if (Object.keys(vehicle).length === 0 && !isLoggedOut) {
      setLoading(true)
      fetchVehicle();
    }

    // 2. make sure that both the vehicle object and vehicles array are populated
    if (Object.keys(vehicle).length > 0 && vehicles.length > 0) {
      if(isUpdateCount){
       if(isUpdateCount === dispatchCount){
         // all API calls have occured
         // are we logging out, or are we continuing to dashboard?
         if(!isLoggingOut){

          
          dispatch(getVehicles());
          dispatch(getVehicle());
          dispatch(resetVehicles());
          setLoading(false);
          navigate('/dashboard')
         }
       }
      }
      setState();
      if (weightArray) {
        const sum = weightArray.reduce((acc: number, val: number) => {
          return acc + (val || 0);
        }, 0);
        setSum(sum);
        setLoading(false);
      }


      if (sum) {
        setCurrentWeight((p) => p - sum);
      }
    }
    if (isLoggedOut && isLoggingOut) {
      logOut();
      dispatch(resetVehicles())
      setLoading(false);
       navigate('/');
    }
 
  }, [
    dispatch,
    vehicles,
    getVehicle,
    getVehicles,
    vehicle,
    weightArray,
    sum,
    currentWeight,
    vehicleIsSuccess,
    isLoggedOut,
    isLoggingOut,
    isUpdateCount, 
    dispatchCount
  ]);

  const handleUpdate = (index: any, updatedWeight: number) => {
    const newWeights = [...weightArray];
    newWeights[index] = updatedWeight;
    setWeightArray(newWeights);
  };

  const submitWeight = async () => {
    setLoading(true);
    // here is where we will verify that total weight is not less than 0.  If it is then we alert user
    // if not then we can dispatch the calls.
    if (currentWeight >= 0) {
  
      // update the driver vehicle to note subtraction of weight
      const currentVehicle = await dispatch(
        updateTwo({
          _id: vehicle._id,
          totalWeight: currentWeight
        })
      );
// once that call is finished we will dispatch the array of dispersed weights
      if (currentVehicle) {
       
        let count = 1;
        const updatedArray = await vehicleArray.map((e: any, index: number) => { 
          if(weightArray[index]){
            count++;
          return (
            weightArray[index] &&
             dispatch(
              updateTwo({
              _id: e._id,
              totalWeight: e.totalWeight + +weightArray[index]
            } as VehicleWeightTransfer)
          ));
          }
        })
        setDispatchCount(count)
 
        // now the vehicle updates have been dispatched, time to update the local data for viewer
        if (updatedArray) {
          setWeightArray([]);
          
          // if we are in logging out phase, prepare for log out
          if (isLoggingOut) {
            const currentPickups: pickupObject[] = [];
            const currentDropoffs: dropoffObject[] = [];
            let resetVehicle = {
              _id: vehicle._id,
              driver: vehicle.name === 'personal vehicle' ? driver.id : ' ',
              currentPickups,
              currentDropoffs,
              isLoggedIn: 'false'
            };

            await dispatch(logoutVehicle(resetVehicle));
            
          } 
        }
      }
    } else {
      toast.error('Cannot transfer more weight than is currently in vehicle.');
    }
  };

  if (loading) {
    return <Spinner />;
  }
  return (
    <div className='flex flex-col items-center justify-center'>
      <div className="flex flex-col items-center justify-center pb-10">
        <div className="tPageString">
          How much weight do <br></br>you want to transfer?
        </div>
        <p className="text-slate-800 text-3xl text-bold">
          Weight to transfer: {currentWeight ? currentWeight : 0} lbs
        </p>
      </div>

      <div>
        {vehicleArray &&
          vehicleArray.map((vehicle: any, index: any) => {
            return (
              <div className="flex flex-row w-full items-center justify-items-start">
              <TransferElement 
                vehicle={vehicle}
                index={index}
                handleUpdate={handleUpdate}
              />
              </div>
            );
          })}
      </div>
          <div className='flex flex-row items-center justify-center w-full pt-16'>
      <button className="bg-[#ff9c55] lg:w-1/4 md:w-1/2 p-3 rounded-3xl text-white text-3xl" onClick={submitWeight}>
        Submit
      </button>
      </div>
    </div>
  );
  interface pickupObject {
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    foodType: String;
    area: String;
    lbsPickedUp: Number;
  }
  interface dropoffObject {
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    recipientEntityType: String;
    demographic: String;
    foodType: String;
    area: String;
    lbsDroppedOff: Number;
  }
}
