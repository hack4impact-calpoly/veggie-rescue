import React, { useState, useEffect } from 'react';
import './EntityForm.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// import assets
import Spinner from '../Spinner/Spinner';

import {
  getVehicles,
  updateVehicle,
  deleteVehicle,
  createVehicle
} from '../../features/vehicles/VehiclesSlice';
import {
  getDrivers,
  updateDriver,
  deleteDriver,
  createDriver
} from '../../features/driverAuth/driverAuthSlice';
import { toast } from 'react-toastify';

/* Form to add driver or vehicle */
const ShortEntityForm = (props: any) => {
  /* Driver and vehicle state data here */
  // const [volunteerName, setName] = useState('');
  const [volunteerName, setName] = useState(props.isUpdate ? props.whichEntity ? props.vehicle.name : props.volunteer.name : '');
  // const [volunteerPin, setPin] = useState('');
  const [volunteerPin, setPin] = useState(props.isUpdate ? props.volunteer.pin : '');
  const [volunteer, setVolunteer] = useState(true);
  const [vehicle, setVehicle] = useState(false);
  const [isVehicle, setIsVehicle] = useState(props.whichEntity);
  const dispatch = useAppDispatch();

  // global state
  const { isLoading: vehicleIsLoading } = useAppSelector(
    (state) => state.vehicle
  );
  const { isLoading: driverIsLoading } = useAppSelector(
    (state) => state.driverAuth
  );
  // on mount check to see if this is a vehicle call or driver
  // if vehicle it will display the vehicle tab
  useEffect(() => {
    if (props.whichEntity) {
      handleVehicle();
    }
  }, []);

  const dispatchGetVehicles = () => {
    dispatch(getVehicles());
  };
  const dispatchGetVolunteers = () => {
    dispatch(getDrivers());
  };

  const dispatchDriver = () => {
    props.handleShow();
    dispatch(
      createDriver({
        _id: '0',
        name: volunteerName,
        // email: volunteerEmail,
        pin: volunteerPin
      })
    );
    window.location.reload();
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log("CREATE")
    if (isVehicle) {
      await dispatch(
        createVehicle({
          name: volunteerName,
          img: 'https://icones.pro/wp-content/uploads/2021/03/icone-de-voiture-symbole-png-verte.png'
        })
      );
      toast.success('Successfully created new vehicle.');

      dispatchGetVehicles();
    } else {
      console.log('creation of a new Volunteer');
      // here we can put the call to create a new volunteer
      await dispatch(
        createDriver({
          _id: '0',
          name: volunteerName,
          pin: volunteerPin
        })
      );
      toast.success('Successfully created new volunteer.');

      dispatchGetVolunteers();
    }

    props.handleShow();
  };

  const dispatchUpdate = async () => {
    console.log("UPDAATE")    
    if (isVehicle) {
      await dispatch(
        updateVehicle({
          _id: props.vehicle._id,
          name: volunteerName
        })
      );
      toast.success('Successfully updated vehicle.');
      dispatchGetVehicles();
    } else {
      console.log('update of a volunteer: ' + volunteerName + ", " + volunteerPin);
      // here we can put the call to update a volunteer
      await dispatch(
        updateDriver({
          _id: props.volunteer._id,
          name: volunteerName,
          pin: volunteerPin
        })
      );
      toast.success('Successfully updated volunteer.');
      dispatchGetVolunteers();
    }
    props.handleShow();
  };
  const dispatchDelete = async (e: any) => {
    console.log("DELETE")
    e.preventDefault();
    if (isVehicle) {
      await dispatch(deleteVehicle(props.vehicle._id));
      toast.success('Successfully deleted vehicle.');
      dispatchGetVehicles();
    } else {
      console.log('deletion of person');
      await dispatch(deleteDriver(props.volunteer._id));
      toast.success('Successfully deleted volunteer.');
      dispatchGetVolunteers();
    }

    props.handleShow();
  };

  function handleVolunteer() {
    setVolunteer((prev) => !prev);
    setVehicle(false);
  }

  function handleVehicle() {
    setVehicle((prev) => !prev);
    setVolunteer(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (isVehicle && props.isUpdate){
      if (volunteerName === '')
        toast.error('Missing Name')
      else
        dispatchUpdate();
    }
    else if (isVehicle && !props.isUpdate){
      if (volunteerName === '')
        toast.error('Missing Name')
      else
        dispatchCreateNew();
    }
    else if (!isVehicle && props.isUpdate){
      console.log("here")
      if (volunteerName === '')
        toast.error('Missing Name')
      else if (volunteerPin === '')
        toast.error('Missing Pin')
      else
        dispatchUpdate();
    }
    else if (!isVehicle && !props.isUpdate){
      if (volunteerName === '')
        toast.error('Missing Name')
      else if (volunteerPin === '')
        toast.error('Missing Pin')
      else
        dispatchCreateNew();
    }
  }
  if (vehicleIsLoading || driverIsLoading) {
    return <Spinner />;
  }
  return (
    <form className="modal-container">
      <div className="entity-card short-entity" id="modal">
        <div id="entity-title">
          <div className="title-content">
            {props.isUpdate ? 'Update Entity' : 'New Entity'}
          </div>
          <div className="title-content">
            <button type="button" id="X-form" onClick={props.handleShow}>
              X
            </button>
          </div>
        </div>
        
        <div className="entity-type">
        {!isVehicle ?
          <button
            className="type-button"
            type="button"
            onClick={handleVolunteer}
            style={{ border: volunteer ? '2px solid #FF9C55' : '' }}
          >
            Volunteer
          </button>
        :
          <button
            className="type-button"
            type="button"
            onClick={handleVehicle}
            style={{ border: vehicle ? '2px solid #FF9C55' : '' }}
          >
            Vehicle
          </button>
        }
        </div>
        <h2>Name</h2>
        <input
          className="input"
          defaultValue={
            (props.isUpdate)
              ? (isVehicle)
                  ? props.vehicle.name 
                  : props.volunteer.name
              : ""
              }
            placeholder={
              (!props.isUpdate) ? 'Name' : ''
            }
          onChange={(e: any) => setName(e.target.value)}
        />
        {!isVehicle && (
          <div className="internal-div">
            <h2>Pin</h2>
            <input
              className="input"
              placeholder={
                !props.isUpdate ? 'Pin' : ''
              }
              defaultValue={
                props.isUpdate ? props.volunteer.pin : ''
              }
              onChange={(e: any) => setPin(e.target.value)}
            />
          </div>
        )}
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
};

export default ShortEntityForm;
