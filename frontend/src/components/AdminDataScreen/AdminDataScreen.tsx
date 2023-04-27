/* eslint-disable react/jsx-no-bind */
import React, { useState, useLayoutEffect, useEffect } from 'react';
import './AdminDataScreen.css';
import { AiOutlineSearch } from 'react-icons/ai';
import DonorsCard from '../DonorsCard/DonorsCard';
import RecipientsCard from '../RecipientsCard/RecipientsCard';
import VehiclesCard from '../VehiclesCard/VehiclesCard';
import VolunteersCard from '../VolunteersCard/VolunteersCard';
import NewVolunteersCard from '../VolunteersCard/NewVolunteersCard';
import NewDonorsCard from '../DonorsCard/NewDonorsCard';
import ShortEntityForm from './ShortEntityForm';
// import { deliverySchema, pickupSchema, dnoo } from '../../data/dbMock';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getDrivers
  // deleteDriver
} from '../../features/driverAuth/driverAuthSlice';
import { getVehicles } from '../../features/vehicles/VehiclesSlice';
import { getDonors } from '../../features/donors/donorSlice';
import { getRecipients } from '../../features/recipients/recipientsSlice';
import AdminHeader from '../AdminHeader/AdminHeader';
import Spinner from '../Spinner/Spinner';
import DonorsForm from '../DonorsCard/DonorsForm';
import RecipientsForm from '../RecipientsCard/RecipientsForm';

// import VehicleEditForm from './EditComponents/VehicleEditForm';
// import VolunteerEditForm from './EditComponents/VolunteerEditForm';
// import DonorEditForm from './EditComponents/DonorEditForm';
// import RecipientEditForm from './EditComponents/RecipientEditForm';


const AdminDataScreen = () => {


  const [loading, setLoading] = useState(false);
  const [vehiclesCard, setVehiclesCard] = useState(false);
  const [volunteers, setVolunteers] = useState(false);
  const [donors, setDonors] = useState(false);
  const [recipients, setRecipients] = useState(false);
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

  // const [edit, setEdit] = useState(false);
  // const [dataToEdit, setDataToEdit] = useState({});
  const [currentVehicle, setCurrentVehicle] = useState(null);
  const [currentVolunteer, setCurrentVolunteer] = useState(null);
  const [currentDonor, setCurrentDonor] = useState(null);
  const [currentRecipient, setCurrentRecipient] = useState(null);

  const [showDonorButtons, toggleDonorButtons] = useState(false);
  const [showRecipientButtons, toggleRecipientButtons] = useState(false);

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getVehicles());
    dispatch(getDonors());
    dispatch(getRecipients());
  }, [dispatch]);

  // const removeDriver = (id: string) => {
  //   window.confirm('Are you sure you want to delete this driver?') &&
  //     dispatch(deleteDriver(id));
  //   window.location.reload();
  // };

  function handleVolunteers() {
    setVolunteers((prev) => !prev);
    setSearchParam(['name', 'pin']);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
    toggleDonorButtons(false);
    toggleRecipientButtons(false);
  }

  function handleVehicles() {
    setVolunteers(false);
    setVehiclesCard((prev) => !prev);
    setSearchParam(['name']);
    setDonors(false);
    setRecipients(false);
    toggleDonorButtons(false);
    toggleRecipientButtons(false);
  }

  function vehicleData(vehicle: any) {
    setCurrentVehicle(vehicle);
    setUpdate(true);
  }
  function volunteerData(volunteer: any) {
    setCurrentVolunteer(volunteer);
    setUpdate(true);
  }
  function donorData(donor: any) {
    setCurrentDonor(donor);
    setUpdate(true);
  }
  function recipientData(recipient: any) {
    setCurrentRecipient(recipient);
    setUpdate(true);
  }
  function handleDonors() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors((prev) => !prev);
    setSearchParam([
      'name',
      'donorLocationType',
      'donorEntityType',
      'foodType',
      'area'
    ]);
    setRecipients(false);
    toggleDonorButtons((prev) => !prev);
    toggleRecipientButtons(false);
  }

  function handleRecipients() {
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients((prev) => !prev);
    setSearchParam([
      'name',
      'recipientEntityType',
      'demographic',
      'foodType',
      'area'
    ]);
    toggleDonorButtons(false);
    toggleRecipientButtons((prev) => !prev);
  }

  function handleShowModal() {
    setShowModal((prev) => !prev);
  }

  /* reset input when category switches */
  useLayoutEffect(() => {
    setQ('');
  }, [volunteers, vehiclesCard, donors, recipients]);

  /* this function adds cards to query based on search */
  function search(items: any) {
    if (volunteers) {
      return drivers.filter((item: any) =>
        searchParam.some(
          (newItem: any) =>
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
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
      console.log(pickupSchema);
      return pickupSchema.filter((item: any) =>
        searchParam.some(
          (newItem: any) =>
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
        )
      );
    }
    console.log(deliverySchema);
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
                Volunteers
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
          
          {/*recipient buttons*/}
          <div className={showRecipientButtons ? "titles" : "hidden titles"}>  
          <div>
              <button
              className="title"
              >
              Organizational Structure
              </button>
            </div>
            <div>
              <button
              className="title">
                Food Distribution Model
              </button>
            </div>
            <div>
              <button
              className="title">
                Food Type
              </button>
            </div>
            <div>
              <button
              className="title">
                Demographic Served
              </button>
            </div>
            <div>
              <button
              className="title">
                Combined Area Name
              </button>
            </div>
          </div>
          
          {/*donor buttons*/}
          <div className={showDonorButtons ? "titles" : "hidden titles"}>  
          <div>
              <button
              className="title">
                Entity Type
              </button>
            </div>
            <div>
              <button
              className="title">
                Food Type
              </button>
            </div>
            <div>
              <button
              className="title">
                Location Type
              </button>
            </div>
            <div>
              <button
              className="title">
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
                type="button"
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
                />
              )}
              {search(q).map((item: any, index: any) => (
                <VolunteersCard
                  index={index}
                  handleShow={handleShowModal}
                  volunteer={item}
                  // removeDriver={removeDriver}
                  volunteerHandler={volunteerData}
                />
              ))}
            </div>
          )}
          {/* need to be able to pass that the vehicle card is up */}
          {vehiclesCard && (
            <div className="logs">
              <button
                type="button"
                onClick={() => {
                  handleShowModal();
                  setUpdate(false);
                }}
              >
                <NewVolunteersCard isUpdate={isUpdate} />
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
        </div>
      </div>
    </div>
  );
}

export default AdminDataScreen;
