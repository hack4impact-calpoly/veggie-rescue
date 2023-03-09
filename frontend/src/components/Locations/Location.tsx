import { useState, useEffect } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { pickupSchema } from './dbMock'; // import data from dbMock
import LocationFilter from './LocationFilter';
// import LocationForm from './LocationForm'; // removed as of issue 152
import Locations from './Locations';

import Spinner from '../Spinner/Spinner';

import './Location.css';
import { getDonors } from '../../features/donors/donorSlice';
import { getRecipients } from '../../features/recipients/recipientsSlice';

interface Locale {
  name: string;
  LocationType: string;
  EntityType: string;
  FoodType: string;
  DemographicName: string;

  CombinedAreaName: string;
  _id: string;
}

interface PickupDeliveryObjectSchema {
  pickupOrDelivery: number;
  id: String;
  date: String;
  driver: String;
  vehicle: String;
  name: String;
  EntityType: String;
  LocationType: String;
  Demographic: String;
  FoodType: String;
  Area: String;
  lbsDroppedOff: number;
}

interface Props {
  setPickupDeliveryObject: Function;
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setForceNext: Function;
}

function Location({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setPickupDeliveryObject,
  PickupDeliveryObject,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setForceNext
}: Props) {
  // Elements we will keep in local state and pass back and forth to components
  const [locations, setLocations] = useState([]);
  const [current, setCurrent] = useState<undefined | Locale>();
  const [filtered, setFiltered] = useState<undefined | Locale[]>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [createNew, setCreateNew] = useState(false);
  const dispatch = useAppDispatch();

  // Get the donors object from the store
  const {
    donors,
    isLoading: donorLoading,
    isSuccess: donorSuccess
  } = useAppSelector((state) => state.donors);
  const {
    recipients,
    isLoading: recipientLoading,
    isSuccess: recipientSuccess
  } = useAppSelector((state) => state.recipients);

  useEffect(() => {
    if (PickupDeliveryObject.pickupOrDelivery === 1 && donors.length === 0) {
      dispatch(getDonors());
    } else if (
      PickupDeliveryObject.pickupOrDelivery === 2 &&
      recipients.length === 0
    ) {
      dispatch(getRecipients());
    }
    if (PickupDeliveryObject.pickupOrDelivery === 1 && donorSuccess) {
      setLocations(donors);
    } else if (
      PickupDeliveryObject.pickupOrDelivery === 2 &&
      recipientSuccess
    ) {
      setLocations(recipients);
    }
  }, [
    PickupDeliveryObject.pickupOrDelivery,
    dispatch,
    donorSuccess,
    donors,
    donors.length,
    recipientSuccess,
    recipients,
    recipients.length
  ]);
  // This will create a temp copy of current location which will eventually be the item stored in vehicle database
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [savedLocation, setLocation] = useState<undefined | Locale>();

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
  const filterLocations = (element: string) => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const filtered: Locale[] = locations.filter((loc: Locale) => {
      const regex = new RegExp(`${element}`, 'gi');
      return loc.name.match(regex);
    });
    setFiltered(filtered);
  };
  if (donorLoading || recipientLoading) {
    return <Spinner />;
  }
  // We display the location filter, followed by the locations returned from filter results.  If there is a current location in state, then we display LocationForm component
  // otherwise it will not be displayed
  return (
    <div className="">
      {!current && (
        <LocationFilter
          filtered={filtered}
          clearFilter={clearFilter}
          filterLocations={filterLocations}
          clearCurrent={clearCurrent}
        />
      )}

      <Locations
        filtered={filtered}
        locations={locations}
        setCurrent={setCurrent}
        current={current}
        clearFilter={clearFilter}
        setCreateNew={setCreateNew}
      />
      {/* removed as of issue 152
      {current && (
        <LocationForm
          current={current}
          createNew={createNew}
          setLocation={setLocation}
          setForceNext={setForceNext}
          PickupDeliveryObject={PickupDeliveryObject}
          setPickupDeliveryObject={setPickupDeliveryObject}
        />
      )} */}
    </div>
  );
}

export default Location;
