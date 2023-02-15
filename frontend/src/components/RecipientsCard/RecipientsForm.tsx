import React, { useEffect, useState } from 'react';
import './RecipientsForm.css';
import { toast } from 'react-toastify';

/* Material UI import for dropdown menus */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  getRecipients,
  createRecipient,
  updateRecipient,
  deleteRecipient
} from '../../features/recipients/recipientsSlice';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

/* Form to add recipient or donor */
function RecipientsForm(props: any) {
  /* Recipient and donor state data here */
  const [entityType, setOrgStruc] = useState(
    props.isUpdate ? props.recipient.EntityType : ''
  );
  const [areaName, setAreaName] = useState(
    props.isUpdate ? props.recipient.CombinedAreaName : ''
  );
  const [recipientName, setRecipientName] = useState(
    props.isUpdate ? props.recipient.name : ''
  );
  const [demographicType, setDemographicType] = useState(
    props.isUpdate ? props.recipient.DemographicType : ''
  );

  const [foodDistrModel, setFoodDistrModel] = useState(
    props.isUpdate ? props.recipient.FoodDistrModel : ''
  );

  const [donor, setDonor] = useState(true);
  const [recipient, setRecipient] = useState(false);
  // const orgStruc = [
  //   'Church',
  //   'Shelter',
  //   'School',
  //   'Senior Center',
  //   'Food Pantry - Other',
  //   'Temp Food Pantry - Other',
  //   'Nonprofit - Other'
  // ];
  // const [selectedFoods, setSelectedFoods] = useState(props.isUpdate ? props.whichEntity ? props.donor.foodType : props.recipient.foodType : []);
  const [selectedFoods, setSelectedFoods] = useState([]);

  const [isDonor, setIsDonor] = useState(props.whichEntity);
  const dispatch = useAppDispatch();

  const dispatchGetRecipients = () => {
    dispatch(getRecipients());
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log('CREATE');
    console.log(selectedFoods.toString());
    // console.log('creation of a new Volunteer');
    // here we can put the call to create a new volunteer
    await dispatch(
      createRecipient({
        id: '0',
        name: recipientName,
        EntityType: entityType,
        FoodType: selectedFoods.toString(), // this is weird
        DemographicName: demographicType,
        CombinedAreaName: areaName,
        FoodDistributionModel: foodDistrModel
      })
    );
    toast.success('Successfully created new recipient.');
    dispatchGetRecipients();
    props.handleShow();
  };

  const dispatchUpdate = async () => {
    console.log('UPDAATE');
    console.log(selectedFoods.toString());
    await dispatch(
      updateRecipient({
        id: props.recipient._id,
        name: recipientName,
        EntityType: entityType,
        FoodType: selectedFoods.toString(), // this is weird
        DemographicName: demographicType,
        CombinedAreaName: areaName,
        FoodDistributionModel: foodDistrModel
      })
    );
    toast.success('Successfully updated recipient.');
    dispatchGetRecipients();
    props.handleShow();
  };

  const dispatchDelete = async (e: any) => {
    console.log('DELETE');
    e.preventDefault();
    console.log('deletion of person');
    await dispatch(deleteRecipient(props.recipient._id));
    toast.success('Successfully deleted recipient.');
    dispatchGetRecipients();
    props.handleShow();
  };

  function handleRecipient() {
    setRecipient((prev) => !prev);
    setDonor(false);
    // setIsDonor(false);
  }

  const handleFoodClick = (name: any) => {
    // console.log("here: " + name)
    const filtered = selectedFoods.filter((item: any) => item !== name);
    // console.log(filtered);
    // console.log(selectedFoods);
    JSON.stringify(filtered) !== JSON.stringify(selectedFoods)
      ? setSelectedFoods((selectedFoods: any) => filtered)
      : setSelectedFoods((selectedFoods: any) => selectedFoods.concat(name));
  };

  const handleOrgStrucChange = (event: SelectChangeEvent) => {
    setOrgStruc(event.target.value as string);
  };

  const handleDemographicsChange = (event: SelectChangeEvent) => {
    setDemographicType(event.target.value as string);
  };

  const handleAreaChange = (event: SelectChangeEvent) => {
    setAreaName(event.target.value as string);
  };

  const handleFoodDistrChange = (event: SelectChangeEvent) => {
    setFoodDistrModel(event.target.value as string);
  };
  function handleSubmit(e: any) {
    e.preventDefault();
    if (recipientName === '') {
      toast.error('Missing Entity Name');
      return;
    }
    if (entityType === '') {
      toast.error('Missing Entity Type');
      return;
    }
    if (areaName === '') {
      toast.error('Missing Area Name');
      return;
    }
    if (demographicType === '') {
      toast.error('Missing Demographic Type');
      return;
    }
    if (foodDistrModel === '') {
      toast.error('Missing Food Distribution Model');
      return;
    }
    if (props.isUpdate) dispatchUpdate();
    else dispatchCreateNew();
  }

  return (
    <form onSubmit={handleSubmit} className="modal-container">
      <div className="entity-card" id="modal">
        <div id="entity-title">
          <div className="title-content">Add or Edit Recipient</div>
          <div className="title-content">
            <button type="button" id="X-form" onClick={props.handleShow}>
              x
            </button>
          </div>
        </div>

        <h2>Entity Name</h2>

        <input
          className="input"
          placeholder={!props.isUpdate ? 'Name' : ''}
          defaultValue={props.isUpdate ? props.recipient.name : ''}
          onChange={(e: any) => setRecipientName(e.target.value)}
        />

        <h2>Organizational Structure</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Organizational Structure
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={entityType}
              label="OrganizationalStructure"
              onChange={handleOrgStrucChange}
            >
              <MenuItem value="Church">Church</MenuItem>
              <MenuItem value="Shelter">Shelter</MenuItem>
              <MenuItem value="School">School</MenuItem>
              <MenuItem value="Senior Center">Senior Center</MenuItem>
              <MenuItem value="Food Pantry - Other">
                Food Pantry - Other
              </MenuItem>
              <MenuItem value="Temp Food Pantry - Other">
                Temp Food Pantry - Other
              </MenuItem>
              <MenuItem value="Nonprofit - Other">Nonprofit - Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <h2>Demographics Served</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Demographics Served
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={demographicType}
              label="DemographicsServed"
              onChange={handleDemographicsChange}
            >
              <MenuItem value="Homeless">Homeless</MenuItem>
              <MenuItem value="Low Income">Low Income</MenuItem>
              <MenuItem value="Senior">Senior</MenuItem>
              <MenuItem value="Youth (Schools)">Youth(Schools)</MenuItem>
              <MenuItem value="Animals">Animals</MenuItem>
              <MenuItem value="First Responders">First Responders</MenuItem>
              <MenuItem value="Community Kitchen">Community Kitchen</MenuItem>
              <MenuItem value="Community Kitchen">Community Kitchen</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <h2>Combined Area Name</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Combined Area Name
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={areaName}
              label="CombinedAreaName"
              onChange={handleAreaChange}
            >
              <MenuItem value="SB/Goleta">SB/Goleta</MenuItem>
              <MenuItem value="SYV">SYV</MenuItem>
              <MenuItem value="SM/Orcutt">SM/Orcutt</MenuItem>
              <MenuItem value="Cuyama">Cuyama</MenuItem>
              <MenuItem value="Lompoc">Lompoc</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <h2>Food Distribution Model</h2>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Food Distribution Model
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={foodDistrModel}
              label="FoodDistributionModel"
              onChange={handleFoodDistrChange}
            >
              <MenuItem value="Community Kitchen">Community Kitchen</MenuItem>
              <MenuItem value="Food Pantry">Food Pantry</MenuItem>
              <MenuItem value="Meals-on-wheels">Meals-on-wheels</MenuItem>
              <MenuItem value="Senior Center">Senior Center</MenuItem>
              <MenuItem value="Free Farmers Table">Free Farmers Table</MenuItem>
              <MenuItem value="Shared Delivery">Shared Delivery</MenuItem>
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
// function Button(props: any) {
//   const [color, setColors] = React.useState('');
//   const [active, setActive] = React.useState(false);
//   const handleClickButton = (name: '') => {
//     setActive(true);
//     setColors('2px solid #FF9C55');
//     if (active === true) {
//       setActive(false);
//       setColors('');
//     }
//     props.handleClick(props.name);
//   };

//   return (
//     <button
//       type="button"
//       className="food-button"
//       onClick={() => handleClickButton(props.name)}
//       style={{ border: color }}
//     >
//       {props.name}
//     </button>
//   );
// }

export default RecipientsForm;
