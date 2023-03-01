import './Transfering.css';

const checkInput = (e: any) => {
  if (e.keyCode === 189) {
    e.preventDefault();
  }
};

function TransferElement({ vehicle, index, handleUpdate }: any) {
  return (
    <>
      <input
        onKeyDown={(e: any) => checkInput(e)}
        type="number"
        min="0"
        placeholder="0"
        className="bg-white py-4 w-1/6 text-3xl text-left pl-3 rounded-lg shadow-lg my-2"
        onChange={(e: any) => {
          handleUpdate(index, +e.target.value);
        }}
      />
      <div
        className="flex flex-row items-center text-4xl font-semibold text-gray-700 pl-8"
        key={index}
      >
        {vehicle.name}
      </div>
    </>
  );
}

export default TransferElement;
