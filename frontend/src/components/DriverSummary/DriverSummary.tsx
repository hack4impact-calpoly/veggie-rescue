import './DriverSummary.css';
import NavBarButton_DARK from '../../imgs/button_dark_left.svg';

function DriverSummary() {
  return (
    <div className="container p-2">
      <div className="flex flex-row mx-3 mt-16 mb-7 md:text-5xl  text-3xl font-semibold text-lime-900 md:w-3/5 w-5/6">
        <button
          className="items-center justify-center "
          id="icon"
          type="button"
          // onClick={backFunc}
        >
          <img className="h-16" src={NavBarButton_DARK} alt="leftButton" />
        </button>
        <div className="flex">
          {/* <span className="capitalize">{name}</span> */}
          <span>Bye Diana!</span>
        </div>
      </div>

      {/* <h1 className="goodbyeMessage"> Bye Diana! </h1> */}
      <h2 className="summary"> Today&apos;s Summary </h2>

      {/* Get Clock in/Clock Out */}

      <div className="weight-container">
        <p className="weight"> 100</p>
        <p className="units">lbs</p>
      </div>

      <h3 className="droppedOff">Dropped off</h3>

      <h4 className="discrepancy">Discrepancies </h4>

      <form>
        <textarea
          className="discrepancy-container"
          id="discrepancies"
          placeholder="Los Alamos Foundation"
        />
      </form>

      <button type="button" className="signOutButton">
        {' '}
        Sign Out{' '}
      </button>
    </div>
  );
}

export default DriverSummary;
