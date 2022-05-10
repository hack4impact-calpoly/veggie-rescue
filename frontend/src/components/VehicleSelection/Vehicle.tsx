import React, { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// Components and assets
import VehicleItem from './VehicleItem';
import Spinner from '../Spinner/Spinner';

// import vehicles for API calls
import {
  getVehicles,
  updateVehicle,
  reset
} from '../../features/vehicles/VehiclesSlice'

function Vehicles() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // External state
  const {
    vehicles,
    vehicle,
    isUpdate,
    isLoading,
    isError,
    isSuccess,
    message
  } = useAppSelector((state) => state.vehicle);
  const { driver } = useAppSelector((state) => state.driverAuth);


  // On component load
  useEffect(() => {
    // If the vehicles array is empty; dispatch to retrieve them
    if (vehicles.length === 0) {
      setLoading(true);
      dispatch(getVehicles());
    }
    if(isSuccess){
      setLoading(false)
    }
    // After we click a vehicle and vehicle object is updated
    if (isUpdate && Object.keys(vehicle).length !== 0) {
      setLoading(false);
      dispatch(reset());
      
      // NOW depending on if there is currently weight in the vehicle or not we either go to Dashboard or Transfer page
      if (vehicle.totalWeight !== 0) {
        navigate('/Transfer');
      } else {
        navigate('/Dashboard');
      }
    }
  }, [vehicle, vehicles.length, dispatch, navigate, isUpdate, isSuccess]);

  // Response to click in VehicleItem component
  const onClick = (e: string) => {
    setLoading(true);
    const toUpdate = { _id: e, driver: driver.id, isLoggedIn: 'true' };
    dispatch(updateVehicle(toUpdate));
  };

  if (loading) {
    return <Spinner />;
  }

  // Implementation of mapping components.
  return (
    <div className="container">
      <p className="text-4xl text-[#176C3E] font-semibold pt-20 pb-10">
        Choose your vehicle
      </p>
      <div className="grid grid-cols-2 gap-4">
        {/* Takes vehicle array and filters.  Personal vehicles where driver id matches the personal vehicle id OR the names dont match, but car is not logged into.*/}
        {vehicles.filter(car => ((car.name === 'personal vehicle' && car.driver === driver.id) || (car.name !== 'personal vehicle' && !car.isLoggedIn) )
).map((car, index: any) => {        
            return (
              <div className="flex items-center justify-center w-40 m-5 shadow-xl rounded-3xl bg-white transform active:translate-y-2">
                <VehicleItem car={car} onClick={onClick} key={index} index={undefined} />
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