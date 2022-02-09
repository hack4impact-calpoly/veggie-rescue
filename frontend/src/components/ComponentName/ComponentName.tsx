import React, { useLayoutEffect, useState } from 'react';
import './ComponentName.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';

const ComponentName = (props: any) => {
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
      <div id="pounds" style={{ color: fontColor }}>{ props.pounds }</div>
      <div id="pencil">
        <button onClick={handleClick}>
          <FontAwesomeIcon className="fa-icon" icon={faPencilAlt} />
        </button>
      </div>
    </div>
  );
}

export default ComponentName;