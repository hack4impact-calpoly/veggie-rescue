import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';
import './Logs.css';
import TripLog from '../TripLog/TripLog';
import { getVehicle } from '../../features/vehicles/VehiclesSlice';
import Spinner from '../Spinner/Spinner';

function Logs() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Get the vehicle object from the store

  const { vehicle, isLoading: vehicleIsLoading } = useAppSelector(
    (state) => state.vehicle
  );

  console.log(vehicle.currentDropoffs);

  useEffect(() => {
    if (Object.keys(vehicle)?.length === 0) {
      dispatch(getVehicle());
    }
  }, [dispatch, vehicle]);

  if (vehicleIsLoading) {
    return <Spinner />;
  }
  return (
    <div className="container pt-10 pl-5 pr-10">
      <div className="text-container">
        <div className="your-logs flex justify-between items-center h-20 w-90">
          <button
            type="button"
            id="icon"
            onClick={() => {
              navigate('/Dashboard');
            }}
          >
            <img src={NavBarButton_DARK} alt="leftButton" />
          </button>
          <h3 id="logs-text">Your Logs</h3>
          <button type="button" id="icon" aria-label="Toggle Logs" />
        </div>
        <div className="subtitle flex justify-between w-1/2 min-w-550px">
          <h3>Trip</h3>
          <h3>Name</h3>
          <h3>Food Allocation</h3>
        </div>
      </div>
      {vehicle.currentDropoffs.length !== 0 ||
      vehicle.currentPickups.length !== 0 ? (
        <div className="mt-8">
          {vehicle.currentPickups.map(
            (v: { name: any; foodAllocation: any }) => (
              <TripLog
                key={vehicle._id}
                trip="Pickup"
                name={v.name}
                foodAllocation={v.foodAllocation}
                _id={vehicle._id}
              />
            )
          )}
          {vehicle.currentDropoffs.map(
            (v: { name: any; foodAllocation: any }) => (
              <TripLog
                key={vehicle._id}
                trip="Dropoff"
                name={v.name}
                foodAllocation={v.foodAllocation}
                _id={vehicle._id}
              />
            )
          )}
        </div>
      ) : (
        <h1 className="pt-20"> Currently no logs </h1>
      )}
    </div>
  );
}

export default Logs;
