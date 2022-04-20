import React, { useLayoutEffect, useState } from 'react';
import '../EntityForm.css';
import { RiUser3Fill } from 'react-icons/ri';

const VolunteerEditForm = (props: any) => {
  const [name, setName] = useState(props.dataToEdit.name);
  const [pin, setPin] = useState(props.dataToEdit.pin);

  function handleSubmit(e:any){
     e.preventDefault();
     {
       ((name == "") ? alert("Missing Name") :
       (((pin == "")) ? alert("Missing Pin") :
       closeComponent()))}
  }

  function closeComponent(){
    props.setEdit(false);
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card short-entity" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X" onClick={closeComponent}>x</button></div>
    </div>
    <h2>Name</h2>
    <input
      className="input"
      placeholder='Name'
      defaultValue={props.dataToEdit.name}
      onChange={(e:any) => setName(e)}
      />
      <div className="internal-div"><h2>Pin</h2>
      <input
        className="input"
        placeholder='pin'
        defaultValue={props.dataToEdit.pin}
        onChange={(e:any) => setPin(e)}
      /></div>
    <button
      type="submit"
      id="form-submit"
    >Done</button>
    </div>
  </form>
  );
}

export default VolunteerEditForm;