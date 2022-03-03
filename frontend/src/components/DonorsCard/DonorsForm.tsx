import React, { useLayoutEffect, useState } from 'react';
import './DonorsCard.css';
import { RiUser3Fill } from 'react-icons/ri';

const DonorsForm = (props: any) => {
  const [show, setShow] = useState(true);
  const showHideClassName = props.show ? "modal" : "modal-none";
  const [entityType, setEntityType] = useState("");
  const [locationType, setLocationType] = useState("");
  const [foodType, setFoodType] = useState("");
  const [areaName, setAreaName] = useState("");
  const [donor, setDonor] = useState("");
  const [demographicName, setDemographicName] = useState("");

  return(
  <form onSubmit={props.handler}>
    <div className="donors-card" id="modal">
    <input
      className="input"
      placeholder="Donor Name"
      onChange={(e:any) => setDonor(e)}
      />
    <input
      className="input"
      placeholder="Entity Type"
      onChange={(e:any) => setEntityType(e)}
    />
    { props.donors ? (
      <input
        className="input"
        placeholder="Location Type"
        onChange={(e:any) => setLocationType(e)}
      />
      ) : (
      <input
        className="input"
        placeholder="Demographic Name"
        onChange={(e:any) => setDemographicName(e)}
      />
    )}
    <input
      className="input"
      placeholder="Food Type"
      onChange={(e:any) => setFoodType(e)}
    />
    <input
      className="input"
      placeholder="Area Name"
      onChange={(e:any) => setAreaName(e)}
    />
    <button
      type="submit"
      id="form-submit"
    >Add</button>
    </div>
  </form>
  );
}

export default DonorsForm;