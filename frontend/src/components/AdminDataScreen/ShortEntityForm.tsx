/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import './EntityForm.css';
import { toast } from 'react-toastify';
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

/* Form to add driver or vehicle */
function ShortEntityForm(props: any) {
  const { handleShow, whichEntity, isUpdate, volunteer, vehicle } = props;
  /* Driver and vehicle state data here */
  const [isVolunteer, setIsVolunteer] = useState(whichEntity);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isVehicle, setIsVehicle] = useState(whichEntity);
  const [itemName, setName] = useState(
    isUpdate ? (whichEntity ? vehicle.name : volunteer.name) : ''
  );
  // const [volunteerPin, setPin] = useState('');
  const [volunteerPin, setPin] = useState(
    isUpdate ? (whichEntity ? '' : volunteer.pin) : ''
  );
  const dispatch = useAppDispatch();

  // global state
  const { isLoading: vehicleIsLoading } = useAppSelector(
    (state) => state.vehicle
  );
  const { isLoading: driverIsLoading } = useAppSelector(
    (state) => state.driverAuth
  );

  function handleVehicle() {
    setIsVehicle((prev: any) => !prev);
    setIsVolunteer(false);
  }
  // on mount check to see if this is a vehicle call or driver
  // if vehicle it will display the vehicle tab
  useEffect(() => {
    if (whichEntity) {
      handleVehicle();
    }
  }, []);

  const dispatchGetVehicles = () => {
    dispatch(getVehicles());
  };
  const dispatchGetVolunteers = () => {
    dispatch(getDrivers());
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
    console.log('CREATE');
    if (isVehicle) {
      await dispatch(
        createVehicle({
          name: itemName,
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
          name: itemName,
          pin: volunteerPin
        })
      );
      toast.success('Successfully created new volunteer.');

      dispatchGetVolunteers();
    }

    handleShow();
  };

  const dispatchUpdate = async () => {
    console.log('UPDAATE');
    if (isVehicle) {
      await dispatch(
        updateVehicle({
          _id: vehicle._id,
          name: itemName
        })
      );
      toast.success('Successfully updated vehicle.');
      dispatchGetVehicles();
    } else {
      console.log(`update of a volunteer: ${itemName}, ${volunteerPin}`);
      // here we can put the call to update a volunteer
      await dispatch(
        updateDriver({
          _id: volunteer._id,
          name: itemName,
          pin: volunteerPin
        })
      );
      toast.success('Successfully updated volunteer.');
      dispatchGetVolunteers();
    }
    handleShow();
  };
  const dispatchDelete = async (e: any) => {
    e.preventDefault();
    if (isVehicle) {
      await dispatch(deleteVehicle(vehicle._id));
      toast.success('Successfully deleted vehicle.');
      dispatchGetVehicles();
    } else {
      console.log('deletion of person');
      await dispatch(deleteDriver(volunteer._id));
      toast.success('Successfully deleted volunteer.');
      dispatchGetVolunteers();
    }

    handleShow();
  };

  function handleVolunteer() {
    setIsVolunteer((prev: any) => !prev);
    setIsVehicle(false);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (isVehicle && isUpdate) {
      if (itemName === '') toast.error('Missing Name');
      else dispatchUpdate();
    } else if (isVehicle && !isUpdate) {
      if (itemName === '') toast.error('Missing Name');
      else dispatchCreateNew();
    } else if (!isVehicle && isUpdate) {
      // console.log("here")
      if (itemName === '') toast.error('Missing Name');
      else if (volunteerPin === '') toast.error('Missing Pin');
      else if (volunteerPin.length !== 4)
        toast.error('Pin must be 4 characters');
      else dispatchUpdate();
    } else if (!isVehicle && !isUpdate) {
      if (itemName === '') toast.error('Missing Name');
      else if (volunteerPin === '') toast.error('Missing Pin');
      else if (volunteerPin.length !== 4)
        toast.error('Pin must be 4 characters');
      else dispatchCreateNew();
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
            {isUpdate ? 'Update Entity' : 'New Entity'}
          </div>
          <div className="title-content">
            <button type="button" id="X-form" onClick={handleShow}>
              X
            </button>
          </div>
        </div>

        <div className="entity-type">
          {!isVehicle ? (
            <button
              className="type-button"
              type="button"
              onClick={handleVolunteer}
              style={{ border: isVolunteer ? '2px solid #FF9C55' : '' }}
            >
              Volunteer
            </button>
          ) : (
            <button
              className="type-button"
              type="button"
              onClick={handleVehicle}
              style={{ border: vehicle ? '2px solid #FF9C55' : '' }}
            >
              Vehicle
            </button>
          )}
        </div>

        <h2>Name</h2>
        <input
          className="input"
          defaultValue={
            isUpdate ? (isVehicle ? vehicle.name : volunteer.name) : ''
          }
          placeholder={!isUpdate ? 'Name' : ''}
          onChange={(e: any) => setName(e.target.value)}
        />
        {!isVehicle && (
          <div className="internal-div">
            <h2>Pin</h2>
            <input
              className="input"
              placeholder={!isUpdate ? 'Pin' : ''}
              defaultValue={isUpdate ? volunteer.pin : ''}
              onChange={(e: any) => setPin(e.target.value)}
            />
          </div>
        )}
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

export default ShortEntityForm;
