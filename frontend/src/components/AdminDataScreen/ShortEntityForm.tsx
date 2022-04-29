import React, { useState } from 'react';
import './EntityForm.css';
import { useAppDispatch } from '../../app/hooks';
import { createDriver } from '../../features/driverAuth/driverAuthSlice'

/* Form to add driver or vehicle */
const ShortEntityForm = (props: any) => {

  /* Driver and vehicle state data here */
  const [volunteerName, setName] = useState("");
  const [volunteerPin, setPin] = useState("");
  const [volunteerEmail, setEmail] = useState("");
  const [volunteer, setVolunteer] = useState(true);
  const [vehicle, setVehicle] = useState(false);
  const dispatch = useAppDispatch();

  const dispatchDriver = () => {
    props.handleShow();
    dispatch(createDriver({
      _id: "0",
      name: volunteerName,
      email: volunteerEmail,
      pin: volunteerPin
    }));
    window.location.reload();
  };

  function handleVolunteer(){
    setVolunteer((prev) => !prev);
    setVehicle(false);
  }

  function handleVehicle(){
    setVehicle((prev) => !prev);
    setVolunteer(false);
  }

  function handleSubmit(e:any){
     e.preventDefault();
     (!volunteer && !vehicle) ? alert("Please select Volunteer or Vehicle") :
       ((volunteerName === "") ? alert("Missing Name") :
       ((volunteer && (volunteerPin === "")) ? alert("Missing Pin") :
       dispatchDriver()))
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card short-entity" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X-form" onClick={props.handleShow}>x</button></div>
    </div>
    <div className="entity-type">
      <button className="type-button" type="button" onClick={handleVolunteer} style={{border: volunteer ? '2px solid #FF9C55' : ''}}>
        Volunteer
      </button>
      <button className="type-button" type="button" onClick={handleVehicle} style={{border: vehicle ? '2px solid #FF9C55' : ''}}>
        Vehicle
      </button>
    </div>
    <h2>Name</h2>
    <input
      className="input"
      placeholder="Name"
      onChange={(e:any) => setName(e.target.value)}
      />
    { volunteer && (
      <div className="internal-div"><h2>Email</h2>
        <input
          className="input"
          placeholder="Email"
          onChange={(e:any) => setEmail(e.target.value)}
        /></div>
    )}
    { volunteer && (
      <div className="internal-div"><h2>Pin</h2>
      <input
        className="input"
        placeholder="Pin"
        onChange={(e:any) => setPin(e.target.value)}
      /></div>
    )}
    <button
      type="submit"
      id="form-submit"
    >Done</button>
    </div>
  </form>
  );
}

export default ShortEntityForm;