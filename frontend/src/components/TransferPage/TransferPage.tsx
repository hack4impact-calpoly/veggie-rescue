import './TransferPage.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { useNavigate } from 'react-router-dom';

export default function TransferPage() {
  const {
    vehicles,
    vehicle,
    isError: vehicleError,
    isSuccess: vehicleSuccess,
    message: vehicleMessage
  } = useAppSelector((state) => state.vehicle);
  const navigate = useNavigate();

  const { name, totalWeight} = vehicle
  const vehicleType = "Van";
  const numOfPounds = 200;

  function transfer(){
    navigate('/TransferPage')
  }

  function leaveIt(){
    navigate('/Dashboard')
  }

  return (
    <div className='container'>
      <div className="tPageString">{name} currently has</div>
      <div className="tPagePounds">{totalWeight} pounds</div>
      <button className="transferButton flex items-center justify-center " onClick={transfer}> Transfer it </button>
      <button className="transferButton flex items-center justify-center" onClick={leaveIt}> Leave it </button>
    </div>
  );
}