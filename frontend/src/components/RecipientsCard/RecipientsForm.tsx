import { useState } from 'react';
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
import { useAppDispatch } from '../../app/hooks';

/* Form to add recipient */
function RecipientsForm(props: any) {
  const { handleShow, isUpdate, recipient } = props;

  const [orgStruc, setOrgStruc] = useState(
    isUpdate ? recipient.EntityType : ''
  );
  const [areaName, setAreaName] = useState(
    isUpdate ? recipient.CombinedAreaName : ''
  );
  const [recipientName, setRecipientName] = useState(
    isUpdate ? recipient.name : ''
  );
  const [demographicType, setDemographicType] = useState(
    isUpdate ? recipient.DemographicType : ''
  );

  const [foodDistrModel, setFoodDistrModel] = useState(
    isUpdate ? recipient.FoodDistrModel : ''
  );

  const [selectedFoods] = useState([]);

  const dispatch = useAppDispatch();

  const dispatchGetRecipients = () => {
    dispatch(getRecipients());
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log('CREATE');
    console.log(selectedFoods.toString());
    // here we can put the call to create a new volunteer
    await dispatch(
      createRecipient({
        id: '0',
        name: recipientName,
        OrgStructure: orgStruc,
        DemographicsServed: demographicType,
        CombinedAreaName: areaName,
        FoodDistModel: foodDistrModel
      })
    );
    toast.success('Successfully created new recipient.');
    dispatchGetRecipients();
    handleShow();
  };

  const dispatchUpdate = async () => {
    console.log('UPDAATE');
    console.log(selectedFoods.toString());
    await dispatch(
      updateRecipient({
        id: recipient._id,
        name: recipientName,
        EntityType: orgStruc,
        FoodType: selectedFoods.toString(), // this is weird
        DemographicName: demographicType,
        CombinedAreaName: areaName,
        FoodDistrModel: foodDistrModel
      })
    );
    toast.success('Successfully updated recipient.');
    dispatchGetRecipients();
    handleShow();
  };

  const dispatchDelete = async (e: any) => {
    console.log('DELETE');
    e.preventDefault();
    console.log('deletion of person');
    await dispatch(deleteRecipient(recipient._id));
    toast.success('Successfully deleted recipient.');
    dispatchGetRecipients();
    handleShow();
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
    if (isUpdate) dispatchUpdate();
    else dispatchCreateNew();
  }

  return (
    <form onSubmit={handleSubmit} className="modal-container">
      <div className="entity-card" id="modal">
        <div id="entity-title">
          <div className="title-content">Add or Edit Recipient</div>
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
            defaultValue={isUpdate ? recipient.name : ''}
            onChange={(e: any) => setRecipientName(e.target.value)}
            style={{ width: 540 }}
          />
        </div>

        <div className="input-container">
          <h2 style={{ textAlign: 'left' }}>Organizational Structure</h2>
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
                shrink={Boolean(orgStruc)}
                htmlFor="demo-simple-select"
                sx={{
                  '&.MuiInputLabel-shrink': {
                    display: 'none'
                  }
                }}
              >
                Organizational Structure
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={orgStruc}
                label="OrganizationalStructure"
                onChange={handleOrgStrucChange}
              >
                <MenuItem
                  value="Church"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Church
                </MenuItem>
                <MenuItem
                  value="Shelter"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Shelter
                </MenuItem>
                <MenuItem
                  value="School"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  School
                </MenuItem>
                <MenuItem
                  value="Senior Center"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Senior Center
                </MenuItem>
                <MenuItem
                  value="Food Pantry - Other"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Food Pantry - Other
                </MenuItem>
                <MenuItem
                  value="Temp Food Pantry - Other"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Temp Food Pantry - Other
                </MenuItem>
                <MenuItem
                  value="Nonprofit - Other"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Nonprofit - Other
                </MenuItem>
              </Select>
            </FormControl>
          </Box>

          <h2 style={{ textAlign: 'left' }}>Demographics Served</h2>
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
                shrink={Boolean(demographicType)}
                htmlFor="demo-simple-select"
                sx={{
                  '&.MuiInputLabel-shrink': {
                    display: 'none'
                  }
                }}
              >
                Demographics Served
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={demographicType}
                label="DemographicsServed"
                onChange={handleDemographicsChange}
              >
                <MenuItem
                  value="Homeless"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Homeless
                </MenuItem>
                <MenuItem
                  value="Low Income"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Low Income
                </MenuItem>
                <MenuItem
                  value="Senior"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Senior
                </MenuItem>
                <MenuItem
                  value="Youth (Schools)"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Youth(Schools)
                </MenuItem>
                <MenuItem
                  value="Animals"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Animals
                </MenuItem>
                <MenuItem
                  value="First Responders"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  First Responders
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
                label="CombinedAreaName"
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

          <h2 style={{ textAlign: 'left' }}>Food Distribution Model</h2>
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
                shrink={Boolean(foodDistrModel)}
                htmlFor="demo-simple-select"
                sx={{
                  '&.MuiInputLabel-shrink': {
                    display: 'none'
                  }
                }}
              >
                Food Distribution Model
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={foodDistrModel}
                label="FoodDistributionModel"
                onChange={handleFoodDistrChange}
              >
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
                <MenuItem
                  value="Food Pantry"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Food Pantry
                </MenuItem>
                <MenuItem
                  value="Meals-on-wheels"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Meals-on-wheels
                </MenuItem>
                <MenuItem
                  value="Senior Center"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Senior Center
                </MenuItem>
                <MenuItem
                  value="Free Farmers Table"
                  sx={{
                    '&:hover': {
                      backgroundColor: '#F0F9F1'
                    }
                  }}
                >
                  Free Farmers Table
                </MenuItem>
                <MenuItem
                value="Shared Delivery"
                sx={{
                  '&:hover': {
                    backgroundColor: '#F0F9F1'
                  }
                }}
              >
                Shared Delivery
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

export default RecipientsForm;
