import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPencilAlt, FaClipboardList, FaHandPaper } from 'react-icons/fa';

// Components and assets
import Spinner from '../Spinner/Spinner';



// import driver auth slice and vehicles for API calls
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
// import {
//   getVehicles,
//   getVehicle,
//   logoutVehicle,
//   updateVehicle,
//   reset as resetVehicles,
//   clear as clearVehicles
// } from '../../features/dropoffs/dropoffsSlice';


const Dashboard = () => {
    const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  // Get the vehicle object from the store
  const {
    vehicle,
    isLoading: vehicleIsLoading,
    isSuccess : vehicleIsSuccess,
    isLoggedOut,
    isUpdate
  } = useAppSelector((state) => state.vehicle);

  // Get the driver object from the store
  const {
    driver,
    isSuccess: driverAuthSuccess
  } = useAppSelector((state) => state.driverAuth);
const { isSuccess: batchPickupSuccess } = useAppSelector((state) => state.pickups);
const { isSuccess: batchDropoffSuccess } = useAppSelector((state) => state.dropoffs);

  useEffect(() => {
    //  This call will get our vehicle object if we have refreshed page and it is not in state.
    if(Object.keys(vehicle).length === 0 && !isLoggedOut && !vehicleIsLoading){
      setLoading(true);
      dispatch(getVehicle());
    }
    // If we are logged out and vehicle success (meaning we have updated backend) is true
    if (isLoggedOut) {
      toast.success('Successfully logged out.')
      setLoading(false);
        // Clear state for vehicles and auth and then navigate to Login page.
        dispatch(clearVehicles());
        dispatch(clearDrivers());          
       navigate('/')
    }
    if(vehicleIsSuccess){
      setLoading(false);
    }
    if(isUpdate && vehicleIsSuccess && !isLoggedOut){
      setLoading(true);
      //dispatch(getVehicle())
      //dispatch(getVehicles())
      //dispatch(resetVehicles());
    }
    if(batchPickupSuccess && batchDropoffSuccess){
        // We need to check and see if driver is currently using personal vehicle, in that case we don't clear the vehicle name.
        const currentPickups : pickupObject[] = []
        const currentDropoffs : dropoffObject[] = []
        let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver.id : " " , currentPickups , currentDropoffs, isLoggedIn: "false" };

      // This means we were successful in posting both logs... now lets see if there is a total weight left unresolved.
      if(vehicle.totalWeight === 0 && !vehicleIsLoading
        )
      {
        dispatch(setDropoffSuccess())
        dispatch(setPickupSuccess())
        dispatch(logoutVehicle(resetVehicle))
      }else{
        //otherwise we need to ask if user cares to transfer weight before logging out.
        dispatch(setIsLoggingOut())
        navigate('/transfer')
      }
    }
 
  }, [dispatch, vehicleIsSuccess, navigate, isLoggedOut, vehicle, vehicleIsLoading, isUpdate, batchPickupSuccess, batchDropoffSuccess, driver.id]);

  function handleClick(button: Number) {
    switch (button) {
      case 0:
        navigate('/NewLog');
        break;
      case 1:
        navigate('/UserLogs');
        break;
      case 2:
        setLoading(true);
         
        const pickupsArray = vehicle.currentPickups;
        const dropoffArray = vehicle.currentDropoffs;

        if(pickupsArray.length === 0 ){
          dispatch(setPickupSuccess());
        }else{
          dispatch(createBatchPickup(pickupsArray))
        }
        
        if(dropoffArray.length === 0 ){
          dispatch(setDropoffSuccess());
        }else {
          dispatch(createBatchDropoff(dropoffArray))
        }
        
        break;
      default:
        break;
    }
  }

if(loading){
  return <Spinner />
}
  return (
    <div className="container bgimg">
      <div className="greeting-box">
        <div className="greeting">
          <h2>Hi {driver.name}!</h2>
        </div>
      </div>

      <div className="weight">
        <div className="current-weight">
          <h3>Current Weight</h3>
        </div>
        <div className="lbs">
          <h2>{vehicle.totalWeight} lbs</h2>
        </div>
      </div>

      <div className="action">
        <button onClick={() => handleClick(0)}>
          <div className="action-item">
            <FaPencilAlt className="fa-icon" />
            <div>Start a Log</div>
          </div>
        </button>
        <button onClick={() => handleClick(1)}>
          <div className="action-item">
            <FaClipboardList className="fa-icon" />
            <div>View All Logs</div>
          </div>
        </button>
        <div id="bottom-button">
          <button onClick={() => handleClick(2)}>
            <div className="action-item">
              <FaHandPaper className="fa-icon" />
              <div>Punch Out</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

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

export default Dashboard;