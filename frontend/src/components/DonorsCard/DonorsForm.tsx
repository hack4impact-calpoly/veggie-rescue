import { useState } from 'react';
import * as React from 'react';
import './DonorsForm.css';
import { toast } from 'react-toastify';

/* Material UI import for dropdown menus */
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  getDonors,
  updateDonor,
  deleteDonor,
  createDonor
} from '../../features/donors/donorSlice';
import { useAppDispatch } from '../../app/hooks';

/* Form to add recipient or donor */
function DonorsForm(props: any) {
  const { handleShow, isUpdate, donor } = props;
  /* Recipient and donor state data here */
  const [entityType, setEntityType] = useState(
    isUpdate ? donor.EntityType : ''
  );
  const [locationType, setLocationType] = useState(
    isUpdate ? donor.LocationType : ''
  );
  const [areaName, setAreaName] = useState(
    isUpdate ? donor.CombinedAreaName : ''
  );

  const [donorName, setDonorName] = useState(isUpdate ? donor.name : '');

  const dispatch = useAppDispatch();

  const dispatchGetDonors = () => {
    dispatch(getDonors());
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log('CREATE');
    await dispatch(
      createDonor({
        id: '0',
        name: donorName,
        EntityType: entityType,
        LocationType: locationType,
        CombinedAreaName: areaName
      })
    );
    toast.success('Successfully created new donor.');
    dispatchGetDonors();
    handleShow();
  };

  const dispatchUpdate = async () => {
    console.log('UPDAATE');
    await dispatch(
      updateDonor({
        id: donor._id,
        name: donorName,
        EntityType: entityType,
        LocationType: locationType,
        CombinedAreaName: areaName
      })
    );
    toast.success('Successfully updated donor.');
    dispatchGetDonors();
    handleShow();
  };

  const dispatchDelete = async (e: any) => {
    console.log('DELETE');
    e.preventDefault();
    await dispatch(deleteDonor(donor._id));
    toast.success('Successfully deleted donor.');
    dispatchGetDonors();

    handleShow();
  };

  const handleEntityChange = (event: SelectChangeEvent) => {
    setEntityType(event.target.value as string);
  };

  const handleLocationChange = (event: SelectChangeEvent) => {
    setLocationType(event.target.value as string);
  };

  const handleAreaChange = (event: SelectChangeEvent) => {
    setAreaName(event.target.value as string);
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    if (donorName === '') {
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
    if (locationType === '') {
      toast.error('Missing Location Type');
      return;
    }
    if (isUpdate) dispatchUpdate();
    else dispatchCreateNew();
  }

  return (
    <form onSubmit={handleSubmit} className="modal-container">
      <div className="entity-card" id="modal">
        <div id="entity-title">
          <div className="title-content">Add or Edit Donor</div>
          <div className="title-content">
            <button type="button" id="X-form" onClick={handleShow}>
              x
            </button>
          </div>
        </div>

        <h2>Entity Name</h2>

        <input
          className="input"
          placeholder={!isUpdate ? 'Name' : ''}
          defaultValue={isUpdate ? donor.name : ''}
          onChange={(e: any) => setDonorName(e.target.value)}
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
              <MenuItem value="Farm">Farm</MenuItem>
              <MenuItem value="Restaurant">Restaurant</MenuItem>
              <MenuItem value="Food Supply Company">
                Food Supply Company
              </MenuItem>
              <MenuItem value="Nonprofit">Nonprofit</MenuItem>
              <MenuItem value="Grocery">Grocery</MenuItem>
              <MenuItem value="Community Kitchen">Community Kitchen</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <div className="internal-div">
          <h2>Location Type</h2>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Location Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={locationType}
                label="locationType"
                onChange={handleLocationChange}
              >
                <MenuItem value="Farm">Farm</MenuItem>
                <MenuItem value="Farmers Market">Farmers Market</MenuItem>
                <MenuItem value="Warehouse">Warehouse</MenuItem>
                <MenuItem value="Restaurant">Restaurant</MenuItem>
                <MenuItem value="Community Kitchen">Community Kitchen</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </div>
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
              label="combinedAreaName"
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
        <div className="flex flex-row w-full">
          <button type="submit" id="form-submit" onClick={handleSubmit}>
            {isUpdate ? 'Update' : 'Done'}
          </button>
          {isUpdate && (
            <button type="submit" id="form-submit" onClick={dispatchDelete}>
              Delete
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

export default DonorsForm;
