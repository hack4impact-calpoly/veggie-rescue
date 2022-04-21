import { useEffect } from 'react';
import './Dashboard.css';
import { FaPencilAlt, FaClipboardList, FaHandPaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { reset, clear as clearDrivers} from '../../features/driverAuth/driverAuthSlice';
import { toast } from 'react-toastify';

import {
  getVehicles,
  getVehicle,
  logoutVehicle,
  updateVehicle,
  reset as resetVehicles,
  clear as clearVehicles

} from '../../features/vehicles/vehiclesSlice';


const Dashboard = () => {
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


  useEffect(() => {
    //  This call will get our vehicle object if we have refreshed page and it is not in state.
    if(Object.keys(vehicle).length === 0 && !isLoggedOut && !vehicleIsLoading){
      dispatch(getVehicle());
    }
    // If we are logged out and vehicle success (meaning we have updated backend) is true
    if (isLoggedOut && isUpdate) {
      toast.success('Successfully logged out.')
        // Clear state for vehicles and auth and then navigate to Login page.
        dispatch(clearVehicles());
        dispatch(clearDrivers());          
       navigate('/')
    }
    if(isUpdate){
      //dispatch(getVehicle())
      //dispatch(getVehicles())
      //dispatch(resetVehicles());
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

              let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver._id : " " , isLoggedIn: "false" };
        dispatch(updateVehicle(resetVehicle));
        dispatch(logoutVehicle());
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
