import React, { useLayoutEffect, useState } from 'react';
import './TripLog.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const TripLog = (props: any) => {
  const [fontColor, setFontColor] = useState("");

  useLayoutEffect(() => {
    if(parseInt(props.pounds) > 0){
      setFontColor("#3FB551");
    }
    else{
      setFontColor("#D23434");
    }
  }, []);

  function handleClick(){
    console.log("button clicked!");
  }

  return (
    <div className="container">
      <div id="trip">{ props.trip }</div>
      <div id="name">{ props.name }</div>
      <div id="pounds" style={{ color: fontColor }}>
        { props.pounds } lbs
      </div>
      <div id="pencil">
        <button onClick={handleClick}>
          <FontAwesomeIcon className="fa-icon" icon={faPencilAlt} />
        </button>
      </div>
    </div>
  );
}

export default TripLog;