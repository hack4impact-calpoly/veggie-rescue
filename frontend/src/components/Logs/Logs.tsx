import React, { useEffect, useState } from 'react';
import './Logs.css';
import { IoIosArrowBack } from 'react-icons/io';
import { useAppDispatch } from '../../app/hooks';

import TripLog from '../../components/TripLog/TripLog';
import { getVehicle } from '../../features/vehicles/VehiclesSlice';

const Logs = () => {
  const [data, dataSet] = useState<any>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchMyAPI() {
      let response = dispatch(getVehicle());
      dataSet(await response);
      console.log(response);
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="container">
      <div className="text-container">
        <div className="your-logs">
          <button
            id="icon"
            onClick={() => {
              alert('hi');
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
      {data && data.abort != null ? (
        <div className="logs">
          {data.currentPickups.map(
            (v: { name: any; lbsPickedUp: any }, index: any) => {
              return (
                <TripLog
                  key={index}
                  trip="Pickup"
                  name={v.name}
                  pounds={v.lbsPickedUp}
                />
              );
            }
          )}
          {data.currentDropoffs.map(
            (v: { name: any; lbsDroppedOff: any }, index: any) => {
              return (
                <TripLog
                  key={index}
                  trip="Dropoff"
                  name={v.name}
                  pounds={v.lbsDroppedOff}
                />
              );
            }
          )}
        </div>
      ) : (
        'Loading'
      )}
    </div>
  );
};

export default Logs;
