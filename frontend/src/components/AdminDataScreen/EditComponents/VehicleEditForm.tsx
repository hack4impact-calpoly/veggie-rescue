import React, { useLayoutEffect, useState } from 'react';
import '../EntityForm.css';
import { RiUser3Fill } from 'react-icons/ri';

const VehicleEditForm = (props: any) => {
  const [name, setName] = useState(props.dataToEdit.name);

  function handleSubmit(e:any){
     e.preventDefault();
     {
       ((name == "") ? alert("Missing Name") :
       closeComponent())}
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
    <button
      type="submit"
      id="form-submit"
    >Done</button>
    </div>
  </form>
  );
}

export default VehicleEditForm;