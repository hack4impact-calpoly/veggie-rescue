import React from 'react';
import './Dashboard.css';
import { FaPencilAlt, FaClipboardList, FaHandPaper } from 'react-icons/fa';

import { useNavigate } from 'react-router-dom';

const name = 'Diana';
const weight = '1,234';

const Dashboard = () => {

  const navigate = useNavigate();

  function handleClick(button: Number){
    switch (button) {
      case 0:
        navigate('/NewLog')
        break;
      case 1:
        navigate('/UserLogs')
        break;
      case 2:
        {/* Need to implement transfer logic as specified in PR*/}
        break;
    
      default:
        break;
    }
  }

  return (
    <div className="container bgimg">
      <div className="greeting-box" >
        <div className="greeting">
          <h2>Hi {name}!</h2>
        </div>
      </div>

      <div className="weight">
        <div className="current-weight">
          <h3>Current Weight</h3>
        </div>
        <div className="lbs">
          <h2>{weight} lbs</h2>
        </div>
      </div>

      <div className="action">
        <button onClick={() => handleClick(0)}>
          <div className="action-item">
          <FaPencilAlt className="fa-icon" />
          <div>Start a Log</div>
          </div>
        </button>
        <button onClick={() => handleClick(1)}>
          <div className="action-item">
          <FaClipboardList className="fa-icon"  />
          <div>View All Logs</div>
          </div>
        </button>
        <div id="bottom-button">
          <button onClick={() => handleClick(2)}>
            <div className="action-item">
            <FaHandPaper className="fa-icon" />
            <div>Punch Out</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;