/* eslint-disable react/require-default-props */
import { useEffect } from 'react';

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
  setCreateNew?: Function;
  isNew?: boolean;
}

function LocationItem({
  location,
  setCurrent,
  clearFilter,
  setCreateNew,
  isNew
}: Props) {
  // Deconstruct location prop and get location name.
  const { name } = location;
  useEffect(() => {
    if (isNew && setCreateNew !== undefined) {
      setCreateNew(true);
    }
  });

  //  The button expands to fit the enter div... on click setCurrent function is called and passed up to Location state.
  //  Filter is cleared so it isn't displayed below the text field.

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
