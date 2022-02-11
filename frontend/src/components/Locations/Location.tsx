import { useState } from "react";
import { pickupSchema } from "./dbMock"; //import data from dbMock
import LocationsFilter from "./LocationsFilter";
import LocationsForm from "./LocationsForm";
import Locations from "./Location";
import { useEffect } from "react";

function Location() {
  // Elements we will keep in local state and pass back and forth to components
  const [locations] = useState(pickupSchema);
  const [current, setCurrent] = useState(null);
  const [filtered, setFiltered] = useState(null);
  const [createNew, setCreateNew] = useState(false);

  // This will create a temp copy of current location which will eventually be the item stored in vehicle database
  const [savedLocation, setLocation] = useState(null);

  // Empties the filtered array called in:
  const clearFilter = () => {
    setFiltered(null);
  };
  // Clears the current object called in:
  const clearCurrent = (e) => {
    setCurrent(null);
    setCreateNew(false);
  };
  // Uses array of locations and filters based on input into LocationsFilter text area.
  const filterLocations = (element) => {
    setFiltered(
      locations.filter((loc) => {
        const regex = new RegExp(`${element}`, "gi");
        return loc.name.match(regex);
      })
    );
  };

  //this is what we will use to send new object to API
  useEffect(() => {
    if (savedLocation !== null) {
      
      console.log(savedLocation);
    }
  }, [savedLocation]);

  // We display the location filter, followed by the locations returned from filter results.  If there is a current location in state, then we display LocationsForm component
  // otherwise it will not be displayed
  return (
    <div className="flex flex-col">
      <LocationsFilter
        filtered={filtered}
        clearFilter={clearFilter}
        filterLocations={filterLocations}
        clearCurrent={clearCurrent}
      />

      <Locations
        filtered={filtered}
        locations={locations}
        setCurrent={setCurrent}
        current={current}
        clearFilter={clearFilter}
        setCreateNew={setCreateNew}
      />
      {current && (
        <LocationsForm
          current={current}
          clearCurrent={clearCurrent}
          createNew={createNew}
          setLocation={setLocation}
          savedLocation={savedLocation}
        />
      )}
    </div>
  );
}

export default Location;