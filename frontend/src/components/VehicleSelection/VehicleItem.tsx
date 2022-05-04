function VehicleItem({ car, onClick }: { car: any; onClick: any, key: number}) {
  const { img } = car;
  const { name } = car;

  return (
    <button  onClick={() => onClick(car._id)}>
      <div className="bg-[#F0F9F1] font-semibold text-xl">{name}</div>
      <img
        className="w-full h-full rounded-3xl"
        src="https://icones.pro/wp-content/uploads/2021/03/icone-de-voiture-symbole-png-verte.png"
        alt="a vehicle"
      />
    </button>
  );
}

export default VehicleItem;
