import { useEffect } from 'react';
import './Logs.css';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';

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
    <div className="container pt-10 pl-5 pr-50">
      <div className="text-container">
        <div className="your-logs">
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
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button type="button" id="icon" />
        </div>
        <div className="subtitle">
          <h3>Trip</h3>
          <h3>Name</h3>
          <h3>Food Allocation</h3>
        </div>
      </div>
      {vehicle.currentDropoffs.length !== 0 ||
      vehicle.currentPickups.length !== 0 ? (
        <div className="mt-8 ">
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
