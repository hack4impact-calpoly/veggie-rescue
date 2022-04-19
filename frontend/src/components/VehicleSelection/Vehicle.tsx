import { useState, useEffect, SetStateAction } from 'react';
import VehicleItem from './VehicleItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import {
  getVehicles,
  getVehicle,
  updateVehicle,
  reset
} from '../../features/vehicles/vehiclesSlice';

import { useAppSelector, useAppDispatch } from '../../app/hooks';

function Vehicles() {
  const {
    vehicles,
    vehicle,
    isLoading: vehicleLoading,
    isError: vehicleError,
    isSuccess: vehicleSuccess,
    message: vehicleMessage
  } = useAppSelector((state) => state.vehicle);
  const { driver } = useAppSelector((state) => state.driverAuth);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  // When the userVehicle state is updated by click; this will print to console.
  useEffect(() => {
    if (vehicles.length === 0) {
      dispatch(getVehicles());
    }
    if (vehicleSuccess && Object.keys(vehicle).length !== 0) {
      dispatch(reset());
      // NOW depending on if there is currently weight in the vehicle or not we either go to Dashboard or Transfer page
      if (vehicle.totalWeight !== 0) {
        navigate('/Transfer');
      } else {
        navigate('/Dashboard');
      }
    }
  }, [vehicleSuccess, vehicle, vehicles.length, dispatch, navigate]);

  // Response to click in VehicleItem component
  const onClick = (e: string) => {
    const newVehicle = { _id: e, driver: driver._id, isLoggedIn: 'true' };
    dispatch(updateVehicle(newVehicle));
  };

  if (vehicleLoading) {
    return <h1>LOADING...</h1>;
  }
  // Implementation of mapping components.
  return (
    <div className="container">
      <p className="text-4xl text-[#176C3E] font-semibold pt-20 pb-10">
        Choose your vehicle
      </p>
      <div className="grid grid-cols-2 gap-4">
        {vehicles.filter(car => ((car.name === 'personal vehicle' && car.driver === driver._id) || (car.name !== 'personal vehicle' && !car.isLoggedIn) )
).map((car) => {        
            return (
              <div className="flex items-center justify-center w-40 m-5 shadow-2xl rounded-3xl">
                <VehicleItem car={car} onClick={onClick} />
              </div>
            );
          
        })}
      </div>
    </div>
  );
}

export default Vehicles;

// Interface for vehicles object
interface Vehicle {
  id: string;
  driver: string;
  name: string;
  isLoggedIn: boolean;
  img: string;
  currentPickups: locale[];
  currentDropoffs: locale[];
  totalWeight: number;
}
interface locale {
  name: string;
  donorLocationType: string;
  donorEntityType: string;
  foodType: string[];
  area: string;
  id: string;
}
