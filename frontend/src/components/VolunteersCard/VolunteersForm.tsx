import React, { useLayoutEffect, useState } from 'react';
import './VolunteersCard.css';
import { RiUser3Fill } from 'react-icons/ri';

const VolunteersForm = (props: any) => {
  const [show, setShow] = useState(true);
  const showHideClassName = props.show ? "modal" : "modal-none";
  const [name, setName] = useState("");
  const [volunteerID, setVolunteerID] = useState("");

  return(
    <form onSubmit={props.handler}>
      <div className="volunteer-card" id="modal">
        <input
          className="input"
          placeholder="Name"
          onChange={(e:any) => setName(e)}
         />
        { props.volunteers && (
          <input
            className="input"
            placeholder="Pin"
            onChange={(e:any) => setVolunteerID(e)}
          />
        )}
        <button
          type="submit"
          id="form-submit"
        >Add</button>
      </div>
    </form>
  );
}

export default VolunteersForm;