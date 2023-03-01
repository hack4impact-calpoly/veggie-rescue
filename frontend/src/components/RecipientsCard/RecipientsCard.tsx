import './RecipientsCard.css';

function RecipientsCard(props: any) {
  const { recipient, handleShow, recipientHandler } = props;
  const sendData = () => {
    console.log(recipient);
    handleShow();
    recipientHandler(recipient);
  };
  return (
    <button type="submit" onClick={sendData}>
      <div className="donors-card">
        <div className="donor-name">{recipient.name}</div>
        <div className="entry-container">
          <div className="donors-entry">
            <div className="donors-entry-title">Organizational Structure</div>
            <div className="donors-entry-text">{recipient.EntityType}</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Demographics Served</div>
            <div className="donors-entry-text">{recipient.DemographicName}</div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Combined Area Name</div>
            <div className="donors-entry-text">
              {recipient.CombinedAreaName}
            </div>
          </div>
          <div className="donors-entry">
            <div className="donors-entry-title">Food Distribution Model</div>
            <div className="donors-entry-text">change to use props</div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default RecipientsCard;
