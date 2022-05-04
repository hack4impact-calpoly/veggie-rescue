import React from 'react'
import './Transfering.css';

type Props = {}

const TransferElement = ({vehicle, index, handleUpdate}: any) => {
  return (
    <>
    <input type="number"  min="0" placeholder = '0' className="numPounds" onChange={(e: any) => handleUpdate(index, +e.target.value)}/>
    <div className="vehicleName" key={index} >{vehicle.name}</div>
    </>
  )
}

export default TransferElement
