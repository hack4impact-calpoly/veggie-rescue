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
  const [active, setActive] = useState(""); // State for radio buttons
  const [isClicked, setIsClicked] = useState(true); // State for radio buttons

  // State for if user is adding a new location
  const [donorName, setName] = useState("");
  const [donorLocationType, setDonorLocationType] = useState("");
  const [donorEntityType, setDonorEntityType] = useState("");
  const [food, setFoodType] = useState("");
  const [demographic, setDemographic] = useState("");
  const [area, setArea] = useState("");

  const { name } = current;

  const submitPressed = () => {
    if (createNew === false && active !== ""){
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        id : current._id,
        name : current.name,
        EntityType : current.EntityType,
        LocationType : current.LocationType,
        Demographic : current.DemographicName,
        FoodType : active.toLowerCase(),
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
        FoodType : food,
        Area : area
      })
      setForceNext(true); 
    }
    else{
      toast.error("Please enter a food type.")
    }
  }

  return (
    <div className="Form-main">
        <h2 className="text-primary-locationForm">
          {createNew ? "New Location" : PickupDeliveryObject.pickupOrDelivery === 1 ? "Pickup Location" : "Dropoff Location"}
        </h2>
        {createNew ? (
         PickupDeliveryObject.pickupOrDelivery === 1 ? (
            <div className="newLocation">
            <input
              type="text"
              placeholder="Donor name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Donor Location Type"
              name="location"
              onChange={(e) => setDonorLocationType(e.target.value)}
            />

            <input
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e) => setDonorEntityType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Food Type"
              name="type"
              onChange={(e) => setFoodType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>
         ): ( <div className="newLocation">
            <input
              type="text"
              placeholder="Recipient name"
              name="name"
              onChange={(e) => setName(e.target.value)}
            />

            <input
              type="text"
              placeholder="Entity Type"
              name="location"
              onChange={(e) => setDonorEntityType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Food Type"
              name="type"
              onChange={(e) => setFoodType(e.target.value)}
            />
            <input
              type="text"
              placeholder="Demographic"
              name="location"
              onChange={(e) => setDemographic(e.target.value)}
            />
            <input
              type="text"
              placeholder="Area"
              name="type"
              onChange={(e) => setArea(e.target.value)}
            />
          </div>)
        ) : (
          <div className="existingLocation">
            <input className="location-name-form" type="text" placeholder={name} name="name" disabled={true} />
            <div className="food-type">Food type</div>
            <div className="select-parent">
              {current &&
                 <div >
                      <input
                        type="radio"
                        name="foodType"
                        value={current.FoodType}
                        onClick={() => {
                          setActive(current.FoodType);
                          setIsClicked(true);
                        }}
                      />
                      <b> {current.FoodType}</b>
                    </div>
                }
              {current && (
                <div>
                  <input
                    type="radio"
                    name="foodType"
                    onClick={() => setIsClicked(false)}
                  />{" Other"}
                  <input className="specify-item"
                    type="text"
                    disabled={isClicked}
                    onChange={(e) => setActive(e.target.value)}
                    placeholder='Please Specify'
                  />{" "}
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <button className="continue_button" onClick={() => submitPressed()}>Continue</button>
        </div>
      {/* </form> */}
    </div>
  );
}

export default LocationForm;