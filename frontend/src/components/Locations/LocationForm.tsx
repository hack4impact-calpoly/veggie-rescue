import React, { useState } from "react";

interface locale {
	name: string,
	donorLocationType: string,
	donorEntityType: string,
	foodType: string[],
	area: string,
	id: string,
  }

interface pickupDeliveryObjectSchema {
    pickupOrDelivery: number,
    id: String,
    date: String,
    driver: String,
    vehicle: String,
    name: String,
    recipientEntityType: String,
    demographic: String,
    foodType: String,
    area: String,
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
  const [area, setArea] = useState("");

  const { name } = current;

  // const onSubmit = (e : Event) => {
  //   e.preventDefault();
  //   if (createNew) {
  //     setLocation({
  //       name: donorName,
  //       donorLocationType: donorLocationType,
  //       donorEntityType: donorEntityType,
  //       foodType: food,
  //       area: area,
  //     });
  //   } else {
  //     setLocation({
  //       ...current,
  //       foodType: active,
  //     });
  //   }
  // };

  const submitPressed = () => {
    if (createNew === false && active !== ""){
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        id : current.id,
        name : current.name,
        recipientEntityType : current.donorEntityType,
        demographic : current.donorLocationType,
        foodType : current.foodType,
        area : current.area
      })
      setForceNext(true);
    }
    else if (createNew === true){
      setPickupDeliveryObject({
        ...PickupDeliveryObject,
        // id : ID?,
        name : donorName,
        recipientEntityType : donorEntityType,
        demographic : donorLocationType,
        foodType : food,
        area : area
      })
      setForceNext(true); 
    }
    else{
      console.log("bad input!");
    }
  }

  return (
    <div className="Form-main">
        <h2 className="text-primary-locationForm">
          {createNew ? "New Location" : "Donor Name"}{" "}
        </h2>

        {createNew ? (
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
        ) : (
          <div className="existingLocation">
            <input className="location-name-form" type="text" placeholder={name} name="name" disabled={true} />
            <div className="food-type">Food type</div>
            <div className="select-parent">
              {current &&
                current.foodType.map((ft : string, index : number) => {
                  return (
                    <div key={index}>
                      <input
                        type="radio"
                        name="foodType"
                        value={ft}
                        onClick={() => {
                          setActive(ft);
                          setIsClicked(true);
                        }}
                      />
                      <b>{ft}</b>
                    </div>
                  );
                })}
              {current && (
                <div>
                  <input
                    type="radio"
                    name="foodType"
                    onClick={() => setIsClicked(false)}
                  />{"Other"}
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