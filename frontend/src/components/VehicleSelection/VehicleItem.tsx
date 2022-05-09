function VehicleItem({ car, onClick, index }  : { car: any; onClick: any; index: any}) {
  const { img } = car;
  const { name } = car;

  return (
    <div>
    <button key={index}  onClick={() => onClick(car._id)}>
      <div className="bg-[#F0F9F1] font-semibold text-xl">{name}</div>
      <img
        className="w-full h-full rounded-3xl"
        src="https://icones.pro/wp-content/uploads/2021/03/icone-de-voiture-symbole-png-verte.png"
        alt="a vehicle"
      />
    </button></div>
  );
}

export default VehicleItem;
