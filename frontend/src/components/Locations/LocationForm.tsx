/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { getFields } from '../../features/fields/fieldSlice';

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
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setPickupDeliveryObject: Function;
  setDoneFlag: Function;
}

interface CheckedItem {
  isChecked: boolean;
  value: string;
}

interface Items {
  [key: string]: CheckedItem;
}

function LocationForm({
  current,
  PickupDeliveryObject,
  setPickupDeliveryObject,
  setDoneFlag
}: Props) {
  const [items, setItems] = useState<Items>({});

  const dispatch = useAppDispatch();

  const { vehicle } = useAppSelector((state) => state.vehicle);
  const { fields } = useAppSelector((state) => state.fields);

  function getFoodTypes() {
    // pickup, show all food types
    if (PickupDeliveryObject.pickupOrDelivery === 1) {
      return [...fields.FoodType, 'Other'];
    }
    // dropoff, only show what's in vehicle
    return Array.from(Object.keys(vehicle.totalFoodAllocation));
  }

  useEffect(() => {
    dispatch(getFields());
  }, [dispatch]);

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
    const newItems: Items = Object.entries(items).reduce(
      (acc: Items, [key, val]) => {
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
            value: '-10'
          };
          // add all other items
        } else if (key !== 'OtherAmount' && key !== 'Other' && key !== '') {
          acc[key] = val;
        }
        return acc;
      },
      {}
    );

    const allAreValid =
      Object.entries(newItems).filter(([itemName, item]) => {
        if (
          item.isChecked &&
          (parseInt(item.value, 10) <= 0 ||
            Number.isNaN(parseInt(item.value, 10)) ||
            item.value === undefined ||
            itemName.trim().length === 0)
        ) {
          return true;
        }
        return false;
      }).length === 0;

    if (allAreValid) {
      const foodWeights = Object.keys(newItems).reduce(
        (acc: { [key: string]: number }, curr) => {
          // only add items that are checked
          if (newItems[curr].isChecked) {
            acc[curr] = parseInt(newItems[curr].value, 10);
          }
          return acc;
        },
        {}
      ); // make 'items' same type as foodType: Map<String, number>
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        id: current._id,
        name: current.name,
        EntityType: current.EntityType,
        LocationType: current.LocationType,
        Demographic: current.DemographicName,
        foodAllocation: foodWeights,
        Area: current.CombinedAreaName
      });

      setDoneFlag(true);
    } else {
      toast.error('Please fill in all required fields.');
    }
  };

  const { name } = current;

  return (
    <form
      onSubmit={handleSubmit}
      className="Form-main m-5 mb-10 flex justify-center flex-col"
    >
      <h2 className="text-4xl font-semibold mt-10 flex flex-start">
        {PickupDeliveryObject.pickupOrDelivery === 1
          ? 'Pickup Location:'
          : 'Dropoff Location:'}
      </h2>
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
            getFoodTypes().map((foodType) => (
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
          Submit
        </button>
      </div>
    </form>
  );
}

export default LocationForm;
