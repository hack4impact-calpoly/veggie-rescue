import React, { useState } from 'react';
import './EntityForm.css';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// import assets
// import Spinner from '../Spinner/Spinner';

/* Form to add new field type */
// eslint-disable-next-line react/function-component-definition
const FieldForm = (props: any) => {
  /* Driver and vehicle state data here */
  const { handleShow, whichField, isUpdate, fieldName } = props;
  const [fieldType, setFieldType] = useState(whichField); // one of Entity Type, Food Type, etc
  const [field, setField] = useState(fieldName);
  const dispatch = useAppDispatch();

  // global state
  // const { isLoading: vehicleIsLoading } = useAppSelector(
  //   (state) => state.vehicle
  // );
  // const { isLoading: driverIsLoading } = useAppSelector(
  //   (state) => state.driverAuth
  // );

  /* TODO write dispatch functions in this form for all fields (leave commented out) */
  // const dispatchGetEntityTypes = () => {
  //   dispatch(getEntityTypes());
  // }


  // this function is called if we submit a new field type
  // @TODO add new cases for other fields
  // add actual dispatch logic
  const dispatchCreateNew = async () => {
    console.log('CREATE');
    switch (fieldType) {
      case 'Entity Type':
        // await dispatch(
        //   createEntityType({
        //     /* entity params */
        //   })
        // );
        toast.success('Successfully created new entity type.');

        // dispatchGetEntityTypes();
        break;

      default:
        toast.error('Not a field type');
    }
    handleShow();
  };

  const dispatchUpdate = async () => {
    console.log('UPDAATE');
    switch (fieldType) {
      case 'Entity Type':
        // await dispatch(
        //   updateEntityType({
        //     /* entity params */
        //   })
        // );
        toast.success('Successfully created new entity type.');

        // dispatchGetEntityTypes();
        break;

      default:
        toast.error('Not a field type');
    }
    handleShow();
  };
  const dispatchDelete = async (e: any) => {
    console.log('DELETE');
    e.preventDefault();
    switch (fieldType) {
      case 'Entity Type':
        // await dispatch(deleteEntityType(/*field name or id*/));
        toast.success('Successfully deleted entity type.');
        // dispatchGetEntityTypes();
        break;
      default:
        toast.error('Not a field type');
    }
    handleShow();
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    if (isUpdate) {
      if (field.trim().length === 0) toast.error('Missing Field Name');
      else dispatchUpdate();
    } else if (field.trim().length === 0) toast.error('Missing Field Name');
    else dispatchCreateNew();
  }

  // if (vehicleIsLoading || driverIsLoading) {
  //   return <Spinner />;
  // }

  return (
    <form className="modal-container">
      <div className="entity-card short-entity" id="modal">
        <div id="entity-title">
          <div className="title-content">
            {isUpdate ? `Update ${fieldType}` : `New ${fieldType}`}
          </div>
          <div className="title-content">
            <button type="button" id="X-form" onClick={handleShow}>
              X
            </button>
          </div>
        </div>

        <h2>Name</h2>
        <input
          className="input"
          defaultValue={isUpdate ? field : ''}
          placeholder={!isUpdate ? 'Name' : ''}
          onChange={(e: any) => setField(e.target.value)}
        />

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
};

export default FieldForm;
