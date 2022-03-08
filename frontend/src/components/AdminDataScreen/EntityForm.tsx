import React, { useLayoutEffect, useState } from 'react';
import './EntityForm.css';
import { RiUser3Fill } from 'react-icons/ri';

const EntityForm = (props: any) => {
  const [entityType, setEntityType] = useState("");
  const [locationType, setLocationType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [areaName, setAreaName] = useState("");
  const [donorName, setDonorName] = useState("");
  const [demographicName, setDemographicName] = useState("");
  const [donor, setDonor] = useState(true);
  const [recipient, setRecipient] = useState(false);

  function handleDonor(){
    setDonor((prev) => !prev);
    setRecipient(false);
  }
  function handleRecipient(){
    setRecipient((prev) => !prev);
    setDonor(false);
  }
  function handleSubmit(e:any){
     e.preventDefault();
     {(!donor && !recipient) ? alert("Please select Donor or Recipient") :
       ((donorName == "") ? alert("Missing Entity Name") :
       ((entityType == "") ? alert("Missing Entity Type") :
       ((foodType == "") ? alert("Missing Food Type") :
       ((areaName == "") ? alert("Missing Area Name") :
       ((donor && (locationType == "")) ? alert("Missing Location Type") :
       ((recipient && (demographicName == "")) ? alert("Missing Demographic Name") :
       props.handleShow()))))))}
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X" onClick={props.handleShow}>x</button></div>
    </div>
    <div className="entity-type">
      <button className="type-button" type="button" onClick={handleDonor} style={{border: donor ? '2px solid #FF9C55' : ''}}>
        Donor
      </button>
      <button className="type-button" type="button" onClick={handleRecipient} style={{border: recipient ? '2px solid #FF9C55' : ''}}>
        Recipient
      </button>
    </div>

    <h2>Entity Name</h2>
    <input
      className="input"
      placeholder="Donor Name"
      onChange={(e:any) => setDonorName(e)}
      />
    <h2>Entity Type</h2>
    <input
      className="input"
      placeholder="Entity Type"
      onChange={(e:any) => setEntityType(e)}
    />
    <h2>Food Type</h2>
    <input
          className="input"
          placeholder="Food Type"
          onChange={(e:any) => setFoodType(e)}
    />
    { donor ? (
      <div className="internal-div"><h2>Location Type</h2>
      <input
        className="input"
        placeholder="Location Type"
        onChange={(e:any) => setLocationType(e)}
      /></div>
      ) : (
      <div className="internal-div"><h2>Demographic Name</h2>
      <input
        className="input"
        placeholder="Demographic Name"
        onChange={(e:any) => setDemographicName(e)}
      /></div>
    )}
    <h2>Combined Area Name</h2>
    <input
      className="input"
      placeholder="Combined Area Name"
      onChange={(e:any) => setAreaName(e)}
    />
    <button
      type="submit"
      id="form-submit"
    >Done</button>
    </div>
  </form>
  );
}

export default EntityForm;