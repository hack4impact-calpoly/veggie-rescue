import React, { useEffect, useState } from 'react';
import './EntityForm.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';

import {
  getDonors,
  updateDonor,
  deleteDonor,
  createDonor
} from '../../features/donors/donorSlice';

import {
  getRecipients,
  createRecipient,
  updateRecipient,
  deleteRecipient
} from '../../features/recipients/recipientsSlice';


/* Form to add recipient or donor */
const EntityForm = (props: any) => {

  /* Recipient and donor state data here */
  const [entityType, setEntityType] = useState(props.isUpdate ? props.whichEntity ? props.donor.EntityType : props.recipient.EntityType : '');
  const [locationType, setLocationType] = useState(props.isUpdate ? props.whichEntity ? props.donor.LocationType : '' : '');
  const [areaName, setAreaName] = useState(props.isUpdate ? props.whichEntity ? props.donor.CombinedAreaName : props.recipient.CombinedAreaName : '');
  const [donorName, setDonorName] = useState(props.isUpdate ? props.whichEntity ? props.donor.name : props.recipient.name : '');
  const [demographicName, setDemographicName] = useState(props.isUpdate ? props.whichEntity ? '' : props.recipient.DemographicName : '');

  const [donor, setDonor] = useState(true);
  const [recipient, setRecipient] = useState(false);
  let foodTypes = ['Baked','Packaged','Produce'];
  // const [selectedFoods, setSelectedFoods] = useState(props.isUpdate ? props.whichEntity ? props.donor.foodType : props.recipient.foodType : []);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const [isDonor, setIsDonor] = useState(props.whichEntity);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (props.whichEntity) {
      handleDonor();
    }
  }, []);

  const dispatchGetDonors = () => {
    dispatch(getDonors());
  };
  const dispatchGetRecipients = () => {
    dispatch(getRecipients());
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log("CREATE")
    if (isDonor) {
      await dispatch(
        createDonor({
          id: '0',
          name: donorName,
          EntityType: entityType,
          FoodType: selectedFoods.toString(), //this is weird
          LocationType: locationType,
          CombinedAreaName: areaName,
        })
      );
      toast.success('Successfully created new donor.');
      dispatchGetDonors();
    } else {
      console.log(selectedFoods.toString());
      // console.log('creation of a new Volunteer');
      // here we can put the call to create a new volunteer
      await dispatch(
        createRecipient({
          id: '0',
          name: donorName,
          EntityType: entityType,
          FoodType: selectedFoods.toString(), //this is weird
          DemographicName: demographicName,
          CombinedAreaName: areaName,
        })
      );
      toast.success('Successfully created new recipient.');

      dispatchGetRecipients();
    }

    props.handleShow();
  };

  const dispatchUpdate = async () => {
    console.log("UPDAATE")    
    if (isDonor) {
      await dispatch(
        updateDonor({
          id: props.donor._id,
          name: donorName,
          EntityType: entityType,
          FoodType: selectedFoods.toString(), //this is weird
          LocationType: locationType,
          CombinedAreaName: areaName,
        })
      );
      toast.success('Successfully updated donor.');
      dispatchGetDonors();
    } else {
      console.log(selectedFoods.toString());
      await dispatch(
        updateRecipient({
          id: props.recipient._id,
          name: donorName,
          EntityType: entityType,
          FoodType: selectedFoods.toString(), //this is weird
          DemographicName: demographicName,
          CombinedAreaName: areaName,
        })
      );
      toast.success('Successfully updated recipient.');
      dispatchGetRecipients();
    }
    props.handleShow();
  };
  const dispatchDelete = async (e: any) => {
    console.log("DELETE")
    e.preventDefault();
    if (isDonor) {
      await dispatch(deleteDonor(props.donor._id));
      toast.success('Successfully deleted donor.');
      dispatchGetDonors();
    } else {
      console.log('deletion of person');
      await dispatch(deleteRecipient(props.recipient._id));
      toast.success('Successfully deleted recipient.');
      dispatchGetRecipients();
    }

    props.handleShow();
  };

  function handleDonor(){
    setDonor((prev) => !prev);
    setRecipient(false);
    // setIsDonor(true);
  }

  function handleRecipient(){
    setRecipient((prev) => !prev);
    setDonor(false);
    // setIsDonor(false);
  }

  const handleFoodClick = (name:any) =>{
    // console.log("here: " + name)
    let filtered = selectedFoods.filter((item : any) => (item !== name));
    // console.log(filtered);
    // console.log(selectedFoods);
      ((JSON.stringify(filtered) !== JSON.stringify(selectedFoods)) ?
        (setSelectedFoods((selectedFoods : any) =>
          filtered))
          :
          (setSelectedFoods((selectedFoods : any) =>
            selectedFoods.concat(name))))
  }

  function handleSubmit(e:any){
     e.preventDefault();
      if (donorName === ''){
        toast.error("Missing Entity Name")
        return
      }
      else if (entityType === ''){
        toast.error("Missing Entity Type")
        return
      }
      else if (selectedFoods.length < 1){
        toast.error("Missing Food Type")
        return
      }
      else if (areaName === ''){
        toast.error("Missing Area Name")
        return
      }
      if (isDonor && locationType === ''){
        toast.error("Missing Location Type")
        return
      }
      else if (!isDonor && demographicName === ''){
        toast.error("Missing Demographic Type")
        return
      }
      if (props.isUpdate)
        dispatchUpdate();
      else
        dispatchCreateNew();
  }

  return(
  <form onSubmit={handleSubmit} className="modal-container">
    <div className="entity-card" id="modal">
    <div id="entity-title">
      <div className="title-content">Add Entity</div>
      <div className="title-content"><button type="button" id="X-form" onClick={props.handleShow}>x</button></div>
    </div>
    <div className="entity-type">
      <button className="type-button" type="button" onClick={handleDonor} style={{border: isDonor ? '2px solid #FF9C55' : ''}}>
        Donor
      </button>
      <button className="type-button" type="button" onClick={handleRecipient} style={{border: !isDonor ? '2px solid #FF9C55' : ''}}>
        Recipient
      </button>
    </div>

    <h2>Entity Name</h2>

    <input
      className="input"
      placeholder={
        (!props.isUpdate)
          ? "Name"
          : ""  
      }
      defaultValue={
        (props.isUpdate)
          ? (isDonor)
            ? props.donor.name 
            : props.recipient.name
          : ""
      }
      onChange={(e:any) => setDonorName(e.target.value)}
      />

    <h2>Entity Type</h2>
    <input
      className="input"
      placeholder={
        (!props.isUpdate)
          ? "Entity Type"
          : ""  
      }
      defaultValue={
        (props.isUpdate)
          ? (isDonor)
            ? props.donor.EntityType 
            : props.recipient.EntityType
          : ""
      }
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
    { isDonor ? (
      <div className="internal-div"><h2>Location Type</h2>
      <input
        className="input"
        // placeholder="Location Type"
        placeholder={
          (!props.isUpdate)
            ? "Location Type"
            : ""  
        }
        defaultValue={
          (props.isUpdate)
              ? props.donor.LocationType 
            : ""
        }
        onChange={(e:any) => setLocationType(e.target.value)}
      /></div>
      ) : (
      <div className="internal-div"><h2>Demographic Name</h2>
      <input
        className="input"
        // placeholder="Demographic Name"
        placeholder={
          (!props.isUpdate)
            ? "Demographic Name"
            : ""  
        }
        defaultValue={
          (props.isUpdate)
              ? props.recipient.DemographicName 
            : ""
        }
        onChange={(e:any) => setDemographicName(e.target.value)}
      /></div>
    )}
    <h2>Combined Area Name</h2>
    <input
      className="input"
      // placeholder="Combined Area Name"
      placeholder={
        (!props.isUpdate)
          ? "Combined Area Name"
          : ""  
      }
      defaultValue={
        (props.isUpdate)
          ? (isDonor)
            ? props.donor.CombinedAreaName 
            : props.recipient.CombinedAreaName
          : ""
      }
      onChange={(e:any) => setAreaName(e.target.value)}
    />
    <div className="flex flex-row w-full">
          <button type="submit" id="form-submit" onClick={handleSubmit}>
            {props.isUpdate ? 'Update' : 'Done'}
          </button>
          {props.isUpdate && (
            <button type="submit" id="form-submit" onClick={dispatchDelete}>
              Delete
            </button>
          )}
      </div>
    </div>
  </form>
  );
}

/* button for food types */
const Button = (props:any) => {
  const [color, setColors] = React.useState("");
  const [active, setActive] = React.useState(false)
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