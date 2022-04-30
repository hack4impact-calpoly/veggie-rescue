import { useEffect } from 'react';
import './TransferPage.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// import driverAuth, vehicles, batchDropoff and batchPickup slice
import { clear as clearDrivers} from '../../features/driverAuth/driverAuthSlice';
import {
  logoutVehicle,
  clear as clearVehicles,
} from '../../features/vehicles/VehiclesSlice';
import {
  setSuccess as setPickupSuccess
} from '../../features/pickups/pickupsSlice';
import { 
setSuccess as setDropoffSuccess  
} from '../../features/dropoffs/dropoffsSlice';


export default function TransferPage() {
  // setup navigation and services
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // external state
  const { vehicle, isLoggingOut, isLoggedOut } = useAppSelector((state) => state.vehicle);
  const { name, totalWeight} = vehicle
  const { driver } = useAppSelector((state) => state.driverAuth);

  // on component mount
  useEffect(()=>{
    if(isLoggedOut && isLoggingOut){
      toast.success('Successfully logged out.')
      // Clear state for vehicles and auth and then navigate to Login page.
      dispatch(clearVehicles());
      dispatch(clearDrivers());   
      //navigate('/');
    }
  },[dispatch, isLoggedOut, isLoggingOut, navigate])

  function transfer(){
    navigate('/TransferPage')
  }

  // if driver opts to leave standing vehicle weight
  function leaveIt(){
    // this flags whether we are coming from choosing a vehicle, or coming from punching out in dashboard
    if(isLoggingOut){
      const currentPickups : pickupObject[] = []
      const currentDropoffs : dropoffObject[] = []
      let resetVehicle = { _id: vehicle._id, driver: vehicle.name  === 'personal vehicle' ? driver.id : " " , currentPickups , currentDropoffs, isLoggedIn: "false" };
      dispatch(setDropoffSuccess())
      dispatch(setPickupSuccess())
      dispatch(logoutVehicle(resetVehicle))
    }else{
    navigate('/Dashboard')}}

  return (
    <div className='container'>
      <div className="tPageString">{name} currently has</div>
      <div className="tPagePounds">{totalWeight} pounds</div>
      <button className="transferButton flex items-center justify-center " onClick={transfer}> Transfer it </button>
      <button className="transferButton flex items-center justify-center" onClick={leaveIt}> Leave it </button>
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