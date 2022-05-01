import React, { useState, useEffect } from 'react';
import './EntityForm.css';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// import assets
import Spinner from '../Spinner/Spinner';

//import vehicle and driver slice
import { createDriver } from '../../features/driverAuth/driverAuthSlice';
import {
  getVehicles,
  updateVehicle,
  deleteVehicle,
  createVehicle
} from '../../features/vehicles/VehiclesSlice';
import { toast } from 'react-toastify';

/* Form to add driver or vehicle */
const ShortEntityForm = (props: any) => {
  /* Driver and vehicle state data here */
  const [volunteerName, setName] = useState('');
  const [volunteerPin, setPin] = useState('');
  const [volunteerEmail, setEmail] = useState('');
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

  const dispatchDriver = () => {
    props.handleShow();
    dispatch(
      createDriver({
        _id: '0',
        name: volunteerName,
        email: volunteerEmail,
        pin: volunteerPin
      })
    );
    window.location.reload();
  };

  // this function is called if we submit a new driver or vehicle
  const dispatchCreateNew = async () => {
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
    }

    props.handleShow();
  };

  const dispatchUpdate = async () => {
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
      console.log('update of a volunteer');
      // here we can put the call to update a volunteer
    }
    props.handleShow();
  };
  const dispatchDelete = async (e: any) => {
    e.preventDefault();
    if (isVehicle) {
      await dispatch(deleteVehicle(props.vehicle._id));
      toast.success('Successfully deleted vehicle.');
      dispatchGetVehicles();
    } else {
      console.log('deletion of person');
      // this is where we can delete a person
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
    // added check to see if it is a volunteer or a driver
    e.preventDefault();
    !volunteer && !vehicle
      ? toast.error('Please select Volunteer or Vehicle')
      : volunteerName === ''
      ? toast.error('Missing Name')
      : volunteer && volunteerPin === ''
      ? toast.error('Missing Pin')
      : isVehicle
      ? props.isUpdate
        ? dispatchUpdate()
        : dispatchCreateNew()
      : dispatchDriver();
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
          placeholder={
            props.isUpdate && isVehicle ? props.vehicle.name : 'Name'
          }
          onChange={(e: any) => setName(e.target.value)}
        />
        {volunteer && (
          <div className="internal-div">
            <h2>Email</h2>
            <input
              className="input"
              placeholder="Email"
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>
        )}
        {volunteer && (
          <div className="internal-div">
            <h2>Pin</h2>
            <input
              className="input"
              placeholder="Pin"
              onChange={(e: any) => setPin(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-row w-full">
          <button type="submit" id="form-submit" onClick={handleSubmit}>
            {props.isUpdate && isVehicle ? 'Update' : 'Done'}
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
