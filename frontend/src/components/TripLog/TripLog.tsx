import React, { useLayoutEffect, useState, ChangeEvent } from 'react';
import './TripLog.css';
import Select from 'react-select';
import { BiPencil } from 'react-icons/bi';

const TripLog = (props:any) => {
  const [fontColor, setFontColor] = useState("");
  const [name, setName] = useState("");
  const [trip, setTrip] = useState("");
  const [pounds, setPounds] = useState("");
  const [editBtn, setEditBtn] = useState(false);

  const options =[
    {value:'Dropoff', label:'Dropoff'},
    {value:'Pickup', label:'Pickup'},
  ]

  function handleTripChange(e:any){
    setTrip(e.value);
    ( trip === "Dropoff" ? setFontColor("#3FB551") :
     trip === "Pickup" ? setFontColor("#D23434") : setFontColor("black") );
  }

  useLayoutEffect(() => {
    setName(props.name);
    setTrip(props.trip);
    setPounds(props.pounds);
  }, []);

  useLayoutEffect(() => {
   ( trip === "Pickup" ? setFontColor("#3FB551") :
    trip === "Dropoff" ? setFontColor("#D23434") : setFontColor("black") );
  }, [fontColor]);

  function handleClick(){
    console.log("button clicked!");
    setEditBtn((prev) => !prev);
  }

  function handlePoundsChange(e:any){
    { isNaN(e) || e === '-' ? alert("Please enter a numerical value for pounds.") : setPounds(e) }
  }

  function changeFontColor(){
    ( trip === "Dropoff" ? setFontColor("#3FB551") :
      trip === "Pickup" ? setFontColor("#D23434") : setFontColor("black") );
  }

  return (
    <div className="triplog-container">
      <div id="trip">
        {editBtn ?
        (<Select className="input" options={options} onChange={handleTripChange}/>)
        : ( trip )}
      </div>
      <div id="name">
        {editBtn ?
        (<input
          className="input"
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder={props.name}/>)
        : ( name )}
      </div>
      <div id="pounds" >
        {editBtn ?
        (<input
          className="input"
          type="text"
          name="lbs"
          onChange={(e) => handlePoundsChange(e.target.value)}
          value={pounds}
          placeholder={pounds}/>)
        : (<div className = "pounds-container" style={{color: fontColor}}>
            {trip === "Pickup" ? <h1>+</h1> : <h1>-</h1>}
            {pounds} lbs</div>
          )}
      </div>

      <div id="pencil">
        <button onClick={handleClick}>
          <BiPencil id="bipencil"/>
        </button>
      </div>
    </div>
  );
}

export default TripLog;