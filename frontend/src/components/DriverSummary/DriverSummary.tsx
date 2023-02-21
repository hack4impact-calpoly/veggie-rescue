import React from 'react';
import "./DriverSummary.css"
// import { Input } from '@syncfusion/ej2-inputs';
// import * as ReactDOM from "react-dom";

function DriverSummary() {
  return <div className = "all-page">
      <p className = "punchOutHeader">Punch Out</p>
      <p className = "goodbyeMessage">Bye Diana!</p>
      <p className = "summary">Today's Summary</p>

      <div className = "weight-container"> 
        <p className = "weight">100</p>
        <p className = "units">lbs</p>
      </div>

      <h3 className = "droppedOff">Dropped off</h3>

      {/* info about input: https://reactjs.org/docs/forms.html */}
      <p className = "discrepancy">
        Discrepancies
        <label >
          {/* <input type="text" discrepancy-container="discrepancy-container" /> */}
            <textarea className = "discrepancy-container">
            The Los Alamos Foundation
            </textarea>
        </label>
      </p>

      <button className = "signOutButton">Sign Out</button>

  </div>

}

// class Default extends React.Component {
//   input1;
//   render() {
//       return (<div className="inner-container">
//               <input id="input-01" type="text" ref={e1 => this.input1 = e1}/>
//           </div>);
//   }
//   componentDidMount() {
//       Input.createInput({
//           element: this.input1,
//           properties: {
//               placeholder: 'Discrepancies'
//           }
//       });
//   }
// }
// ReactDOM.render(<Default />, document.getElementById('input-container'));

export default DriverSummary;
