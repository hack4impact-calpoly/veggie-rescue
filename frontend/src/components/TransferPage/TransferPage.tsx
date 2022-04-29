import React, { useEffect } from 'react';
import { toast } from 'react-toastify';

import './TransferPage.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { reset, clear as clearDrivers} from '../../features/driverAuth/driverAuthSlice';

import {
  getVehicles,
  getVehicle,
  logoutVehicle,
  updateVehicle,
  reset as resetVehicles,
  clear as clearVehicles,
  setIsLoggingOut
} from '../../features/vehicles/VehiclesSlice';
import {
  createBatchPickup,
  setSuccess as setPickupSuccess
} from '../../features/pickups/pickupsSlice';
import { createBatchDropoff, 
setSuccess as setDropoffSuccess  } from '../../features/dropoffs/dropoffsSlice';
 
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


export default function TransferPage() {
  const dispatch = useAppDispatch();
  const {
    vehicles,
    vehicle,
    isLoggingOut,
        isLoggedOut,

    isError: vehicleError,
    isSuccess: vehicleSuccess,
    message: vehicleMessage
  } = useAppSelector((state) => state.vehicle);
  const navigate = useNavigate();
const { isSuccess: batchPickupSuccess } = useAppSelector((state) => state.pickups);
const { isSuccess: batchDropoffSuccess } = useAppSelector((state) => state.dropoffs);
 // Get the driver object from the store
  const {
    driver,
    isSuccess: driverAuthSuccess
  } = useAppSelector((state) => state.driverAuth);
  
  const { name, totalWeight} = vehicle
  const vehicleType = "Van";
  const numOfPounds = 200;


  useEffect(()=>{
    if(isLoggedOut && isLoggingOut)
    {
            toast.success('Successfully logged out.')
        // Clear state for vehicles and auth and then navigate to Login page.
        dispatch(clearVehicles());
        dispatch(clearDrivers());   
      navigate('/');
    }
  },[isLoggedOut, navigate])

  function transfer(){
    navigate('/TransferPage')
  }

  function leaveIt(){
    if(isLoggingOut){
              const currentPickups : pickupObject[] = []
        const currentDropoffs : dropoffObject[] = []
        let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver.id : " " , currentPickups , currentDropoffs, isLoggedIn: "false" };
        dispatch(setDropoffSuccess())
        dispatch(setPickupSuccess())
        dispatch(logoutVehicle(resetVehicle))
    }else{
    navigate('/Dashboard')
    }
  }

  return (
    <div className='container'>
      <div className="tPageString">{name} currently has</div>
      <div className="tPagePounds">{totalWeight} pounds</div>
      <button className="transferButton flex items-center justify-center " onClick={transfer}> Transfer it </button>
      <button className="transferButton flex items-center justify-center" onClick={leaveIt}> Leave it </button>
    </div>
  );
}