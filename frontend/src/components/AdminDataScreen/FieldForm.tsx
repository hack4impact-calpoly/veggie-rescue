import React, { useState, useEffect } from 'react';
import './EntityForm.css';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../app/hooks';
import {
  getFields,
  createField,
  editField,
  deleteField
} from '../../features/fields/fieldSlice';

// import assets
// import Spinner from '../Spinner/Spinner';

/* Form to add new field type */
// eslint-disable-next-line react/function-component-definition
const FieldForm = (props: any) => {
  /* Driver and vehicle state data here */
  const { handleShow, whichField, isUpdate, fieldName } = props;

  const [newField, setNewField] = useState(fieldName);
  const dispatch = useAppDispatch();
  // const { fields } = useAppSelector((state) => state.fields);

  useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

  const dispatchCreateNew = async () => {
    console.log('CREATE');
    switch (whichField) {
      case 'Entity Type':
        await dispatch(
          createField({
            fieldName: 'EntityType',
            value: newField
          })
        );
        toast.success('Successfully created new entity type.');
        dispatch(getFields());
        break;

      case 'Food Type':
        await dispatch(
          createField({
            fieldName: 'FoodType',
            value: newField
          })
        );
        toast.success('Successfully created new food type.');
        dispatch(getFields());
        break;

      case 'Location Type':
        await dispatch(
          createField({
            fieldName: 'LocationType',
            value: newField
          })
        );
        toast.success('Successfully created new location type.');
        dispatch(getFields());
        break;

      case 'Combined Area Name':
        await dispatch(
          createField({
            fieldName: 'CombinedAreaName',
            value: newField
          })
        );
        toast.success('Successfully created new combined area name.');
        dispatch(getFields());
        break;

      case 'Organizational Structure':
        await dispatch(
          createField({
            fieldName: 'OrgStructure',
            value: newField
          })
        );
        toast.success('Successfully created new organizational structure.');
        dispatch(getFields());
        break;

      case 'Food Distribution Model':
        await dispatch(
          createField({
            fieldName: 'FoodDistModel',
            value: newField
          })
        );
        toast.success('Successfully created new food distribution model.');
        dispatch(getFields());
        break;

      case 'Demographics Served':
        await dispatch(
          createField({
            fieldName: 'DemographicsServed',
            value: newField
          })
        );
        toast.success('Successfully created new demographic served.');
        dispatch(getFields());
        break;

      default:
        toast.error('Not a field type');
    }
    handleShow();
  };

  const dispatchUpdate = async () => {
    console.log('UPDAATE');
    switch (whichField) {
      case 'Entity Type':
        await dispatch(
          editField({
            fieldName: 'EntityType',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated entity type.');
        dispatch(getFields());
        break;
      case 'Food Type':
        await dispatch(
          editField({
            fieldName: 'FoodType',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated food type.');
        dispatch(getFields());
        break;

      case 'Location Type':
        await dispatch(
          editField({
            fieldName: 'LocationType',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated location type.');
        dispatch(getFields());
        break;

      case 'Combined Area Name':
        await dispatch(
          editField({
            fieldName: 'CombinedAreaName',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated combined area name.');
        dispatch(getFields());
        break;

      case 'Organizational Structure':
        await dispatch(
          editField({
            fieldName: 'OrgStructure',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated organizational structure.');
        dispatch(getFields());
        break;

      case 'Food Distribution Model':
        await dispatch(
          editField({
            fieldName: 'FoodDistModel',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated food distribution model.');
        dispatch(getFields());
        break;

      case 'Demographics Served':
        await dispatch(
          editField({
            fieldName: 'DemographicsServed',
            oldValue: fieldName,
            newValue: newField
          })
        );
        toast.success('Successfully updated demographic served.');
        dispatch(getFields());
        break;

      default:
        toast.error('Not a field type');
    }
    handleShow();
  };
  const dispatchDelete = async (e: any) => {
    console.log('DELETE');
    e.preventDefault();
    switch (whichField) {
      case 'Entity Type':
        await dispatch(
          deleteField({ fieldName: 'EntityType', value: fieldName })
        );
        toast.success('Successfully deleted entity type.');
        dispatch(getFields());
        break;
      case 'Food Type':
        await dispatch(
          deleteField({ fieldName: 'FoodType', value: fieldName })
        );
        toast.success('Successfully deleted food type.');
        dispatch(getFields());
        break;

      case 'Location Type':
        await dispatch(
          deleteField({ fieldName: 'LocationType', value: fieldName })
        );
        toast.success('Successfully deleted location type.');
        dispatch(getFields());
        break;

      case 'Combined Area Name':
        await dispatch(
          deleteField({ fieldName: 'CombinedAreaName', value: fieldName })
        );
        toast.success('Successfully deleted area name.');
        dispatch(getFields());
        break;

      // recipients
      case 'Organizational Structure':
        await dispatch(
          deleteField({ fieldName: 'OrgStructure', value: fieldName })
        );
        toast.success('Successfully deleted organizational structure.');
        dispatch(getFields());
        break;

      case 'Food Distribution Model':
        await dispatch(
          deleteField({ fieldName: 'FoodDistModel', value: fieldName })
        );
        toast.success('Successfully deleted food distrubtion model.');
        dispatch(getFields());
        break;

      case 'Demographics Served':
        await dispatch(
          deleteField({ fieldName: 'DemographicsServed', value: fieldName })
        );
        toast.success('Successfully deleted demographic served.');
        dispatch(getFields());
        break;

      default:
        toast.error('Not a field type');
    }
    handleShow();
  };

  function handleSubmit(e: any) {
    e.preventDefault();
    if (isUpdate) {
      if (newField.trim().length === 0) toast.error('Missing Field Name');
      else dispatchUpdate();
    } else if (newField.trim().length === 0) toast.error('Missing Field Name');
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
            {isUpdate ? `Update ${whichField}` : `New ${whichField}`}
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
          defaultValue={isUpdate ? newField : ''}
          placeholder={!isUpdate ? 'Name' : ''}
          onChange={(e: any) => setNewField(e.target.value)}
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
