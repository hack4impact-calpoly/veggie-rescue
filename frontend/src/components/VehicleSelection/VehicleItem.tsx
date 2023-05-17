function VehicleItem({
  car,
  onClick,
  index
}: {
  car: any;
  onClick: any;
  index: any;
}) {
  const { name } = car;

  return (
    <div>
      <button
        type="submit"
        className="transform active:translate-y-2 px-1"
        key={index}
        onClick={() => onClick(car._id)}
      >
        <div className="font-semibold text-xl mt-3 mx-2">{name}</div>
        <img
          className="w-full h-full rounded-3xl"
          src="https://icones.pro/wp-content/uploads/2021/03/icone-de-voiture-symbole-png-verte.png"
          alt="a vehicle"
        />
      </button>
    </div>
  );
}

export default VehicleItem;
