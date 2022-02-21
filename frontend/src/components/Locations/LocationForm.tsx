import React, { useState } from "react";

/*
type Props = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen: React.FC<Props> = ({setLogin}) =>{
*/

// type Props = {
//   current : any,
//   clearCurrent : Function,
//   createNew : boolean,
//   savedLocation : object,
//   setLocation : React.Dispatch<React.SetStateAction<object>>;
// }

type Props = {
  current : any,
  clearCurrent : Function,
  createNew : boolean,
  savedLocation : any,
  setLocation : Function;
}

type locationObject = React.ChangeEvent<HTMLInputElement>;

interface locale {
	// name: "catlin ranch",
	// donorLocationType: "farmers market",
	// donorEntityType: "farm",
	// foodType: ["produce"],
	// area: "ventura county",
	// id: "elIDOJd",
  
	name: string,
	donorLocationType: string,
	donorEntityType: string,
	foodType: string[],
	area: string,
	id: string,
  }

const LocationForm: React.FC<Props> = ({current, clearCurrent, createNew, savedLocation, setLocation}) =>{
  const [active, setActive] = useState(""); // State for radio buttons
  const [isClicked, setIsClicked] = useState(true); // State for radio buttons

  // State for if user is adding a new location
  const [donorName, setName] = useState("");
  const [donorLocationType, setDonorLocationType] = useState("");
  const [donorEntityType, setDonorEntityType] = useState("");
  const [food, setFoodType] = useState("");
  const [area, setArea] = useState("");

  const { name } = current;

  const onChange = (e : locationObject) =>
    setLocation({ ...savedLocation, [e.target.name]: e.target.value });

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
    <>
      <form onSubmit={(e) => onSubmit}>
        <h2 className="text-primary">
          {createNew ? "New Location" : "Donor Info"}{" "}
        </h2>

        {createNew ? (
          <>
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
          </>
        ) : (
          <>
            <input type="text" placeholder={name} name="name" disabled={true} />
            {current &&
              current.foodType.map((ft : any, index : any) => {
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
                    {ft}
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
                <input
                  type="text"
                  disabled={isClicked}
                  onChange={(e) => setActive(e.target.value)}
                />{" "}
              </div>
            )}
          </>
        )}

        <div>
          <input
            type="submit"
            value={createNew ? "Add New" : "Submit"}
            className="btn btn-primary btn-block"
            onChange={onChange}
          />
        </div>
        {current && (
          <div>
            <button className="btn btn-light btn-block" onClick={() => {clearCurrent()}}>
              Clear
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default LocationForm;