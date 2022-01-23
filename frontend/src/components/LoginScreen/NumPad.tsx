type Props = {
  buttonHandler: (butVal: string) => void;
  clearHandler: () => void;
  submitHandler: () => void;
};

function NumPad({ buttonHandler, clearHandler, submitHandler }: Props) {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const targetValue = event.currentTarget.value;
    buttonHandler(targetValue);
  };

  return (
    <>
      <div className="grid-container">
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="1">
            1
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="2">
            2
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="3">
            3
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="4">
            4
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="5">
            5
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="6">
            6
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="7">
            7
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="8">
            8
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="9">
            9
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clearHandler} value="del">
            :)
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={clickHandler} value="0">
            0
          </button>
        </div>
        <div className="grid-item">
          <button className="grid-btn" onClick={submitHandler} value="submit">
            X
          </button>
        </div>
      </div>
    </>
  );
}

export default NumPad;
