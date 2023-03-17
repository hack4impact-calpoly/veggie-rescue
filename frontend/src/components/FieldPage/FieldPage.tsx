import React, { useLayoutEffect, useState } from 'react';
import './FieldPage.css';

const FieldPage = (props: any) => {
  const sendData = () =>{
    props.handleShow()
    props.fieldHandler(props.field)
  }
  return(
    <button onClick={sendData} >
    <div className="volunteer-card ">
      <h3 className="volunteer-text">{ props.field.name }</h3>
    </div>
    </button>
  );
}

export default FieldPage;