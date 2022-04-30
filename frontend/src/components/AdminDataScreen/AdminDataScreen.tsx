import React, { useState, useLayoutEffect, useEffect } from 'react';
import './AdminDataScreen.css';
import DonorsCard from '../../components/DonorsCard/DonorsCard';
import RecipientsCard from '../../components/RecipientsCard/RecipientsCard';
import VehiclesCard from '../../components/VehiclesCard/VehiclesCard';
import VolunteersCard from '../../components/VolunteersCard/VolunteersCard';
import NewVolunteersCard from '../../components/VolunteersCard/NewVolunteersCard';
import NewDonorsCard from '../../components/DonorsCard/NewDonorsCard';
import EntityForm from './EntityForm';
import ShortEntityForm from './ShortEntityForm';
import { deliverySchema, pickupSchema } from '../../data/dbMock';
import { AiOutlineSearch } from 'react-icons/ai';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getDrivers, deleteDriver } from '../../features/driverAuth/driverAuthSlice'
import { getVehicles, deleteVehicle} from '../../features/vehicles/VehiclesSlice';
import AdminHeader from '../AdminHeader/AdminHeader';
import Spinner from '../Spinner/Spinner';

const AdminDataScreen = () => {
  const [loading, setLoading] = useState(false);
  const [vehiclesCard, setVehiclesCard] = useState(false);
  const [volunteers, setVolunteers] = useState(false);
  const [donors, setDonors] = useState(false);
  const [recipients, setRecipients] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [q, setQ] = useState("");
  const [searchParam, setSearchParam] = useState(["name"]);
  const dispatch = useAppDispatch();
  const { isLoading, drivers, isError, isSuccess, message } = useAppSelector(
    (state) => state.driverAuth
  );
  const { vehicles, isLoading : vehicleLoading,  isError : vehicleError, isSuccess : vehicleSuccess, message : vehicleMessage } = useAppSelector(
    (state) => state.vehicle
  );

  useEffect(() => {
    dispatch(getDrivers());
    dispatch(getVehicles());
  }, [dispatch]);

  const removeDriver = (id:string) => {
    window.confirm('Are you sure you want to delete this driver?') &&
      dispatch(deleteDriver(id))
      window.location.reload()
  };

  function handleVolunteers(){
    setVolunteers((prev) => !prev);
    setSearchParam(["name", "pin"]);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
  }

  function handleVehicles(){
    setVolunteers(false);
    setVehiclesCard((prev) => !prev);
    setSearchParam(["name"]);
    setDonors(false);
    setRecipients(false);
  }

  function handleDonors(){
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors((prev) => !prev);
    setSearchParam(["name", "donorLocationType", "donorEntityType", "foodType", "area"]);
    setRecipients(false);
  }

  function handleRecipients(){
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients((prev) => !prev);
    setSearchParam(["name", "recipientEntityType", "demographic", "foodType", "area"]);
  }

  function handleShowModal(){
    setShowModal((prev) => !prev);
  }

  /* reset input when category switches */
  useLayoutEffect(() => {
    setQ('');
  }, [volunteers, vehiclesCard, donors, recipients]);

  /* this function adds cards to query based on search */
  function search(items:any){
    if(volunteers){
      return drivers.filter((item:any) => {
        return searchParam.some((newItem:any) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      });
    } else if(vehiclesCard){
      return vehicles.filter((item:any) => {
        return item.name !== 'personal vehicle' && searchParam.some((newItem:any) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      });
    } else if(donors){
      return pickupSchema.filter((item:any) => {
        return searchParam.some((newItem:any) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      });
    } else{
      return deliverySchema.filter((item:any) => {
        return searchParam.some((newItem:any) => {
          return (
            item[newItem]
              .toString()
              .toLowerCase()
              .indexOf(q.toLowerCase()) > -1
          );
        });
      });
    }
  }

if(loading){
  return <Spinner />
}
  return(
    <div >
    <AdminHeader />
    <div className="admin-container">
    <div className="data-container" style={{background: 'white'}}>
    <div className="data-title">Manage Data</div>
    <div className="titles">
      <div>
        <button className="title" onClick={handleVolunteers} style={{border: volunteers ? '2px solid #FF9C55' : ''}}>
          Volunteers
        </button>
      </div>
      <div>
        <button className="title" onClick={handleVehicles} style={{border: vehiclesCard ? '2px solid #FF9C55' : ''}}>
          Vehicles
        </button>
      </div>
      <div>
        <button className="title" onClick={handleDonors} style={{border: donors ? '2px solid #FF9C55' : ''}}>
          Donors
        </button>
      </div>
      <div>
        <button className="title" onClick={handleRecipients} style={{border: recipients ? '2px solid #FF9C55' : ''}}>
          Recipients
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
      <AiOutlineSearch id="search-icon" style={{color:'grey'}}/>
    </div>

  { volunteers && (
    <div className="logs">
      <button onClick={handleShowModal}>
        <NewVolunteersCard />
      </button>
      { showModal && <ShortEntityForm handleShow={handleShowModal}/>}
      {search(q).map((item:any, index:any) => {
        return(
          <VolunteersCard
            index={index}
            name={item.name}
            pin={item.pin}
            id={item._id}
            removeDriver={removeDriver}/>
        );
      })}
    </div>
  )}

  { vehiclesCard && (
    <div className="logs">
      <button onClick={handleShowModal}>
        <NewVolunteersCard />
      </button>
      { showModal && <ShortEntityForm handleShow={handleShowModal}/>}
      {search(q).map((item:any, index:any) => {
        return(
          <VehiclesCard
          
            index={index}
            vehicle={item.name}/>
        );
      })}
    </div>
  )}

  { donors && (
    <div className="logs long-log">
      <button onClick={handleShowModal}>
        <NewDonorsCard />
      </button>
      { showModal && <EntityForm handleShow={handleShowModal}/> }
      {search(q).map((item:any, index:any) => {
        return(
          <DonorsCard
            index={item.id}
            donor={item.name}
            entityType= {item.donorEntityType}
            locationType= {item.donorLocationType}
            foodType= {item.foodType}
            areaName= {item.area}/>
        );
      })}
    </div>
  )}

  { recipients && (
    <div className="logs long-log">
      <button onClick={handleShowModal}>
        <NewDonorsCard />
      </button>
      { showModal && <EntityForm handleShow={handleShowModal}/> }
      {search(q).map((item:any, index:any) => {
        return(
          <RecipientsCard
            index={item.id}
            donor={item.name}
            entityType={item.recipientEntityType}
            demographicName={item.demographic}
            foodType={item.foodType}
            areaName={item.area}/>
        );
      })}
    </div>
  )}
  </div>
  </div>
  </div>
);
}

export default AdminDataScreen;