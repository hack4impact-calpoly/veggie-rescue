/* eslint-disable no-nested-ternary */
import { useState } from 'react';
import { toast } from 'react-toastify';

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
  Area: String;
  foodAllocation: Map<String, number>;
}

interface Props {
  current: Locale;
  createNew: boolean;
  setLocation: Function;
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setPickupDeliveryObject: Function;
  setForceNext: Function;
}

interface CheckedItem {
  isChecked: boolean;
  value: string;
}

interface Items {
  [key: string]: CheckedItem;
}

/* will come from API call later */
const foodTypes = ['Produce', 'Baked Goods', 'Prepared', 'Other'];

function LocationForm({
  current,
  createNew,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocation,
  PickupDeliveryObject,
  setPickupDeliveryObject,
  setForceNext
}: Props) {
  // State for if user is adding a new location
  // const [donorName, setName] = useState('');
  // const [donorLocationType, setDonorLocationType] = useState('');
  // const [donorEntityType, setDonorEntityType] = useState('');
  // const [food, setFoodType] = useState('');

  const [items, setItems] = useState<Items>({});

  const handleCheckboxChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, checked } = event.currentTarget;
    setItems((prevState) => ({
      ...prevState,
      [name]: { isChecked: checked, value: prevState[name]?.value || '' }
    }));
  };

  const handleTextChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setItems((prevState) => ({
      ...prevState,
      [name]: { ...prevState[name], value }
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // remove 'other' as a value from the list
    const newItems: Items = Object.entries(items).reduce((acc, [key, val]) => {
      // if OtherAmount is specified, it holds the weight of 'Other' -- create an entry for 'Other' with its food type
      if (key === 'OtherAmount') {
        acc[items.Other.value] = {
          isChecked: items.Other.isChecked,
          value: items.OtherAmount.value
        };
        // means no weight was specified for 'Other' -- force failure
      } else if (key === 'Other' && !items.OtherAmount) {
        acc[items.Other.value] = {
          isChecked: val.isChecked,
          value: -10
        };
        // add all other items
      } else if (key !== 'OtherAmount' && key !== 'Other' && key !== '') {
        acc[key] = val;
      }
      return acc;
    }, {});
    const areAllFilled =
      Object.entries(newItems).filter(([itemName, item]) => {
        if (item.isChecked && item.value === undefined) {
          return true;
        }
        if (
          item.isChecked &&
          (parseInt(item.value, 10) <= 0 ||
            Number.isNaN(parseInt(item.value, 10)))
        ) {
          return true;
        }
        if (
          item.isChecked &&
          item.value.trim().length === 0 &&
          itemName === 'Other'
        ) {
          return true;
        }
        return false;
      }).length === 0;
    if (areAllFilled) {
      const foodWeights = Object.keys(newItems).reduce((acc, curr) => {
        // only add items that are checked
        if (newItems[curr].isChecked) {
          acc[curr] = newItems[curr].value;
        }
        return acc;
      }, {}); // make 'items' same type as foodType: Map<String, number>
      console.log('Form submitted with', foodWeights);
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        id: current._id,
        name: current.name,
        EntityType: current.EntityType,
        LocationType: current.LocationType,
        Demographic: current.DemographicName,
        FoodAllocation: foodWeights,
        Area: current.CombinedAreaName
      });
      const foodStrings = Object.entries(foodWeights).map(
        ([key, value]) => `${key}: ${value}lbs`
      );

      const foodsString = foodStrings.join(', ');

      // Use the itemsString in a template literal to print the desired message
      toast.success(`Form submitted with: ${foodsString}`);
      setForceNext(true);
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const { name } = current;

  //     if (createNew === false) {
  //       setPickupDeliveryObject({
  //         ...PickupDeliveryObject,
  //         id: current._id,
  //         name: current.name,
  //         EntityType: current.EntityType,
  //         LocationType: current.LocationType,
  //         Demographic: current.DemographicName,
  //         FoodAllocation: foodWeights,
  //         Area: current.CombinedAreaName
  //       });
  //       setForceNext(true);
  //     } else if (createNew === true) {
  //       setPickupDeliveryObject({
  //         ...PickupDeliveryObject,
  //         // id : ID?,
  //         name: donorName,
  //         EntityType: donorEntityType,
  //         LocationType: donorLocationType,
  //         Demographic: demographic,
  //         FoodAllocation: foodWeights,
  //         Area: area
  //       });

  return (
    <form
      onSubmit={handleSubmit}
      className="Form-main m-5 mb-10 flex justify-center flex-col"
    >
      <h2 className="text-4xl font-semibold mt-10 flex flex-start">
        {createNew
          ? 'Enter New Location:'
          : PickupDeliveryObject.pickupOrDelivery === 1
          ? 'Pickup Location:'
          : 'Dropoff Location:'}
      </h2>
      {/* {createNew ? (
        PickupDeliveryObject.pickupOrDelivery === 1 ? (
          <div className="text-4xl flex justify-center items-center grid grid-col gap-5">
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Donor name"
              name="name"
              onChange={(e: { target: { value: any } }) =>
                setName(e.target.value)
              }
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Donor Location Type"
              name="location"
              onChange={(e: { target: { value: any } }) =>
                setDonorLocationType(e.target.value)
              }
            />

            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e: { target: { value: any } }) =>
                setDonorEntityType(e.target.value)
              }
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Food Types"
              name="type"
              onChange={(e: { target: { value: any } }) =>
                setFoodType(e.target.value)
              }
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e: { target: { value: any } }) =>
                setArea(e.target.value)
              }
            />
          </div>
        ) : (
          <div className="newLocation">
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Recipient name"
              name="name"
              onChange={(e: { target: { value: any } }) =>
                setName(e.target.value)
              }
            />

            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e: { target: { value: any } }) =>
                setDonorEntityType(e.target.value)
              }
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Food Types"
              name="type"
              onChange={(e: { target: { value: any } }) =>
                setFoodType(e.target.value)
              }
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Demographic"
              name="location"
              onChange={(e: { target: { value: any } }) =>
                setDemographic(e.target.value)
              }
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e: { target: { value: any } }) =>
                setArea(e.target.value)
              }
            />
          </div>
        )
      ) : ( */}
      <div className="existingLocation">
        <input
          className="bg-white text-4xl w-full italic py-4 px-4 mt-3 rounded-lg shadow w-full text-left"
          type="text"
          placeholder={name}
          name="name"
          disabled
        />
        <div className="text-4xl font-semibold text-left pt-10">Food type:</div>
        <div className="text-3xl text-left ml-20 m-4 py-4">
          {current &&
            foodTypes.map((foodType) => (
              <div className="flex items-center mb-4" key={foodType}>
                <label
                  htmlFor={`${foodType}-checkbox`}
                  className="flex items-center cursor-pointer text-3xl"
                >
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 w-8 h-8 inline-block mr-2 bg-white border border-grey flex-no-shrink"
                    id={`${foodType}-checkbox`}
                    type="checkbox"
                    name={foodType}
                    value={foodType}
                    checked={items[foodType]?.isChecked || false}
                    onChange={handleCheckboxChange}
                  />
                  {foodType}
                </label>
                {items[foodType]?.isChecked && foodType !== 'Other' && (
                  <input
                    className="bg-white ml-2 text-2xl w-20 h-10 italic py-4 px-4 rounded-lg shadow text-left"
                    type="number"
                    name={foodType}
                    value={items[foodType]?.value || ''}
                    onChange={handleTextChange}
                    placeholder="lbs"
                  />
                )}
                {items[foodType]?.isChecked && foodType === 'Other' && (
                  <div>
                    <input
                      className="bg-white ml-2 text-2xl w-20 h-10 italic py-4 px-4 mt-2 rounded-lg shadow text-left"
                      placeholder="lbs"
                      type="number"
                      name={`${foodType}Amount`}
                      value={items[`${foodType}Amount`]?.value || ''}
                      onChange={handleTextChange}
                    />
                    <div className="flex items-center justify-center mt-2">
                      <input
                        className="bg-white ml-2 text-4xl w-full italic py-4 px-4 rounded-lg shadow w-full text-left"
                        type="text"
                        placeholder="Food Type"
                        name={foodType}
                        value={items[foodType]?.value || ''}
                        onChange={handleTextChange}
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
      {/* )} */}

      <div>
        <button
          type="submit"
          className="bg-amber-500 rounded-full w-full mt-5 p-3 text-3xl text-white font-semibold shadow"
        >
          Continue
        </button>
      </div>
    </form>
  );
}

export default LocationForm;
