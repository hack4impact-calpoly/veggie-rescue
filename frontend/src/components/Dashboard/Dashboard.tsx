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
  clear as clearVehicles
} from '../../features/vehicles/VehiclesSlice';

import {
  createBatchPickup,
} from '../../features/pickups/pickupsSlice';
import { createBatchDropoff } from '../../features/dropoffs/dropoffsSlice';
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
    if (isLoggedOut && isUpdate) {
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
      // This means we were successful in posting logs to the main logs
    }
 
  }, [dispatch, vehicleIsSuccess, navigate, isLoggedOut, vehicle, vehicleIsLoading, isUpdate]);

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
        // We need to check and see if driver is currently using personal vehicle, in that case we don't clear the vehicle name.
        let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver.id : " " , isLoggedIn: "false" };
      
        // Dispatch currentPickups and currentDroppoffs to master logs
        const pickupsArray = vehicle.currentPickups;
        const dropoffArray = vehicle.currentDropoffs;
      if(pickupsArray.length !== 0){
        dispatch(createBatchPickup(pickupsArray))
      }else if(dropoffArray.length !== 0){
        dispatch(createBatchDropoff(dropoffArray))
      }
      
//OUR NEXT STEP IS TO SEE WHAT HAPPENS IF ITS SUCCESSFUL OR NOT


      //we have to somehow wait for success
      //clear currentPickups and currentDropoffs arrays

      // dispatch(updateVehicle(resetVehicle));
      //dispatch(logoutVehicle());
      // We need to check and see if the total weight is === 0.  If no, direct to transfer weight page.
      // if(vehicle.totalWeight === 0){
      // let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver._id : " " , isLoggedIn: "false" };
      // dispatch(updateVehicle(resetVehicle));
      // dispatch(logoutVehicle());
      // }else{
      //   navigate('/Transfer');
      // }
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

export default Dashboard;