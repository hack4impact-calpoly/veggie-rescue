import './DriverSummary.css';
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';

function DriverSummary() {
  return (
    <div className="full-page">
      <div className="header">
        <button
          className="back-button"
          id="icon"
          type="button"
          // onClick={backFunc}
        >
          <img className="h-16" src={NavBarButton_DARK} alt="leftButton" />
        </button>
        <h1> Bye Diana! </h1>
      </div>

      <h2 className="summary-title"> Today&apos;s Summary </h2>

      {/* Add clock in/clock Out */}

      <div className="summaries">
        <div className="summary">
          <div className="weight-container">
            <p className="weight"> 100</p>
            <p className="units">lbs</p>
          </div>

          <h3>Dropped off</h3>
        </div>

        <div className="summary">
          <div className="weight-container">
            <p className="weight"> 50</p>
            <p className="units">lbs</p>
          </div>

          <h3>Picked up</h3>
        </div>

        <div className="summary">
          <div className="weight-container">
            <p className="weight"> 50</p>
            <p className="units">lbs</p>
          </div>

          <h3>Left in Vehicle</h3>
        </div>
      </div>

      {/* Add confirmation/error checking functionality */}

      <button type="button" className="confirm-button">
        Confirm Punch Out
      </button>
    </div>
  );
}

export default DriverSummary;
