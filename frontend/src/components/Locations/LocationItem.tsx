interface Locale {
  name: string;
  LocationType: string;
  EntityType: string;
  FoodType: string;
  CombinedAreaName: string;
  _id: string;
}

interface Props {
  location: Locale;
  setCurrent: Function;
  clearFilter: Function;
}

function LocationItem({ location, setCurrent, clearFilter }: Props) {
  // Deconstruct location prop and get location name.
  const { name } = location;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className="flex items-center justify-center
      bg-white text-4xl font-medium py-7 my-4 drop-shadow-xl rounded-lg
      transform active:translate-y-2"
      onClick={() => {
        setCurrent(location);
        clearFilter();
      }}
    >
      <h3>{name}</h3>
    </div>
  );
}

export default LocationItem;
