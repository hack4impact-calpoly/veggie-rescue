import LocationItem from './LocationItem';

// The goal of this component is to map through either the filtered array OR the location array and display the individual elements as LocationItems

interface Locale {
  name: string;
  LocationType: string;
  EntityType: string;
  FoodType: string;
  CombinedAreaName: string;
  DemographicName: string;
  _id: string;
}

interface Props {
  locations: Locale[];
  // eslint-disable-next-line react/require-default-props
  current?: Locale;
  // eslint-disable-next-line react/require-default-props
  filtered?: Locale[];
  setCurrent: Function;
  clearFilter: Function;
}

function Locations({
  locations,
  current,
  filtered,
  setCurrent,
  clearFilter
}: Props) {
  // If locations array is empty... we have nothing in our database
  if (locations !== null && locations.length === 0) {
    return <h4>Please add a location</h4>;
  }

  // 1. First we check if current object is null... if so then we will be displaying elements in either filtered or locations array.
  // if not, it means that we have already selected a location as current location and it is being displayed.
  // 2. If filtered isn't null, that means we have a filtered array and will display that, otherwise we will display a few elements from the locations array
  // we use .slice(0,6) to display as many elements as we would like
  // 3. Assuming that filtered isn't null, we check if length of filtered array is greater than 0.  If so we display a constrained amount of results.
  // VVV REMOVED AS OF 152 VVV
  // if the filtered array is 0, that means our typing didn't return any results so an option to create a new location is presented to user.
  // we setCreateNew(true) so that an option to input a new location is given in root
  return (
    <div className="">
      {current === undefined && (
        <div>
          {filtered !== undefined
            ? filtered
                .slice(0, 3)
                .map((location: Locale) => (
                  <LocationItem
                    location={location}
                    key={location._id}
                    setCurrent={setCurrent}
                    clearFilter={clearFilter}
                  />
                ))
            : locations
                .slice(0, 6)
                .map((location: Locale) => (
                  <LocationItem
                    location={location}
                    key={location._id}
                    setCurrent={setCurrent}
                    clearFilter={clearFilter}
                  />
                ))}
        </div>
      )}
    </div>
  );
}

export default Locations;
