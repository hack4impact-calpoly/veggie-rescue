import React, { useState } from "react";

interface locale {
	name: string,
	donorLocationType: string,
	donorEntityType: string,
	foodType: string[],
	area: string,
	id: string,
  }

interface Props{
  current : locale,
  clearCurrent : Function,
  createNew : boolean,
  savedLocation? : locale,
  setLocation : Function;
}

const LocationForm = ({current, clearCurrent, createNew, savedLocation, setLocation} : Props) =>{
  const [active, setActive] = useState(""); // State for radio buttons
  const [isClicked, setIsClicked] = useState(true); // State for radio buttons

  // State for if user is adding a new location
  const [donorName, setName] = useState("");
  const [donorLocationType, setDonorLocationType] = useState("");
  const [donorEntityType, setDonorEntityType] = useState("");
  const [food, setFoodType] = useState("");
  const [area, setArea] = useState("");

  const { name } = current;

  // const onChange = (e : locationObject) =>
  //   setLocation({ ...savedLocation, [e.target.name]: e.target.value });

  const onSubmit = (e : Event) => {
    e.preventDefault();
    if (createNew) {
      setLocation({
        name: donorName,
        donorLocationType: donorLocationType,
        donorEntityType: donorEntityType,
        foodType: food,
        area: area,
      });
    } else {
      setLocation({
        ...current,
        foodType: active,
      });
    }
  };

  return (
    <div className="Form-main">
      <form onSubmit={() => onSubmit}>
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
                    <div className="flex flex-row items-center" key={index}>
                      <input
                        className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
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
                <div className="flex flex-row items-center">
                  <input
                    type="radio"
                    className="w-4 h-4 inline-block mr-1 rounded-full border border-grey"
                    name="foodType"
                    onClick={() => setIsClicked(false)}
                  />{" "}
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
          <button className="continue_button" onClick={() => console.log("cliked!")}>Continue</button>
        </div>
      </form>
    </div>
  );
}

export default LocationForm;