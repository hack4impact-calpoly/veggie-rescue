/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
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
  foodAllocation: Map<String, Number>;
}

interface Props {
  current: Locale;
  createNew: boolean;
  setLocation: Function;
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setPickupDeliveryObject: Function;
  setForceNext: Function;
}

function LocationForm({
  current,
  createNew,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLocation,
  PickupDeliveryObject,
  setPickupDeliveryObject,
  setForceNext
}: Props) {
  const [active, setActive] = useState(''); // State for radio buttons
  const [isClicked, setIsClicked] = useState(true); // State for radio buttons

  // State for if user is adding a new location
  const [donorName, setName] = useState('');
  const [donorLocationType, setDonorLocationType] = useState('');
  const [donorEntityType, setDonorEntityType] = useState('');
  const [food, setFoodType] = useState('');
  const [demographic, setDemographic] = useState('');
  const [area, setArea] = useState('');

  const { name } = current;

  const submitPressed = () => {
    if (createNew === false && active !== '') {
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        id: current._id,
        name: current.name,
        EntityType: current.EntityType,
        LocationType: current.LocationType,
        Demographic: current.DemographicName,
        FoodType: active.toLowerCase(),
        Area: current.CombinedAreaName
      });
      setForceNext(true);
    } else if (createNew === true) {
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        // id : ID?,
        name: donorName,
        EntityType: donorEntityType,
        LocationType: donorLocationType,
        Demographic: demographic,
        FoodType: food,
        Area: area
      });
      setForceNext(true);
    } else {
      toast.error('Please enter a food type.');
    }
  };

  return (
    <div className="Form-main m-5 mb-10 flex justify-center flex-col">
      <h2 className="text-4xl font-semibold mt-10 flex flex-start">
        {createNew
          ? 'Enter New Location:'
          : PickupDeliveryObject.pickupOrDelivery === 1
          ? 'Pickup Location:'
          : 'Dropoff Location:'}
      </h2>
      {createNew ? (
        PickupDeliveryObject.pickupOrDelivery === 1 ? (
          <div className="text-4xl flex justify-center items-center grid grid-col gap-5">
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Donor name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Donor Location Type"
              name="location"
              onChange={(e) => setDonorLocationType(e.target.value)}
            />

            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e) => setDonorEntityType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Food Type"
              name="type"
              onChange={(e) => setFoodType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
        ) : (
          <div className="newLocation">
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Recipient name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e) => setDonorEntityType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Food Type"
              name="type"
              onChange={(e) => setFoodType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Demographic"
              name="location"
              onChange={(e) => setDemographic(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
        )
      ) : (
        <div className="existingLocation">
          <input
            className="bg-white text-4xl w-full italic py-4 px-4 mt-3 rounded-lg shadow w-full text-left"
            type="text"
            placeholder={name}
            name="name"
            disabled
          />
          <div className="text-4xl font-semibold text-left pt-10">
            Food type:
          </div>
          <div className="text-3xl text-left ml-20 m-4 py-4">
            {current && (
              <div className="flex items-center mr-4 mb-4">
                <input
                  className="mx-3 my-5 hidden"
                  id="radio1"
                  type="radio"
                  name="foodType"
                  value={current.FoodType}
                  onClick={() => {
                    setActive(current.FoodType);
                    setIsClicked(true);
                  }}
                  checked
                />
                <label
                  htmlFor="radio1"
                  className="flex items-center cursor-pointer text-3xl"
                >
                  <span className="w-8 h-8 inline-block mr-2 bg-white rounded-full border border-grey flex-no-shrink" />
                  {current.FoodType}
                </label>
              </div>
            )}
            {current && (
              <div>
                <input
                  className="mx-3 my-5 hidden"
                  id="radio2"
                  type="radio"
                  name="foodType"
                  onClick={() => setIsClicked(false)}
                  checked
                />
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label
                  htmlFor="radio2"
                  className="flex items-center cursor-pointer text-3xl"
                >
                  <span className="w-8 h-8 inline-block mr-2 bg-white rounded-full border border-grey flex-no-shrink" />
                  Other
                </label>
                <input
                  className="bg-white ml-2 text-4xl w-full italic py-4 px-4 mt-2 rounded-lg shadow w-full text-left"
                  type="text"
                  disabled={isClicked}
                  onChange={(e) => setActive(e.target.value)}
                  placeholder="Please Specify"
                />{' '}
              </div>
            )}
          </div>
        </div>
      )}

      <div>
        <button
          type="submit"
          className="bg-amber-500 rounded-full w-full mt-5 p-3 text-3xl text-white font-semibold shadow"
          onClick={() => submitPressed()}
        >
          Continue
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}

export default LocationForm;
