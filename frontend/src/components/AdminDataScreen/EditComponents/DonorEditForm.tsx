import React, { useLayoutEffect, useState } from 'react';
import '../EntityForm.css';
import { RiUser3Fill } from 'react-icons/ri';

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

const DonorEditForm = (props: any) => {
  const [entityType, setEntityType] = useState(props.dataToEdit.entityType);
  const [locationType, setLocationType] = useState(props.dataToEdit.locationType);
  const [foodType, setFoodType] = useState(props.dataToEdit.foodType);
  const [areaName, setAreaName] = useState(props.dataToEdit.area);
  const [donorName, setDonorName] = useState(props.dataToEdit.donorName);
  const [demographicName, setDemographicName] = useState("");
  const [donor, setDonor] = useState(true);
  const [recipient, setRecipient] = useState(false);
  const [border, setBorder] = useState('1px solid black');
  let foodTypes = ['Baked Goods','Packaged/Processed','Produce'];
  let selectedFoodTypes = [''];

  const handleFoodClick = (name: '') =>{
    /* remove from selectedFoodTypes list if in list */
    var beforeLen = selectedFoodTypes.length;
    selectedFoodTypes = (selectedFoodTypes.filter(item => (item !== name)));
    var afterLen = selectedFoodTypes.length;
    /* otherwise, add to selectedFoodTypes list */
    {(afterLen == beforeLen) && selectedFoodTypes.push(name)};
  }

  function handleSubmit(e:any){
     e.preventDefault();
     {
       ((donorName == "") ? alert("Missing Entity Name") :
       ((entityType == "") ? alert("Missing Entity Type") :
       ((selectedFoodTypes.length <= 1) ? alert("Missing Food Type") :
       ((areaName == "") ? alert("Missing Area Name") :
       ((donor && (locationType == "")) ? alert("Missing Location Type") :
       ((recipient && (demographicName == "")) ? alert("Missing Demographic Name") :
       closeComponent()))))))}
  }

  function closeComponent(){
    props.setEdit(false);
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X" onClick={closeComponent}>x</button></div>
    </div>
    <h2>Entity Name</h2>
    <input
      className="input"
      defaultValue={props.dataToEdit.name}
      placeholder="Donor Name"
      onChange={(e:any) => setDonorName(e)}
      />
    <h2>Entity Type</h2>
    <input
      className="input"
      placeholder="Entity Type"
      defaultValue={props.dataToEdit.donorEntityType}
      onChange={(e:any) => setEntityType(e)}
    />
    <h2>Food Type</h2>
    <h4>Select all that apply</h4>
    <div className="food-type">
      {(foodTypes).map((v:any, index:any) => {
        return(
          <Button id={index} name={v} handleClick={handleFoodClick}/>
      );
      })}
    </div>
      <div className="internal-div"><h2>Location Type</h2>
      <input
        className="input"
        placeholder="Location Type"
        defaultValue={props.dataToEdit.donorLocationType}
        onChange={(e:any) => setLocationType(e)}
      /></div>
    <h2>Combined Area Name</h2>
    <input
      className="input"
      placeholder="Combined Area Name"
      defaultValue={props.dataToEdit.area}
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

export default DonorEditForm;