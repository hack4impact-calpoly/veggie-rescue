import { useEffect } from 'react';
import './Dashboard.css';
import { FaPencilAlt, FaClipboardList, FaHandPaper } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { reset } from '../../features/driverAuth/driverAuthSlice';
import { toast } from 'react-toastify';

import {
  getVehicles,
  getVehicle,
  logoutVehicle,
  updateVehicle,
  reset as resetVehicles
} from '../../features/vehicles/vehiclesSlice';



const name = 'Diana';
const weight = '1,234';

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    vehicle,
    isLoading: vehicleIsLoading,
    isSuccess : vehicleIsSuccess,
    isLoggedOut
  } = useAppSelector((state) => state.vehicle);
  const {
    driver
  } = useAppSelector((state) => state.driverAuth);
  const { isSuccess: driverAuthSuccess } = useAppSelector(
    (state) => state.driverAuth
  );
  useEffect(() => {
    if (isLoggedOut) {
      toast.success('Successfully logged out.')
      //navigate('/');
    }
    //dispatch(resetVehicles())
  }, [dispatch, driverAuthSuccess, vehicleIsSuccess, navigate, isLoggedOut]);

  function handleClick(button: Number) {
    switch (button) {
      case 0:
        navigate('/NewLog');
        break;
      case 1:
        navigate('/UserLogs');
        break;
      case 2:
        // When logging out we will need to implement a check to make sure everything is logged to backend.  For now we just clear the stored driver and navigate to login page.
        // We need to only clear name if it is not a personal vehicle.
  
        let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver._id : " " , isLoggedIn: "false" };

        dispatch(updateVehicle(resetVehicle));
        localStorage.removeItem('driver');
        dispatch(logoutVehicle());
        dispatch(reset());
        dispatch(resetVehicles());
        break;

      default:
        break;
    }
  }

  return (
    <div className="container bgimg">
      <div className="greeting-box">
        <div className="greeting">
          <h2>Hi {name}!</h2>
        </div>
      </div>

      <div className="weight">
        <div className="current-weight">
          <h3>Current Weight</h3>
        </div>
        <div className="lbs">
          <h2>{weight} lbs</h2>
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
