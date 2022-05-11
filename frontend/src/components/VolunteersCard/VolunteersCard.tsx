import './VolunteersCard.css';
import { RiUser3Fill } from 'react-icons/ri';

const VolunteersCard = (props: any) => {
  const sendData = () =>{
    props.handleShow()
    props.volunteerHandler(props.volunteer)
  }
  return(

    <button onClick={sendData} >
      <div className="volunteer-card">
        <div><RiUser3Fill className="user-icon" style={{color: 'FF9C55'}}/></div>
        <h3 className="volunteer-text">{ props.volunteer.name }</h3>
        <h3 className="pin-text">pin: { props.volunteer.pin }</h3>
      </div>
    </button>
  );
}

export default VolunteersCard;