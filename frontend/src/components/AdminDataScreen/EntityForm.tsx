import React, { useState } from 'react';
import './EntityForm.css';

/* Form to add recipient or donor */
const EntityForm = (props: any) => {

  /* Recipient and donor state data here */
  const [entityType, setEntityType] = useState("");
  const [locationType, setLocationType] = useState("");
  const [areaName, setAreaName] = useState("");
  const [donorName, setDonorName] = useState("");
  const [demographicName, setDemographicName] = useState("");
  const [donor, setDonor] = useState(true);
  const [recipient, setRecipient] = useState(false);
  let foodTypes = ['Baked Goods','Packaged/Processed','Produce'];
  const [selectedFoods, setSelectedFoods] = useState([]);

  function handleDonor(){
    setDonor((prev) => !prev);
    setRecipient(false);
  }

  function handleRecipient(){
    setRecipient((prev) => !prev);
    setDonor(false);
  }

  const handleFoodClick = (name:any) =>{
    let filtered = selectedFoods.filter(item => (item !== name));
      ((JSON.stringify(filtered) !== JSON.stringify(selectedFoods)) ?
        (setSelectedFoods(selectedFoods =>
          filtered))
          :
          (setSelectedFoods(selectedFoods =>
            selectedFoods.concat(name))))
  }

  function handleSubmit(e:any){
     e.preventDefault();
     (!donor && !recipient) ? alert("Please select Donor or Recipient") :
       ((donorName === "") ? alert("Missing Entity Name") :
       ((entityType === "") ? alert("Missing Entity Type") :
       ((selectedFoods.length <= 1) ? alert("Missing Food Type") :
       ((areaName === "") ? alert("Missing Area Name") :
       ((donor && (locationType === "")) ? alert("Missing Location Type") :
       ((recipient && (demographicName === "")) ? alert("Missing Demographic Name") :
       props.handleShow()))))))
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X-form" onClick={props.handleShow}>x</button></div>
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
      onChange={(e:any) => setDonorName(e.target.value)}
      />
    <h2>Entity Type</h2>
    <input
      className="input"
      placeholder="Entity Type"
      onChange={(e:any) => setEntityType(e.target.value)}
    />
    <h2>Food Type</h2>
    <h4>Select all that apply</h4>
    <div className="food-type-admin">
      {(foodTypes).map((v:any, index:any) => {
        return(
          <Button className="food-button" id={index} name={v} handleClick={handleFoodClick.bind(this,v)}/>
      );
      })}
    </div>
    { donor ? (
      <div className="internal-div"><h2>Location Type</h2>
      <input
        className="input"
        placeholder="Location Type"
        onChange={(e:any) => setLocationType(e.target.value)}
      /></div>
      ) : (
      <div className="internal-div"><h2>Demographic Name</h2>
      <input
        className="input"
        placeholder="Demographic Name"
        onChange={(e:any) => setDemographicName(e.target.value)}
      /></div>
    )}
    <h2>Combined Area Name</h2>
    <input
      className="input"
      placeholder="Combined Area Name"
      onChange={(e:any) => setAreaName(e.target.value)}
    />
    <button
      type="submit"
      id="form-submit"
    >Done</button>
    </div>
  </form>
  );
}

/* button for food types */
const Button = (props:any) => {
  const [color, setColors] = React.useState("");
  const [active, setActive] = React.useState(false);
  const handleClickButton = (name:'') => {
    setActive(true);
    setColors('2px solid #FF9C55');
    if (active === true) {
      setActive(false);
      setColors("");
    }
    props.handleClick(props.name);
  };

  return (
    <button
      type="button"
      className="food-button"
      onClick={() => handleClickButton(props.name)}
      style={{border:color}}
    >
      {props.name}
    </button>
  );
};

export default EntityForm;