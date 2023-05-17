import './VolunteersCard.css';
import { RiUser3Fill } from 'react-icons/ri';

function VolunteersCard(props: any) {
  const { handleShow, volunteer, volunteerHandler } = props;
  const sendData = () => {
    handleShow();
    volunteerHandler(volunteer);
  };
  return (
    <button type="submit" onClick={sendData}>
      <div className="volunteer-card">
        <div>
          <RiUser3Fill className="user-icon" style={{ color: 'FF9C55' }} />
        </div>
        <h3 className="volunteer-text">{volunteer.name}</h3>
        <h3 className="pin-text">pin: {volunteer.pin}</h3>
      </div>
    </button>
  );
}

export default VolunteersCard;
