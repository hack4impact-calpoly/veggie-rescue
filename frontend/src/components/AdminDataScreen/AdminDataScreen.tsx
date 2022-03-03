import React, { useState, useLayoutEffect } from 'react';
import './AdminDataScreen.css';
import DonorsCard from '../../components/DonorsCard/DonorsCard';
import RecipientsCard from '../../components/RecipientsCard/RecipientsCard';
import VehiclesCard from '../../components/VehiclesCard/VehiclesCard';
import VolunteersCard from '../../components/VolunteersCard/VolunteersCard';
import NewVolunteersCard from '../../components/VolunteersCard/NewVolunteersCard';
import NewDonorsCard from '../../components/DonorsCard/NewDonorsCard';
import VolunteersForm from '../../components/VolunteersCard/VolunteersForm';
import DonorsForm from '../../components/DonorsCard/DonorsForm';
import { vehicles } from '../../data/dbMock';
import { AiOutlineSearch } from 'react-icons/ai';

const AdminDataScreen = () => {
  const [vehiclesCard, setVehiclesCard] = useState(false);
  const [volunteers, setVolunteers] = useState(false);
  const [donors, setDonors] = useState(false);
  const [recipients, setRecipients] = useState(false);
  const [newCard, setNewCard] = useState(false);

  function handleClick(){
    console.log("button clicked");
  }

  function handleVolunteers(){
    setVolunteers((prev) => !prev);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients(false);
  }
  function handleVehicles(){
    setVolunteers(false);
    setVehiclesCard((prev) => !prev);
    setDonors(false);
    setRecipients(false);
  }
  function handleDonors(){
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors((prev) => !prev);
    setRecipients(false);
  }
  function handleRecipients(){
    setVolunteers(false);
    setVehiclesCard(false);
    setDonors(false);
    setRecipients((prev) => !prev);
  }
  function handleNew(){
    console.log("add new");
    setNewCard((prev) => !prev);
  }

  useLayoutEffect(() => {
    ( <div><VolunteersForm /><h1>hi</h1></div> );
  }, [newCard]);

  return(
    <div className="data-container" style={{background: 'white'}}>
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
      />
      <AiOutlineSearch id="search-icon" style={{color:'grey'}}/>
    </div>

  { volunteers && (
    <div className="logs">
      <button onClick={handleNew}>
        <NewVolunteersCard />
      </button>
      { newCard && <VolunteersForm volunteers={true} handler={handleNew}/>}
      {(vehicles).map((v,index) => {
        return(
          <VolunteersCard
            index={index}
            name= "Sam Favreau"
            pin= "1111" />
        );
      })}
    </div>
    )}

    { vehiclesCard && (
    <div className="logs">
      <button onClick={handleNew}>
        <NewVolunteersCard />
      </button>
      { newCard && <VolunteersForm volunteers={false} handler={handleNew}/>}
      {(vehicles).map((v,index) => {
        return(
          <VehiclesCard
            index={index}
            vehicle={v.name} />
        );
      })}
    </div>
    )}

    { donors && (
        <div className="logs">
          <button onClick={handleNew}>
            <NewDonorsCard />
          </button>
          { newCard && <DonorsForm donors={true} /> }
          {(vehicles).map((v,index) => {
            return(
              <DonorsCard
                index={index}
                donor="ella"
                entityType= "Farm"
                locationType= "Farm"
                foodType= "Produce"
                areaName= "SM/Orcutt"/>
            );
          })}
        </div>
    )}

    { recipients && (
        <div className="logs">
          <button onClick={handleNew}>
            <NewDonorsCard />
          </button>
          { newCard && <DonorsForm donors={false} /> }
          {(vehicles).map((v,index) => {
            return(
              <RecipientsCard
                index={index}
                donor="ella"
                entityType= "Farm"
                demographicName= "Farm"
                foodType= "Produce"
                areaName= "SM/Orcutt"/>
              );
          })}
        </div>
    )}
  </div>
  );
}

export default AdminDataScreen;