import { useState, useLayoutEffect, useEffect, useCallback } from 'react';
import './AdminDataScreen.css';
import { AiOutlineSearch } from 'react-icons/ai';
import DonorsCard from '../DonorsCard/DonorsCard';
import RecipientsCard from '../RecipientsCard/RecipientsCard';
import VehiclesCard from '../VehiclesCard/VehiclesCard';
import VolunteersCard from '../VolunteersCard/VolunteersCard';
import NewVolunteersCard from '../VolunteersCard/NewVolunteersCard';
import NewDonorsCard from '../DonorsCard/NewDonorsCard';
import ShortEntityForm from './ShortEntityForm';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getDrivers } from '../../features/driverAuth/driverAuthSlice';
import { getVehicles } from '../../features/vehicles/VehiclesSlice';
import { getDonors } from '../../features/donors/donorSlice';
import { getRecipients } from '../../features/recipients/recipientsSlice';
import AdminHeader from '../AdminHeader/AdminHeader';
import Spinner from '../Spinner/Spinner';
import DonorsForm from '../DonorsCard/DonorsForm';
import RecipientsForm from '../RecipientsCard/RecipientsForm';
import FieldPage from '../FieldPage/FieldPage';
import FieldForm from './FieldForm';

function AdminDataScreen() {
  const [loading] = useState(false);
  const [vehiclesCard, setVehiclesCard] = useState(false);
  const [volunteers, setVolunteers] = useState(false);
  const [donors, setDonors] = useState(false);
  const [recipients, setRecipients] = useState(false);

  const [entityTypeCard, setEntityTypeCard] = useState(false);
  const [locationTypeCard, setLocationTypeCard] = useState(false);
  const [donorsAreaNameCard, setDonorsAreaNameCard] = useState(false);

  const [foodTypeCard, setFoodTypeCard] = useState(false);

  const [orgStrucCard, setOrgStrucCard] = useState(false);
  const [foodDistrModelCard, setFoodDistrModelCard] = useState(false);
  const [demographicCard, setDemographicCard] = useState(false);
  const [recipAreaNameCard, setRecipAreaNameCard] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [q, setQ] = useState('');
  const [searchParam, setSearchParam] = useState(['name']);
  const [isUpdate, setUpdate] = useState(false);
  const dispatch = useAppDispatch();
  const { drivers } = useAppSelector((state) => state.driverAuth);
  const { vehicles } = useAppSelector((state) => state.vehicle);

  const { donors: pickupSchema } = useAppSelector((state) => state.donors);

  const { recipients: deliverySchema } = useAppSelector(
    (state) => state.recipients
  );

  const foodTypes = [
    'Produce',
    'Baked goods',
    'Prepared',
    'Packaged/Processed',
    'Retail',
    'non-food'
  ];

  const donorsEntityTypes = [
    'Farm',
    'Restaurant',
    'Food Supply Company',
    'Nonprofit',
    'Grocery',
    'Community Kitchen'
  ];

  const areaNames = ['SB/Goleta', 'SYV', 'SM/Orcutt', 'Cuyama', 'Lompoc'];

  const locationTypes = [
    'Farm',
    'Farmers market',
    'Warehouse',
    'Restaurant',
    'Community Kitchen'
  ];

  const orgStrucs = [
    'Church',
    'Shelter',
    'School',
    'Senior Center',
    'Food Pantry - Other',
    'Temp Food Pantry - Other',
    'Nonprofit - Other'
  ];

  const foodDistrModels = [
    'Community Kitchen',
    'Food Pantry',
    'Meals-on-wheels',
    'Senior Center Kitchen',
    'Free Farmers Table',
    'Shared delivery'
  ];

  const demographicsServed = [
    'Homeless',
    'Low Income',
    'Senior',
    'Youth (Schools)',
    'Animals',
    'First Responders',
    'Community Kitchen',
    'Compost',
    'Landfill'
  ];

  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [currentVolunteer, setCurrentVolunteer] = useState(null);
  const [currentDonor, setCurrentDonor] = useState(null);
  const [currentRecipient, setCurrentRecipient] = useState(null);

  const [currentEntityType, setCurrentEntityType] = useState(null);
  const [currentLocType, setCurrentLocType] = useState(null);
  const [currentDonorsAreaName, setCurrentDonorsAreaName] = useState(null);

  const [currentFoodType, setCurrentFoodType] = useState(null);

  const [currentOrgStruc, setCurrentOrgStruc] = useState(null);
  const [currentFoodDistr, setCurrentFoodDistr] = useState(null);
  const [currentDemographic, setCurrentDemographic] = useState(null);
  const [currentRecipAreaName, setCurrentRecipAreaName] = useState(null);

  const [showDonorButtons, toggleDonorButtons] = useState(false);
  const [showRecipientButtons, toggleRecipientButtons] = useState(false);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getVehicles());
    dispatch(getDonors());
    dispatch(getRecipients());
  }, [dispatch]);

  const handleVolunteers = useCallback(() => {
    setVolunteers((prev) => !prev);
    setSearchParam(['name', 'pin']);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    toggleDonorButtons(false);
    toggleRecipientButtons(false);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }, []);

  const handleVehicles = useCallback(() => {
    setVolunteers(false);
    setVehiclesCard((prev) => !prev);
    setSearchParam(['name']);
    setDonors(false);
    setRecipients(false);
    toggleDonorButtons(false);
    toggleRecipientButtons(false);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }, []);

  const vehicleData = useCallback((vehicle: any) => {
    setCurrentVehicle(vehicle);
    setUpdate(true);
  }, []);

  const entityTypeData = useCallback((entityType: any) => {
    setCurrentEntityType(entityType);
    setUpdate(true);
  }, []);

  const foodTypeData = useCallback((foodType: any) => {
    setCurrentFoodType(foodType);
    setUpdate(true);
  }, []);

  const locTypeData = useCallback((locType: any) => {
    setCurrentLocType(locType);
    setUpdate(true);
  }, []);

  const donorsAreaNameData = useCallback((donorsAreaNameType: any) => {
    setCurrentDonorsAreaName(donorsAreaNameType);
    setUpdate(true);
  }, []);

  const orgStrucData = useCallback((orgStrucType: any) => {
    setCurrentOrgStruc(orgStrucType);
    setUpdate(true);
  }, []);

  const foodDistrModelData = useCallback((foodDistrModelType: any) => {
    setCurrentFoodDistr(foodDistrModelType);
    setUpdate(true);
  }, []);

  const demoServedData = useCallback((demoServedType: any) => {
    setCurrentDemographic(demoServedType);
    setUpdate(true);
  }, []);

  const recipAreaNameData = useCallback((recipAreaNameType: any) => {
    setCurrentRecipAreaName(recipAreaNameType);
    setUpdate(true);
  }, []);

  const volunteerData = useCallback((volunteer: any) => {
    setCurrentVolunteer(volunteer);
    setUpdate(true);
  }, []);

  const donorData = useCallback((donor: any) => {
    setCurrentDonor(donor);
    setUpdate(true);
  }, []);

  const recipientData = useCallback((recipient: any) => {
    setCurrentRecipient(recipient);
    setUpdate(true);
  }, []);

  function handleDonors() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors((prev) => !prev);
    setSearchParam(['name', 'donorLocationType', 'donorEntityType', 'area']);
    setRecipients(false);
    // toggleDonorButtons((prev) => !prev);
    toggleDonorButtons(true);
    toggleRecipientButtons(false);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleEntityType() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setSearchParam(['EntityType']);
    setRecipients(false);
    toggleDonorButtons(true);
    toggleRecipientButtons(false);
    setEntityTypeCard(true);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleDonorsFoodType() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setSearchParam(['name']);
    setRecipients(false);
    toggleDonorButtons(true);
    toggleRecipientButtons(false);
    setEntityTypeCard(false);
    setFoodTypeCard(true);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleLocationType() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setSearchParam(['name']);
    setRecipients(false);
    toggleDonorButtons(true);
    toggleRecipientButtons(false);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(true);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleDonorsAreaName() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setSearchParam(['name']);
    setRecipients(false);
    toggleDonorButtons(true);
    toggleRecipientButtons(false);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(true);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleRecipients() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients((prev) => !prev);
    setSearchParam([
      'name',
      'recipientOrgStructure',
      'demographic',
      'foodDistModel',
      'area'
    ]);
    toggleDonorButtons(false);
    // toggleRecipientButtons((prev) => !prev);
    toggleRecipientButtons(true);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleOrgStruc() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    setSearchParam(['name']);
    toggleDonorButtons(false);
    toggleRecipientButtons(true);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(true);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleFoodDistrModel() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    setSearchParam(['name']);
    toggleDonorButtons(false);
    toggleRecipientButtons(true);
    setEntityTypeCard(false);
    // setDonorsFoodTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(true);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleRecipFoodType() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    setSearchParam(['name']);
    toggleDonorButtons(false);
    toggleRecipientButtons(true);
    setEntityTypeCard(false);
    setFoodTypeCard(true);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(false);
  }

  function handleDemographics() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    setSearchParam(['name']);
    toggleDonorButtons(false);
    toggleRecipientButtons(true);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(true);
    setRecipAreaNameCard(false);
  }

  function handleAreaName() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    setSearchParam(['name']);
    toggleDonorButtons(false);
    toggleRecipientButtons(true);
    setEntityTypeCard(false);
    setFoodTypeCard(false);
    setLocationTypeCard(false);
    setDonorsAreaNameCard(false);
    setOrgStrucCard(false);
    setFoodDistrModelCard(false);
    setDemographicCard(false);
    setRecipAreaNameCard(true);
  }

  const handleShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, []);

  /* reset input when category switches */
  useLayoutEffect(() => {
    setQ('');
  }, [volunteers, vehiclesCard, donors, recipients]);

  /* this function adds cards to query based on search */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function search(items: any) {
    if (volunteers) {
      return drivers.filter((item: any) =>
        searchParam.some(
          (newItem: any) =>
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }
    if (entityTypeCard) {
      return donorsEntityTypes.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (foodTypeCard) {
      return foodTypes.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (locationTypeCard) {
      return locationTypes.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (donorsAreaNameCard) {
      return areaNames.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (orgStrucCard) {
      return orgStrucs.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (foodDistrModelCard) {
      return foodDistrModels.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (demographicCard) {
      return demographicsServed.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (recipAreaNameCard) {
      return areaNames.filter((item: any) =>
        searchParam.some(
          () => item.toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }

    if (vehiclesCard) {
      return vehicles.filter(
        (item: any) =>
          item.name !== 'personal vehicle' &&
          searchParam.some(
            (newItem: any) =>
              item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) >
              -1
          )
      );
    }
    if (donors) {
      return pickupSchema.filter((item: any) =>
        searchParam.some(
          (newItem: any) =>
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }
    return deliverySchema.filter((item: any) =>
      searchParam.some(
        (newItem: any) =>
          item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  if (loading) {
    return <Spinner />;
  }
  return (
    <div>
      <AdminHeader />
      <div className="admin-container">
        <div className="data-container" style={{ background: 'white' }}>
          <div className="data-title">Manage Data</div>
          <div className="titles">
            <div>
              <button
                type="button"
                className="title"
                onClick={handleVolunteers}
                style={{ border: volunteers ? '2px solid #FF9C55' : '' }}
              >
                Drivers
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleVehicles}
                style={{ border: vehiclesCard ? '2px solid #FF9C55' : '' }}
              >
                Vehicles
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleDonors}
                style={{ border: donors ? '2px solid #FF9C55' : '' }}
              >
                Donors
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleRecipients}
                style={{ border: recipients ? '2px solid #FF9C55' : '' }}
              >
                Recipients
              </button>
            </div>
          </div>

          {/* recipient buttons */}
          <div className={showRecipientButtons ? 'titles' : 'hidden titles'}>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleOrgStruc}
                style={{ border: orgStrucCard ? '2px solid #FF9C55' : '' }}
              >
                Organizational Structure
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleFoodDistrModel}
                style={{
                  border: foodDistrModelCard ? '2px solid #FF9C55' : ''
                }}
              >
                Food Distribution Model
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleRecipFoodType}
                style={{ border: foodTypeCard ? '2px solid #FF9C55' : '' }}
              >
                Food Type
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleDemographics}
                style={{ border: demographicCard ? '2px solid #FF9C55' : '' }}
              >
                Demographic Served
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleAreaName}
                style={{ border: recipAreaNameCard ? '2px solid #FF9C55' : '' }}
              >
                Combined Area Name
              </button>
            </div>
          </div>

          {/* donor buttons */}
          <div className={showDonorButtons ? 'titles' : 'hidden titles'}>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleEntityType}
                style={{ border: entityTypeCard ? '2px solid #FF9C55' : '' }}
              >
                Entity Type
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleDonorsFoodType}
                style={{
                  border: foodTypeCard ? '2px solid #FF9C55' : ''
                }}
              >
                Food Type
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleLocationType}
                style={{ border: locationTypeCard ? '2px solid #FF9C55' : '' }}
              >
                Location Type
              </button>
            </div>
            <div>
              <button
                type="button"
                className="title"
                onClick={handleDonorsAreaName}
                style={{
                  border: donorsAreaNameCard ? '2px solid #FF9C55' : ''
                }}
              >
                Combined Area Name
              </button>
            </div>
          </div>
          <div className="search">
            <input
              type="text"
              id="header-search"
              placeholder="Search"
              name="s"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <AiOutlineSearch id="search-icon" style={{ color: 'grey' }} />
          </div>

          {volunteers && (
            <div className="logs">
              <button
                type="submit"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <ShortEntityForm
                  handleShow={handleShowModal}
                  whichEntity={false}
                  isUpdate={isUpdate}
                  volunteer={currentVolunteer}
                  vehicle={currentVehicle}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <VolunteersCard
                  index={index}
                  handleShow={handleShowModal}
                  volunteer={item}
                  volunteerHandler={volunteerData}
                />
              ))}
            </div>
          )}
          {/* need to be able to pass that the vehicle card is up */}
          {vehiclesCard && (
            <div className="logs">
              <button
                type="submit"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <ShortEntityForm
                  handleShow={handleShowModal}
                  whichEntity
                  isUpdate={isUpdate}
                  vehicle={currentVehicle}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <VehiclesCard
                  index={index}
                  vehicle={item}
                  handleShow={handleShowModal}
                  vehicleHandler={vehicleData}
                />
              ))}
            </div>
          )}

          {donors && (
            <div className="logs long-log">
              {/* <button onClick={handleShowModal}> */}
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewDonorsCard />
              </button>
              {showModal && (
                <DonorsForm
                  handleShow={handleShowModal}
                  whichEntity
                  isUpdate={isUpdate}
                  donor={currentDonor}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <DonorsCard
                  index={index}
                  donor={item}
                  handleShow={handleShowModal}
                  donorHandler={donorData}
                />
              ))}
            </div>
          )}

          {recipients && (
            <div className="logs long-log">
              <button
                type="submit"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewDonorsCard />
              </button>
              {showModal && (
                <RecipientsForm
                  handleShow={handleShowModal}
                  whichEntity={false}
                  isUpdate={isUpdate}
                  recipient={currentRecipient}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <RecipientsCard
                  // index={item.id}
                  // donor={item.name}
                  // entityType={item.recipientEntityType}
                  // demographicName={item.demographic}
                  // foodType={item.foodType}
                  // areaName={item.area}
                  index={index}
                  recipient={item}
                  handleShow={handleShowModal}
                  recipientHandler={recipientData}
                />
              ))}
            </div>
          )}

          {entityTypeCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Entity Type" // choose between entitytype, foodtype, etc
                  isUpdate={isUpdate}
                  fieldName={currentEntityType} // the actual field, i.e. church, school, etc
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={entityTypeData}
                />
              ))}
            </div>
          )}

          {locationTypeCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Location Type"
                  isUpdate={isUpdate}
                  fieldName={currentLocType}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={locTypeData}
                />
              ))}
            </div>
          )}

          {donorsAreaNameCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Donors Combined Area Name"
                  isUpdate={isUpdate}
                  fieldName={currentDonorsAreaName}
                />
              )}

              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={donorsAreaNameData}
                />
              ))}
            </div>
          )}

          {orgStrucCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Organizational Structure"
                  isUpdate={isUpdate}
                  fieldName={currentOrgStruc}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={orgStrucData}
                />
              ))}
            </div>
          )}

          {foodDistrModelCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Food Distribution Model"
                  isUpdate={isUpdate}
                  fieldName={currentFoodDistr}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={foodDistrModelData}
                />
              ))}
            </div>
          )}

          {foodTypeCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Recipients Food Type"
                  isUpdate={isUpdate}
                  fieldName={currentFoodType}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={foodTypeData}
                />
              ))}
            </div>
          )}

          {demographicCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Demographics Served"
                  isUpdate={isUpdate}
                  fieldName={currentDemographic}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={demoServedData}
                />
              ))}
            </div>
          )}

          {recipAreaNameCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard />
              </button>
              {showModal && (
                <FieldForm
                  handleShow={handleShowModal}
                  whichField="Recipients Combined Area Name"
                  isUpdate={isUpdate}
                  fieldName={currentRecipAreaName}
                />
              )}
              {search(q).map((item: any, index: any) => (
                <FieldPage
                  index={index}
                  field={item}
                  handleShow={handleShowModal}
                  fieldHandler={recipAreaNameData}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDataScreen;
