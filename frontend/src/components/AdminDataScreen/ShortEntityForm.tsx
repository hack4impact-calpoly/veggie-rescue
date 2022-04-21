import React, { useState } from 'react';
import './EntityForm.css';

const ShortEntityForm = (props:any) => {
  const volunteerSchema = {
    volunteerName: "",
    volunteerPin: ""
  };

  const vehicleSchema = {
    vehicleName: "",
  };

  const [volunteer, setVolunteer] = useState(true);
  const [vehicle, setVehicle] = useState(false);
  const [volunteerCard, setVolunteerCard] = useState(volunteerSchema);
  const [vehicleCard, setVehicleCard] = useState(vehicleSchema);

  function setVolunteerCardPin(e:string){
    setVolunteerCard({
      ...volunteerCard,
      volunteerPin: e
    });
  };
  function setVolunteerCardName(e:string){
    setVolunteerCard({
      ...volunteerCard,
      volunteerName: e
    });
  };
  function setVehicleCardName(e:string){
    setVehicleCard({
      vehicleName: e
    });
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
       (((volunteer && volunteerCard.volunteerName === "") ||
        (vehicle && vehicleCard.vehicleName === "")) ? alert("Missing Name") :
       ((volunteer && (volunteerCard.volunteerPin === "")) ? alert("Missing Pin") :
       props.handleShow()))

     /* objects to be sent to backend */
     volunteer ? console.log(JSON.stringify(volunteerCard)) :
                 console.log(JSON.stringify(vehicleCard))
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
      onChange={(e:any) => (volunteer ? setVolunteerCardName(e.target.value) :
                                        setVehicleCardName(e.target.value))}
    />
    { volunteer && (
      <div className="internal-div"><h2>Pin</h2>
      <input
        className="input"
        placeholder="Pin"
        onChange={(e:any) => setVolunteerCardPin(e.target.value)}
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