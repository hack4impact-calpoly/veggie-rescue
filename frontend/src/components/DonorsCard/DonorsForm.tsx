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

        <div className="input-container">
          <h2 style={{ textAlign: 'left' }}>Entity Name</h2>
          <input
            className="input"
            placeholder={!isUpdate ? 'Name' : ''}
            defaultValue={isUpdate ? donor.name : ''}
            onChange={(e: any) => setDonorName(e.target.value)}
            style={{ width: 540 }}
          />
        </div>

        <div className="input-container">
          <h2 style={{ textAlign: 'left' }}>Entity Type</h2>
          <div className="internal-div" />
          <Box
            sx={{
              minWidth: 120,
              width: '550px',
              marginTop: '10px',
              marginBottom: '10px',
              paddingLeft: '10px'
            }}
          >
            <FormControl
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px'
                }
              }}
              variant="outlined"
            >
              <InputLabel
                id="demo-simple-select-label"
                shrink={Boolean(entityType)}
                htmlFor="demo-simple-select"
                sx={{
                  '&.MuiInputLabel-shrink': {
                    display: 'none'
                  }
                }}
              >
                Entity Type
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={entityType}
                label="EntityType"
                onChange={handleEntityChange}
              >
                <MenuItem
                  value="Farm"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Farm
                </MenuItem>
                <MenuItem
                  value="Restaurant"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Restaurant
                </MenuItem>
                <MenuItem
                  value="Food Supply Company"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Food Supply Company
                </MenuItem>
                <MenuItem
                  value="Nonprofit"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Nonprofit
                </MenuItem>
                <MenuItem
                  value="Grocery"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Grocery
                </MenuItem>
                <MenuItem
                  value="Community Kitchen"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Community Kitchen
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <h2 style={{ textAlign: 'left' }}>Location Type</h2>
          <div className="internal-div">
            <Box
              sx={{
                minWidth: 120,
                marginTop: '10px',
                marginBottom: '10px',
                paddingLeft: '10px'
              }}
            >
              <FormControl
                fullWidth
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '10px'
                  }
                }}
                variant="outlined"
              >
                <InputLabel
                  id="demo-simple-select-label"
                  shrink={Boolean(locationType)}
                  htmlFor="demo-simple-select"
                  sx={{
                    '&.MuiInputLabel-shrink': {
                      display: 'none'
                    }
                  }}
                >
                  Location Type
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={locationType}
                  label="locationType"
                  onChange={handleLocationChange}
                >
                  <MenuItem
                    className="custom-menu-item"
                    value="Farm"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F0F9F1'
                      }
                    }}
                  >
                    Farm
                  </MenuItem>
                  <MenuItem
                    value="Farmers Market"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F0F9F1'
                      }
                    }}
                  >
                    Farmers Market
                  </MenuItem>
                  <MenuItem
                    value="Warehouse"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F0F9F1'
                      }
                    }}
                  >
                    Warehouse
                  </MenuItem>
                  <MenuItem
                    value="Restaurant"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F0F9F1'
                      }
                    }}
                  >
                    Restaurant
                  </MenuItem>
                  <MenuItem
                    value="Community Kitchen"
                    sx={{
                      '&:hover': {
                        backgroundColor: '#F0F9F1'
                      }
                    }}
                  >
                    Community Kitchen
                  </MenuItem>
                </Select>
              </FormControl>
            </Box>
          </div>
          <h2 style={{ textAlign: 'left' }}>Combined Area Name</h2>
          <Box
            sx={{
              minWidth: 120,
              marginTop: '10px',
              marginBottom: '10px',
              paddingLeft: '10px'
            }}
          >
            <FormControl
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '10px'
                }
              }}
              variant="outlined"
            >
              <InputLabel
                id="demo-simple-select-label"
                shrink={Boolean(areaName)}
                htmlFor="demo-simple-select"
                sx={{
                  '&.MuiInputLabel-shrink': {
                    display: 'none'
                  }
                }}
              >
                Combined Area Name
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={areaName}
                label="combinedAreaName"
                onChange={handleAreaChange}
              >
                <MenuItem
                  value="SB/Goleta"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  SB/Goleta
                </MenuItem>
                <MenuItem
                  value="SYV"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  SYV
                </MenuItem>
                <MenuItem
                  value="SM/Orcutt"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  SM/Orcutt
                </MenuItem>
                <MenuItem
                  value="Cuyama"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Cuyama
                </MenuItem>
                <MenuItem
                  value="Lompoc"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Lompoc
                </MenuItem>
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
      </div>
    </form>
  );
}

export default DonorsForm;
