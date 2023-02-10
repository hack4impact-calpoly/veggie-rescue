import React, { useState } from "react";
import { toast } from "react-toastify";

interface locale {
	name: string,
	LocationType: string,
	EntityType: string,
	FoodType: string,
  DemographicName: string,
	CombinedAreaName: string,
	_id: string,
  }

interface pickupDeliveryObjectSchema {
    pickupOrDelivery: number,
    id: String,
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    EntityType: String,
    LocationType: String,
    Demographic: String,
    FoodType: String,
    Area: String,
    lbsDroppedOff: number
}


interface Props{
  current                 : locale,
  createNew               : boolean,
  setLocation             : Function,
  PickupDeliveryObject    : pickupDeliveryObjectSchema,
  setPickupDeliveryObject : Function,
  setForceNext            : Function
}

const LocationForm = ({current, createNew, setLocation, PickupDeliveryObject, setPickupDeliveryObject, setForceNext} : Props) =>{
  const [active, setActive] = useState<string[]>([]);
  const [isClicked, setIsClicked] = useState(true); // State for radio buttons
  const [isOtherClicked, setOtherClicked] = useState(true);
   // State for radio buttons

  // State for if user is adding a new location
  const [donorName, setName] = useState("");
  const [donorLocationType, setDonorLocationType] = useState("");
  const [donorEntityType, setDonorEntityType] = useState("");
  const [food, setFoodType] = useState("");
  const [demographic, setDemographic] = useState("");
  const [area, setArea] = useState("");

  const { name } = current;

  const submitPressed = () => {
    if (createNew === false && active .length!=0){
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        id : current._id,
        name : current.name,
        EntityType : current.EntityType,
        LocationType : current.LocationType,
        Demographic : current.DemographicName,
        FoodType : active,
        Area : current.CombinedAreaName
      })
      setForceNext(true);
    }
    else if (createNew === true){
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        // id : ID?,
        name : donorName,
        EntityType : donorEntityType,
        LocationType : donorLocationType,
        Demographic : demographic,
        FoodType : active,
        Area : area
      })
      setForceNext(true); 
    }
    else{
      toast.error("Please enter a food type.")
    }
  }

  return (
    <div className="Form-main m-5 mb-10 flex justify-center flex-col">
        <h2 className="text-4xl font-semibold mt-10 flex flex-start">
          {createNew ? "Enter New Location:" : PickupDeliveryObject.pickupOrDelivery === 1 ? "Pickup Location:" : "Dropoff Location:"}
        </h2>
        {createNew ? (
         PickupDeliveryObject.pickupOrDelivery === 1 ? (
            <div className="text-4xl flex justify-center items-center grid grid-col gap-5">
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Donor name"
              name="name"
              onChange={(e: { target: { value: any; }; }) => setName(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Donor Location Type"
              name="location"
              onChange={(e: { target: { value: any; }; }) => setDonorLocationType(e.target.value)}
            />

            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e: { target: { value: any; }; }) => setDonorEntityType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Food Type"
              name="type"
              onChange={(e: { target: { value: any; }; }) => setFoodType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e: { target: { value: any; }; }) => setArea(e.target.value)}
            />
          </div>
         ): ( <div className="newLocation">
            <input
            className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Recipient name"
              name="name"
              onChange={(e: { target: { value: any; }; }) => setName(e.target.value)}
            />

            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e: { target: { value: any; }; }) => setDonorEntityType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Food Type"
              name="type"
              onChange={(e: { target: { value: any; }; }) => setFoodType(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Demographic"
              name="location"
              onChange={(e: { target: { value: any; }; }) => setDemographic(e.target.value)}
            />
            <input
              className="italic py-3 px-4 mt-3 rounded-lg shadow w-full text-left"
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e: { target: { value: any; }; }) => setArea(e.target.value)}
            />
          </div>)
        ) : (
          <div className="existingLocation">
            <input className="bg-white text-4xl w-full italic py-4 px-4 mt-3 rounded-lg shadow w-full text-left" type="text" placeholder={name} name="name" disabled={true} />
            <div className="text-4xl font-semibold text-left pt-10">Food type:</div>
            <div className="text-3xl text-left ml-20 m-4 py-4">
              {current &&
                 <div className="flex items-center mb-4">
                 <input 
                       className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 w-8 h-8 inline-block mr-2 bg-white border border-grey flex-no-shrink"
                       id="checkbox"
                       type="checkbox"
                       name="foodType"
                       value={current.FoodType}
                       onClick={() => {
                         active.push(current.FoodType);
                         setActive(active);
                         setIsClicked(true);}}
                      />
                   <label htmlFor="checkbox" className="flex items-center cursor-pointer text-3xl">
                   
                   
                   {current.FoodType}</label>
             </div>
              }
              {current && (
                <div>
                  <input
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  w-8 h-8 inline-block mr-2 bg-white border border-grey flex-no-shrink"
                    id="checkbox2"
                    type="checkbox"
                    name="foodType"
                    value = {"Other"}
                    onChange={() => {
                      setIsClicked(!isClicked);
                      setOtherClicked(!isOtherClicked);
                      console.log(isOtherClicked)
                      }}
                  />
                  <label htmlFor="checkbox2" className="cursor-pointer text-3xl">
                    {"Other"} </label>
                       
                  <input className="bg-white ml-2 text-4xl w-full italic py-4 px-4 mt-2 rounded-lg shadow w-full text-left"
                    type="text"
                    disabled= {isOtherClicked}
                    onChange={(e) => 
                      {
                        active.push(e.target.value);
                        setActive(active);
                        setIsClicked(true);}
                    }
                    placeholder='Please Specify'
                  />{" "}
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <button className="bg-amber-500 rounded-full w-full mt-5 p-3 text-3xl text-white font-semibold shadow"
          disabled= {!isClicked}
           onClick={() => submitPressed()}>Continue</button>
        </div>
      {/* </form> */}
    </div>
  );
}

export default LocationForm;