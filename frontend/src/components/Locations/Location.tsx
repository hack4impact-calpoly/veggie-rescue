import { useState } from "react";
import { pickupSchema } from "./dbMock"; //import data from dbMock
import LocationFilter from "./LocationFilter";
import LocationForm from "./LocationForm";
import Locations from "./Locations";
import { useEffect } from "react";

interface locale {
  name: string,
  donorLocationType: string,
  donorEntityType: string,
  foodType: string[],
  area: string,
  id: string,
}

function Location() {
  // Elements we will keep in local state and pass back and forth to components
  const [locations] = useState(pickupSchema);
  const [current, setCurrent] = useState< undefined | locale>();
  const [filtered, setFiltered] = useState<undefined | locale[]>();
  const [createNew, setCreateNew] = useState(false);

  // This will create a temp copy of current location which will eventually be the item stored in vehicle database
  const [savedLocation, setLocation] = useState<undefined | locale>();

  // Empties the filtered array called in:
  const clearFilter = () => {
    setFiltered(undefined);
  };
  // Clears the current object called in:
  const clearCurrent = () => {
    setCurrent(undefined);
    setCreateNew(false);
  };

  // Uses array of locations and filters based on input into LocationFilter text area.
  const filterLocations = (element : string) => {
    const filtered : locale[] = locations.filter((loc : locale) => {
                const regex = new RegExp(`${element}`, "gi");
                return loc.name.match(regex);
              });
    console.log(filtered);
    setFiltered(filtered);
  };

  //this is what we will use to send new object to API
  useEffect(() => {
    if (savedLocation !== null) {
      console.log(savedLocation);
    }
  }, [savedLocation]);

  // We display the location filter, followed by the locations returned from filter results.  If there is a current location in state, then we display LocationForm component
  // otherwise it will not be displayed
  return (
    <div className="flex flex-col">
      <LocationFilter
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
        <LocationForm
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