import { RiDeleteBack2Line } from 'react-icons/ri';
import './NumPad.css';

type Props = {
  buttonHandler: (butVal: string) => void;
  clearHandler: () => void;
  backSpaceHandler: () => void;
};

function NumPad({ buttonHandler, clearHandler, backSpaceHandler }: Props) {
  const clickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const targetValue = event.currentTarget.value;
    buttonHandler(targetValue);
  };
  return (
    <div className="grid grid-cols-3  gap-5 pt-4 ">
      <div>
        <button
          className="grid-btn "
          onClick={clickHandler}
          type="submit"
          value="1"
        >
          1
        </button>
      </div>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="2"
      >
        2
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="3"
      >
        3
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="4"
      >
        4
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="5"
      >
        5
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="6"
      >
        6
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="7"
      >
        7
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="8"
      >
        8
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="9"
      >
        9
      </button>
      <button
        className="grid-btn-submit delete"
        onClick={clearHandler}
        type="submit"
        value="del"
      >
        :)
      </button>
      <button
        className="grid-btn"
        onClick={clickHandler}
        type="submit"
        value="0"
      >
        0
      </button>
      <button
        className="grid-btn-submit icon"
        onClick={backSpaceHandler}
        type="submit"
        value="submit"
      >
        <RiDeleteBack2Line />
      </button>
    </div>
  );
}

export default NumPad;
