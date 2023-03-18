import './FieldPage.css';

function FieldPage(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { index, field, handleShow, fieldHandler } = props;

  const sendData = () => {
    handleShow();
    fieldHandler(field);
  };
  return (
    <button type="submit" onClick={sendData}>
      <div className="volunteer-card ">
        <h3 className="volunteer-text">{field}</h3>
      </div>
    </button>
  );
}

export default FieldPage;
