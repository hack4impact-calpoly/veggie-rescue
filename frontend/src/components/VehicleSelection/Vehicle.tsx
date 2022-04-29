import { useState, useEffect, SetStateAction } from 'react';
import VehicleItem from './VehicleItem';
import { useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { getVehicles } from '../../features/vehicles/VehiclesSlice';

function Vehicles() {
  // Local state to hold the data from db, as well as a piece of state which will be sent to the rest of the app depending on what car
  // driver clicks
  const dispatch = useAppDispatch();
  const [data, dataSet] = useState<any>(null);
  const [userVehicle, setUserVehicle] = useState(null);
  const navigate = useNavigate();

  // When the userVehicle state is updated by click; this will print to console.
  useEffect(() => {
    if (userVehicle !== null) {
      console.log(userVehicle);
      localStorage.setItem('vehicleSelected', JSON.stringify(userVehicle));
      navigate('/Dashboard');
    }
  }, [userVehicle]);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = dispatch(getVehicles());
      dataSet(await response);
    }
    fetchMyAPI();
  }, []);

  // Response to click in VehicleItem component
  const onClick = (e: SetStateAction<null>) => {
    setUserVehicle(e);
  };

  // Implementation of mapping components.
  return (
    <div className="container">
      <p className="text-4xl text-[#176C3E] font-semibold pt-20 pb-10">
        Choose your vehicle
      </p>
      {data ? (
        <div className="grid grid-cols-2 gap-4">
          {data.payload.map((car: any) => {
            return (
              <div className="flex items-center justify-center w-40 m-5 shadow-2xl rounded-3xl">
                <VehicleItem car={car} onClick={onClick} />
              </div>
            );
          })}
        </div>
      ) : (
        'Loading'
      )}
    </div>
  );
}

export default Vehicles;
