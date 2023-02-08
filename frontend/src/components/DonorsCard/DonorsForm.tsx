import { useEffect, useState } from 'react';
import * as React from 'react';
import './DonorsForm.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { toast } from 'react-toastify';

import {
  getDonors,
  updateDonor,
  deleteDonor,
  createDonor
} from '../../features/donors/donorSlice';

/* Material UI import for dropdown menus */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


/* Form to add recipient or donor */
const DonorsForm = (props: any) => {

  /* Recipient and donor state data here */
  const [entityType, setEntityType] = useState(props.isUpdate ? props.donor.EntityType : '');
  const [locationType, setLocationType] = useState(props.isUpdate ? props.donor.LocationType : '');
  const [areaName, setAreaName] = useState(props.isUpdate ? props.donor.CombinedAreaName : '');

  const [donorName, setDonorName] = useState(props.isUpdate ? props.donor.name : '');
  
  const [donor, setDonor] = useState(true);
  let foodTypes = ['Baked','Packaged','Produce'];
  // const [selectedFoods, setSelectedFoods] = useState(props.isUpdate ? props.whichEntity ? props.donor.foodType : props.recipient.foodType : []);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const dispatch = useAppDispatch();

  const dispatchGetDonors = () => {
    dispatch(getDonors());
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log("CREATE")
    await dispatch(
      createDonor({
        id: '0',
        name: donorName,
        EntityType: entityType,
        LocationType: locationType,
        CombinedAreaName: areaName,
      })
    );
    toast.success('Successfully created new donor.');
    dispatchGetDonors();
    props.handleShow();
  };

  const dispatchUpdate = async () => {
    console.log("UPDAATE")
    await dispatch(
      updateDonor({
        id: props.donor._id,
        name: donorName,
        EntityType: entityType,
        LocationType: locationType,
        CombinedAreaName: areaName,
      })
    );
    toast.success('Successfully updated donor.');
    dispatchGetDonors();
    props.handleShow();
  };

  const dispatchDelete = async (e: any) => {
    console.log("DELETE")
    e.preventDefault();
    await dispatch(deleteDonor(props.donor._id));
    toast.success('Successfully deleted donor.');
    dispatchGetDonors();

    props.handleShow();
  };

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

  const handleEntityChange = (event: SelectChangeEvent) => {
    setEntityType(event.target.value as string);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocationType(event.target.value as string);
  };

  const handleAreaChange = (event: SelectChangeEvent) => {
    setAreaName(event.target.value as string);
  };

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
      else if (areaName === ''){
        toast.error("Missing Area Name")
        return
      }
      if (locationType === ''){
        toast.error("Missing Location Type")
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
      <div className="title-content">Add or Edit Donor</div>
      <div className="title-content"><button type="button" id="X-form" onClick={props.handleShow}>x</button></div>
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
          ? props.donor.name 
          : ""
      }
      onChange={(e:any) => setDonorName(e.target.value)}
      />

    <h2>Entity Type</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Entity Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={entityType}
            label="EntityType"
            onChange={handleEntityChange}
          >
            <MenuItem value={'Farm'}>Farm</MenuItem>
            <MenuItem value={'Restaurant'}>Restaurant</MenuItem>
            <MenuItem value={'Food Supply Company'}>Food Supply Company</MenuItem>
            <MenuItem value={'Nonprofit'}>Nonprofit</MenuItem>
            <MenuItem value={'Grocery'}>Grocery</MenuItem>
            <MenuItem value={'Community Kitchen'}>Community Kitchen</MenuItem>
          </Select>
        </FormControl>
      </Box>

    <div className="internal-div"><h2>Location Type</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Location Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={locationType}
            label="locationType"
            onChange={handleLocationChange}
          >
            <MenuItem value={'Farm'}>Farm</MenuItem>
            <MenuItem value={'Farmers Market'}>Farmers Market</MenuItem>
            <MenuItem value={'Warehouse'}>Warehouse</MenuItem>
            <MenuItem value={'Restaurant'}>Restaurant</MenuItem>
            <MenuItem value={'Community Kitchen'}>Community Kitchen</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </div>
    <h2>Combined Area Name</h2>
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Combined Area Name</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={areaName}
            label="combinedAreaName"
            onChange={handleAreaChange}
          >
            <MenuItem value={'SB/Goleta'}>SB/Goleta</MenuItem>
            <MenuItem value={'SYV'}>SYV</MenuItem>
            <MenuItem value={'SM/Orcutt'}>SM/Orcutt</MenuItem>
            <MenuItem value={'Cuyama'}>Cuyama</MenuItem>
            <MenuItem value={'Lompoc'}>Lompoc</MenuItem>
          </Select>
        </FormControl>
      </Box>
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

export default DonorsForm;