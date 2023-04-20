import React, { useState } from 'react';
import './EntityForm.css';
import { toast } from 'react-toastify';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// import assets
// import Spinner from '../Spinner/Spinner';

/* Form to add new field type */
// eslint-disable-next-line react/function-component-definition
const FieldForm = (props: any) => {
  /* Driver and vehicle state data here */
  const { handleShow, whichField, isUpdate, fieldName } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fieldType, setFieldType] = useState(whichField); // one of Entity Type, Food Type, etc
  const [field, setField] = useState(fieldName);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
  // @TODO add actual dispatch logic
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

      case 'Donors Food Type':
        // await dispatch(
        //   createDonorsFoodType({
        //     /* donorsfoodtype params */
        //   })
        // );
        toast.success('Successfully created new food type.');
        // dispatchGetDonorsFoodTypes();
        break;

      case 'Location Type':
        // await dispatch(
        //   createLocType({
        //     /* location params */
        //   })
        // );
        toast.success('Successfully created new location type.');
        // dispatchGetDonorsFoodTypes();
        break;

      case 'Donors Combined Area Name':
        // await dispatch(
        //   createDonorsCombinedAreaName({
        //     /* combined area name params */
        //   })
        // );
        toast.success('Successfully created new combined area name.');
        // dispatchGetDonorsCombinedAreaName();
        break;

      // recipients
      case 'Organizational Structure':
        // await dispatch(
        //   createOrgstruc({
        //     /* org struc params */
        //   })
        // );
        toast.success('Successfully created new organizational structure.');
        // dispatchGetOrgStruc();
        break;

      case 'Food Distribution Model':
        // await dispatch(
        //   creatFoodDistrModel({
        //     /* food distr model params */
        //   })
        // );
        toast.success('Successfully created new food distribution model.');
        // dispatchGetFoodDistrModel();
        break;

      case 'Recipients Food Type':
        // await dispatch(
        //   createRecipFoodType({
        //     /* food type params */
        //   })
        // );
        toast.success('Successfully created new food type.');
        // dispatchGetRecipFoodType();
        break;

      case 'Demographics Served':
        // await dispatch(
        //   createDemographicServed({
        //     /* demographic served params */
        //   })
        // );
        toast.success('Successfully created new demographic served.');
        // dispatchGetDemographicServed();
        break;

      case 'Recipients Combined Area Name':
        // await dispatch(
        //   createRecipeAreaName({
        //     /* recipient area name params */
        //   })
        // );
        toast.success('Successfully created new combined area name.');
        // dispatchGetRecipAreaName();
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
        toast.success('Successfully updated entity type.');
        // dispatchGetEntityTypes();
        break;
      case 'Donors Food Type':
        // await dispatch(
        //   updateDonorsFoodType({
        //     /* donorsfoodtype params */
        //   })
        // );
        toast.success('Successfully updated food type.');
        // dispatchGetDonorsFoodTypes();
        break;

      case 'Location Type':
        // await dispatch(
        //   updateLocType({
        //     /* location params */
        //   })
        // );
        toast.success('Successfully updated location type.');
        // dispatchGetDonorsFoodTypes();
        break;

      case 'Donors Combined Area Name':
        // await dispatch(
        //   updateDonorsCombinedAreaName({
        //     /* combined area name params */
        //   })
        // );
        toast.success('Successfully updated combined area name.');
        // dispatchGetDonorsCombinedAreaName();
        break;

      // recipients
      case 'Organizational Structure':
        // await dispatch(
        //   updateOrgstruc({
        //     /* org struc params */
        //   })
        // );
        toast.success('Successfully updated organizational structure.');
        // dispatchGetOrgStruc();
        break;

      case 'Food Distribution Model':
        // await dispatch(
        //   updateFoodDistrModel({
        //     /* food distr model params */
        //   })
        // );
        toast.success('Successfully updated food distribution model.');
        // dispatchGetFoodDistrModel();
        break;

      case 'Recipients Food Type':
        // await dispatch(
        //   updateRecipFoodType({
        //     /* food type params */
        //   })
        // );
        toast.success('Successfully updated food type.');
        // dispatchGetRecipFoodType();
        break;

      case 'Demographics Served':
        // await dispatch(
        //   updateDemographicServed({
        //     /* demographic served params */
        //   })
        // );
        toast.success('Successfully updated demographic served.');
        // dispatchGetDemographicServed();
        break;

      case 'Recipients Combined Area Name':
        // await dispatch(
        //   updateRecipeAreaName({
        //     /* recipient area name params */
        //   })
        // );
        toast.success('Successfully updated combined area name.');
        // dispatchGetRecipAreaName();
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
      case 'Donors Food Type':
        // await dispatch(deleteDonorsfoodType(/*field name or id*/));
        toast.success('Successfully deleted food type.');
        // dispatchGetDonorsFoodTypes();
        break;

      case 'Location Type':
        // await dispatch(deleteLocType(/*field name or id*/));
        toast.success('Successfully deleted location type.');
        // dispatchGetLocationTypes();
        break;

      case 'Donors Combined Area Name':
        // await dispatch(deleteDonorsAreaName(/*field name or id*/));
        toast.success('Successfully deleted area name.');
        // dispatchGetDonorsCombinedAreaName();
        break;

      // recipients
      case 'Organizational Structure':
        // await dispatch(deleteOrgStruc(/*field name or id*/));
        toast.success('Successfully deleted organizational structure.');
        // dispatchGetOrgStruc();
        break;

      case 'Food Distribution Model':
        // await dispatch(deleteFoodDistrModel(/*field name or id*/));
        toast.success('Successfully deleted food distrubtion model.');
        // dispatchGetFoodDistrModel();
        break;

      case 'Recipients Food Type':
        // await dispatch(deleteRecipFoodType(/*field name or id*/));
        toast.success('Successfully deleted food type.');
        // dispatchGetRecipFoodType();
        break;

      case 'Demographics Served':
        // await dispatch(deleteDemographicServed(/*field name or id*/));
        toast.success('Successfully deleted demographic served.');
        // dispatchGetDemographicServed();
        break;

      case 'Recipients Combined Area Name':
        // await dispatch(deleteRecipAreaName(/*field name or id*/));
        toast.success('Successfully deleted area name.');
        // dispatchGetRecipAreaName();
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
