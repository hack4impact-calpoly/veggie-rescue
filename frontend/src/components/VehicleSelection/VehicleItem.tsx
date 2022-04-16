function VehicleItem({ car, onClick }: { car: Vehicle; onClick: (e : string) => void}) {
  const { img } = car;
  const { name } = car;

  return (
    <button onClick={() => onClick(car._id)}>
      <div className="bg-[#F0F9F1] font-semibold text-xl">{name}</div>
      <img className="w-full h-full rounded-3xl" src={img} alt="a vehicle" />
    </button>
  );
}

export default VehicleItem;

// Interface for vehicles object
interface Vehicle {
  _id: string;
  driver: string;
  name: string;
  isLoggedIn: boolean;
  img: string;
  currentPickups: locale[];
  currentDropoffs: locale[];
  totalWeight: number;
}
interface locale {
  name: string;
  donorLocationType: string;
  donorEntityType: string;
  foodType: string[];
  area: string;
  id: string;
}