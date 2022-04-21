import React from 'react'
import { handleInputChange } from 'react-select/dist/declarations/src/utils'



function TransferringElement({ v, idx, selectVehicle, checkedState}: { v : string, idx : number, selectVehicle :  (e : number, s : string) => void, checkedState : boolean []}) {

  return (
    <div className='flex flex-row items-center'>
            {/* We can make input at a later date.  Just trying to get it to work for now*/}
            {/* <input type="text" className="numPounds"/> */}
    <input
            type="checkbox"
            name={v}
            value={idx}
            id={v}
            onChange={()=>selectVehicle(idx, v)}
            checked={checkedState[idx]} />
    <div className="vehicleName ">{v}</div>
    </div>
  )
}

export default TransferringElement