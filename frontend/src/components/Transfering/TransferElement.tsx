import React from 'react'
import './Transfering.css';

type Props = {}

const TransferElement = ({vehicle, index, handleUpdate}: any) => {
  return (
    <>
    <input type="number"  min="0" placeholder = '0' className="bg-white py-4 w-1/6 text-3xl text-left pl-3 rounded-lg shadow-lg my-2" onChange={(e: any) => handleUpdate(index, +e.target.value)}/>
    <div className="flex flex-row items-center text-4xl font-semibold text-gray-700 pl-8" key={index} >{vehicle.name}</div>
    </>
  )
}

export default TransferElement
