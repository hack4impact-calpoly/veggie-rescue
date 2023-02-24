import './DonorsCard.css';

function DonorsCard(props: any) {
  const { donor, handleShow, donorHandler } = props;
  const sendData = () => {
    console.log(donor);
    handleShow();
    donorHandler(donor);
  };
  return (
    <button type="submit" onClick={sendData}>
      <div className="donors-card">
        <div className="donor-name">{donor.name}</div>
        <div className="entry-container">
          <div className="donors-entry">
            <div className="donors-entry-title">Entity Type</div>
            <div className="donors-entry-text">{donor.EntityType}</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Location Type</div>
            <div className="donors-entry-text">{donor.LocationType}</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Combined Area Name</div>
            <div className="donors-entry-text">{donor.CombinedAreaName}</div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default DonorsCard;
