import './VehiclesCard.css';
import { IoCar } from 'react-icons/io5';

function VehiclesCard(props: any) {
  const { vehicle, handleShow, vehicleHandler } = props;
  const sendData = () => {
    handleShow();
    vehicleHandler(vehicle);
  };
  return (
    <button type="submit" onClick={sendData}>
      <div className="volunteer-card ">
        <div>
          <IoCar className="car-icon" style={{ color: '#FF9C55' }} />
        </div>
        <h3 className="volunteer-text">{vehicle.name}</h3>
      </div>
    </button>
  );
}

export default VehiclesCard;
