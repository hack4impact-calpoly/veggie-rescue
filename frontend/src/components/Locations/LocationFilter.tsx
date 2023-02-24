import React, { useEffect, useRef } from 'react';

interface Locale {
  name: string;
  LocationType: string;
  EntityType: string;
  FoodType: string;
  DemographicName: string;

  CombinedAreaName: string;
  _id: string;
}

interface Props {
  filterLocations: Function;
  // eslint-disable-next-line react/require-default-props
  filtered?: Locale[];
  clearFilter: Function;
  clearCurrent: Function;
}

type LocationObject = React.ChangeEvent<HTMLInputElement>;

function LocationFilter({
  filterLocations,
  filtered,
  clearFilter,
  clearCurrent
}: Props) {
  const text = useRef('');

  // On load set text to '' if filtered === null
  useEffect(() => {
    if (filtered === null) {
      text.current = '';
    }
  });

  // If text field is not empty, clear the current object and filter by the given text.  Otherwise, if text field is empty clear the filter array
  const onChange = (e: LocationObject) => {
    const currentText = (
      document.getElementById('filter-text') as HTMLInputElement
    ).value;
    if (currentText !== '') {
      clearCurrent();
      filterLocations(e.target.value);
    } else {
      clearFilter();
    }
  };

  // Display the text field only
  return (
    <div className="">
      <form className="bg-gray-100 border-2 border-grey-300 text-4xl w-full px-5 py-7 mt-6 shadow-inner">
        <input
          className="bg-gray-100 text-grey-800 italic transform focus:outline-none"
          id="filter-text"
          type="text"
          placeholder="Filter Locations..."
          onChange={onChange}
        />
      </form>
    </div>
  );
}

export default LocationFilter;
