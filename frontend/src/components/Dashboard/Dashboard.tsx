import React from 'react';
import './Dashboard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faClipboardList, faHandPaper } from '@fortawesome/free-solid-svg-icons';

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
    <div className="container">
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
          <FontAwesomeIcon className="fa-icon" icon={faPencilAlt} />
          <div>Start a Log</div>
          </div>
        </button>
        <button onClick={() => handleClick(1)}>
          <div className="action-item">
          <FontAwesomeIcon className="fa-icon" icon={faClipboardList} />
          <div>View All Logs</div>
          </div>
        </button>
        <div id="bottom-button">
          <button onClick={() => handleClick(2)}>
            <div className="action-item">
            <FontAwesomeIcon className="fa-icon" icon={faHandPaper} />
            <div>Punch Out</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;