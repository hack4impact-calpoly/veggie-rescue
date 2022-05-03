import React, { useEffect, useState } from 'react';
import './Logs.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

import TripLog from '../../components/TripLog/TripLog';
import { getVehicle } from '../../features/vehicles/VehiclesSlice';
import { useNavigate } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

const Logs = () => {
  //let [data, dataSet] = useState<any>(null);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  // Get the vehicle object from the store
  
  const {
    vehicle,
    isLoading: vehicleIsLoading,

  } = useAppSelector((state) => state.vehicle);

  useEffect(() => {

    // async function fetchMyAPI() {
    //   let response = dispatch(getVehicle());
    //   dataSet((await response).payload);
    // }
    // fetchMyAPI();
    if(Object.keys(vehicle).length === 0 ){
      dispatch(getVehicle())
    }
  }, [dispatch, vehicle]);

  if(vehicleIsLoading){
    return <Spinner />
  }
  return (
    <div className="container">
      <div className="text-container">
        <div className="your-logs">
          <button
            id="icon"
            onClick={() => {
              navigate('/Dashboard');
            }}
          >
            <IoIosArrowBack style={{ color: 'FF9C55' }} />
          </button>
          <h3 id="logs-text">Your Logs</h3>
        </div>
        <div className="subtitle">
          <h3>Trip</h3>
          <h3>Name</h3>
          <h3>Pounds</h3>
        </div>
      </div>
      {(vehicle.currentDropoffs.length !== 0 || vehicle.currentPickups.length !== 0) ? (
        <div className="mt-8 ">
          {vehicle.currentPickups.map(
            (v: { name: any; lbsPickedUp: any }, index: any) => {
              return (
                <TripLog
                  key={index}
                  trip="Pickup"
                  name={v.name}
                  pounds={v.lbsPickedUp}
                  _id={vehicle._id}
                />
              );
            }
          )}
          {vehicle.currentDropoffs.map(
            (v: { name: any; lbsDroppedOff: any }, index: any) => {
              return (
                <TripLog
                  key={index}
                  trip="Dropoff"
                  name={v.name}
                  pounds={+v.lbsDroppedOff}
                  _id={vehicle._id}
                />
              );
            }
          )}
        </div>
      ) : (
        <h1 className='pt-20'> Currently no logs </h1> 
      )}
    </div>
  );
};

export default Logs;
