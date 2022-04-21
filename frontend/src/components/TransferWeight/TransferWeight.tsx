import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';
import './TransferWeight.css';
import TransferringElement from './TransferringElement';
import {
  getVehicles,
  getVehicle,
  updateVehicle,
  reset as resetVehicles,
  clear as clearVehicles

} from '../../features/vehicles/vehiclesSlice';

export default function TransferWeight() {
    const { driver } = useAppSelector((state) => state.driverAuth);
    const {
    vehicles,
    vehicle,
    isLoggedOut,
    isUpdate,
    isError,
    isSuccess,
    message,
  } = useAppSelector((state) => state.vehicle);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [checkedState, setCheckedState] = useState( new Array(vehicles.length).fill(false))
  const [choice, setChoice] = useState("");

  const selectVehicle = (e : number , s : string ) => {
    const updatedCheckedState = checkedState.map((item, id )=>  {
      if (id === e) {
        return !item;
      } else {
      return false;
      }})
      setChoice(s)
      setCheckedState(updatedCheckedState);
     };


useEffect(()=>{ 
  if(vehicles.length === 0){
    dispatch(getVehicles())
  }
  if(Object.keys(vehicle).length === 0){
    dispatch(getVehicle())
  }
  if(isSuccess && !isUpdate){
    setCheckedState(new Array(vehicles.length).fill(false))
    dispatch(resetVehicles())
  }
  if(isSuccess && isUpdate)
  {
    dispatch(resetVehicles())
    navigate('/Dashboard')
  }
  if(isUpdate && !isSuccess){
    if(isLoggedOut){
      //dispatch(clearVehicles())
      navigate('/')
    }else{
      dispatch(getVehicle())
 
    } 
  }
},[dispatch, isLoggedOut, isSuccess, isUpdate, navigate, vehicle, vehicles.length])

const submitWeight =  (event: React.MouseEvent<HTMLButtonElement> )=> {
  event.preventDefault();
    let index = -1;

    console.log("Here you go" + choice)

    checkedState.map((e, idx)=>{ return( e ? index = idx : index)})
    const vi = vehicles.filter(car => ((car.name === choice|| (car.name === 'personal vehicle' && car._id === driver._id)) ));
  // still have to deal with personal vehicle situation.
      
    if(vehicles && vehicle){
    const vehicleOneWeight = 0;
    const vehicleTwoWeight = vi[0].totalWeight + vehicleOneWeight;

    if(vehicleOneWeight < 0){
      toast.error("invalid amount")
    }else{
    const currentVehicle = { _id: vehicle._id, totalWeight: vehicleOneWeight };
    const updatedVehicle =  { _id: vi[0]._id, totalWeight: vehicleTwoWeight  };
    console.log('CURRENT VEHICLE IS '+ currentVehicle._id)
    console.log('Updated vehicle is: ' + updatedVehicle._id)
    dispatch(updateVehicle(updatedVehicle));

    dispatch(updateVehicle(currentVehicle));
         if(isLoggedOut){
      toast.success('Success! ' + vehicle.name + ' transferred weight to ' + vi[0].name)
    }else{
      toast.success('Success! ' + vehicle.name + ' transferred weight to ' + vi[0].name)
    } 
    }


    // //console.log('Transferring to the ' + vehicles[index].name + ' element.'); // console logs weights typed in in the order of vehicles in Vehicle list
    }
  }




  return (
    <div className='flex flex-col items-center'>
      <div className="tPageString p-10">
        Which vehicle would you like to transfer to?
        <h1 className='text-3xl text-black '>Current weight {vehicle.totalWeight}lbs</h1>
      </div>
       <div className='flex flex-col w-1/2  '>{vehicles.filter(car => (car.driver !== driver._id )
).map((v, idx)=>{        
            return (
                <TransferringElement v={v.name} key={idx} selectVehicle={selectVehicle} idx={idx} checkedState={checkedState} />
            );
          
        })}</div>
      <button className="submit" onClick={submitWeight} >Submit</button>
     
    </div>
  );
}
