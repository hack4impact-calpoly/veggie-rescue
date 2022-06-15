import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate, Link  } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';

// import driverAuth, vehicles, batchDropoff and batchPickup slice
import { clear as clearDrivers } from '../../features/driverAuth/driverAuthSlice';
import {
  logoutVehicle,
  clear as clearVehicles,
  reset as resetVehicles,
  setIsLoggingOut
} from '../../features/vehicles/VehiclesSlice';
import { setSuccess as setPickupSuccess } from '../../features/pickups/pickupsSlice';
import { setSuccess as setDropoffSuccess } from '../../features/dropoffs/dropoffsSlice';

export default function TransferPage() {
  // setup navigation and services
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // external state
  const { vehicle, isLoggingOut, isLoggedOut } = useAppSelector(
    (state) => state.vehicle
  );
  const { name, totalWeight } = vehicle;
  const { driver } = useAppSelector((state) => state.driverAuth);
  // on component mount
  useEffect(() => {
    if (isLoggedOut && isLoggingOut) {
      toast.success('Successfully logged out.');
      // Clear state for vehicles and auth and then navigate to Login page.
      dispatch(clearVehicles());
      dispatch(clearDrivers());
      navigate('/');
    }
  }, [dispatch, isLoggedOut, isLoggingOut, navigate]);
  const backFunc = () =>{
    if(isLoggingOut){
      // this is to go back to dashboard 
      dispatch(setIsLoggingOut())
      dispatch(setPickupSuccess())
      dispatch(setDropoffSuccess())
  }else{
      // this is to go back to vehicles
      dispatch(clearVehicles());
    }
     navigate(-1);
  }
  function transfer() {
    dispatch(resetVehicles());
    navigate('/Transfering');
  }
  // if driver opts to leave standing vehicle weight
  function leaveIt() {
    // this flags whether we are coming from choosing a vehicle, or coming from punching out in dashboard
    if (isLoggingOut) {
      const currentPickups: pickupObject[] = [];
      const currentDropoffs: dropoffObject[] = [];
      let resetVehicle = {
        _id: vehicle._id,
        driver: vehicle.name === 'personal vehicle' ? driver.id : ' ',
        currentPickups,
        currentDropoffs,
        isLoggedIn: 'false'
      };
      dispatch(setDropoffSuccess());
      dispatch(setPickupSuccess());
      dispatch(logoutVehicle(resetVehicle));
    } else {
      navigate('/Dashboard');
    }
  }
  return (
    <div className="container p-2">

      <div className="flex flex-row mx-3 mt-16 mb-7 md:text-5xl  text-3xl font-semibold text-lime-900 md:w-3/5 w-5/6">
         <button className='items-center justify-center '
            id="icon"
            onClick={backFunc}
          >
            <img className='h-16' src={NavBarButton_DARK} alt="leftButton"/>
          </button>
           <div className='flex flex-col'>
              <span className='capitalize'>{name}</span> 
              <span>currently has</span>
            </div>
          </div>
      <div className="md:my-4 my-10 text-5xl font-bold text-amber-600">{totalWeight} lbs</div>
      <button className="
          bg-white rounded-2xl md:w-3/5 w-5/6 h-1/5 drop-shadow-lg my-5 
         text-5xl  font-semibold
          flex items-center justify-center transform active:translate-y-2"
        onClick={transfer}>
        Transfer it
      </button>
      <button
        className="
          bg-white rounded-xl md:w-3/5 w-5/6 h-1/5 drop-shadow-lg my-5
          text-5xl font-semibold
          flex items-center justify-center transform active:translate-y-2"
        onClick={leaveIt}>
        Leave it
      </button>
    </div>
  );

  interface pickupObject {
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    donorEntityType: String;
    foodType: String;
    area: String;
    lbsPickedUp: Number;
  }
  interface dropoffObject {
    date: String;
    driver: String;
    vehicle: String;
    name: String;
    recipientEntityType: String;
    demographic: String;
    foodType: String;
    area: String;
    lbsDroppedOff: Number;
  }
}
