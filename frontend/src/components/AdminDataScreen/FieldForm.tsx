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

/* Form to add new field type */
// eslint-disable-next-line react/function-component-definition
const FieldForm = (props: any) => {
  /* Driver and vehicle state data here */
  const { handleShow, whichField, isUpdate, fieldName } = props;

  const [newField, setNewField] = useState(fieldName);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

  const dispatchCreateNew = async () => {
    let result;
    switch (whichField) {
      case 'Entity Type': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'EntityType',
            value: newField
          })
        ));
        break;
      }
      case 'Food Type': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'FoodType',
            value: newField
          })
        ));
        if (result.requestStatus === 'fulfilled')
          toast.success(`Successfully added ${newField} to Food Type`);
        else toast.error(`Unable to add ${newField} to Food Type`);
        dispatch(getFields());
        break;
      }
      case 'Location Type': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'LocationType',
            value: newField
          })
        ));
        if (result.requestStatus === 'fulfilled')
          toast.success(`Successfully added ${newField} to Location Type`);
        else toast.error(`Unable to add ${newField} to Location Type`);
        dispatch(getFields());
        break;
      }
      case 'Combined Area Name': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'CombinedAreaName',
            value: newField
          })
        ));
        if (result.requestStatus === 'fulfilled')
          toast.success(`Successfully added ${newField} to Combined Area Name`);
        else toast.error(`Unable to add ${newField} to Combined Area Name`);
        dispatch(getFields());
        break;
      }
      case 'Organizational Structure': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'OrgStructure',
            value: newField
          })
        ));
        if (result.requestStatus === 'fulfilled')
          toast.success(
            `Successfully added ${newField} to Organizational Structure`
          );
        dispatch(getFields());
        break;
      }
      case 'Food Distribution Model': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'FoodDistModel',
            value: newField
          })
        ));
        if (result.requestStatus === 'fulfilled')
          toast.success(
            `Successfully added ${newField} to Food Distribution Model`
          );
        dispatch(getFields());
        break;
      }
      case 'Demographics Served': {
        ({ meta: result } = await dispatch(
          createField({
            fieldName: 'DemographicsServed',
            value: newField
          })
        ));

        break;
      }

      default:
        toast.error('Not a field type');
    }
    if (result && result.requestStatus === 'fulfilled')
      toast.success(`Successfully added ${newField} to ${whichField}`);
    else toast.error(`Unable to add ${newField} to ${whichField}`);
    dispatch(getFields());
    handleShow();
  };

  const dispatchUpdate = async () => {
    let result;
    switch (whichField) {
      case 'Entity Type': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'EntityType',
            oldValue: fieldName,
            newValue: newField
          })
        ));

        break;
      }
      case 'Food Type': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'FoodType',
            oldValue: fieldName,
            newValue: newField
          })
        ));

        break;
      }
      case 'Location Type': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'LocationType',
            oldValue: fieldName,
            newValue: newField
          })
        ));

        break;
      }

      case 'Combined Area Name': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'CombinedAreaName',
            oldValue: fieldName,
            newValue: newField
          })
        ));

        break;
      }
      case 'Organizational Structure': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'OrgStructure',
            oldValue: fieldName,
            newValue: newField
          })
        ));

        break;
      }

      case 'Food Distribution Model': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'FoodDistModel',
            oldValue: fieldName,
            newValue: newField
          })
        ));

        break;
      }

      case 'Demographics Served': {
        ({ meta: result } = await dispatch(
          editField({
            fieldName: 'DemographicsServed',
            oldValue: fieldName,
            newValue: newField
          })
        ));
        break;
      }

      default:
        toast.error('Not a field type');
    }
    if (result && result?.requestStatus === 'fulfilled')
      toast.success(`Successfully updated ${whichField}`);
    else toast.success(`Unable to update ${whichField}`);
    dispatch(getFields());
    handleShow();
  };
  const dispatchDelete = async (e: any) => {
    e.preventDefault();
    let result;
    switch (whichField) {
      case 'Entity Type': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'EntityType', value: fieldName })
        ));

        break;
      }
      case 'Food Type': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'FoodType', value: fieldName })
        ));

        break;
      }

      case 'Location Type': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'LocationType', value: fieldName })
        ));

        break;
      }
      case 'Combined Area Name': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'CombinedAreaName', value: fieldName })
        ));

        break;
      }

      // recipients
      case 'Organizational Structure': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'OrgStructure', value: fieldName })
        ));

        break;
      }

      case 'Food Distribution Model': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'FoodDistModel', value: fieldName })
        ));

        break;
      }

      case 'Demographics Served': {
        ({ meta: result } = await dispatch(
          deleteField({ fieldName: 'DemographicsServed', value: fieldName })
        ));

        break;
      }
      default:
        toast.error('Not a field type');
    }
    if (result && result?.requestStatus === 'fulfilled') {
      toast.success(`Successfully deleted ${fieldName} from Entity Type.`);
      dispatch(getFields());
    } else toast.error(`Unable to delete ${fieldName} from ${whichField}`);

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
