import React, { useLayoutEffect, useState } from 'react';
import './EntityForm.css';
import { RiUser3Fill } from 'react-icons/ri';

const ShortEntityForm = (props: any) => {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [volunteer, setVolunteer] = useState(true);
  const [vehicle, setVehicle] = useState(false);

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
     {(!volunteer && !vehicle) ? alert("Please select Volunteer or Vehicle") :
       ((name == "") ? alert("Missing Name") :
       ((volunteer && (pin == "")) ? alert("Missing Pin") :
       props.handleShow()))}
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card short-entity" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X" onClick={props.handleShow}>x</button></div>
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
      onChange={(e:any) => setName(e)}
      />
    { volunteer && (
      <div className="internal-div"><h2>Pin</h2>
      <input
        className="input"
        placeholder="Pin"
        onChange={(e:any) => setPin(e)}
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