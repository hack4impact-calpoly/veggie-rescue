import "./Spinner.css";

import React from 'react'

type Props = {}

function Spinner({}: Props) {
  return (
    <div className="loadingSpinnerContainer">
      <div className="loadingSpinner"></div>
    </div>
  )
}

export default Spinner