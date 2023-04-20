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
  id: string;
  date: string;
  driver: string;
  vehicle: string;
  name: string;
  EntityType: string;
  LocationType: string;
  Demographic: string;
  FoodType: string;
  Area: string;
  lbsDroppedOff: number;
}

interface Props {
  current: Locale;
  createNew: boolean;
  setLocation: Function;
  PickupDeliveryObject: PickupDeliveryObjectSchema;
  setPickupDeliveryObject: Function;
  setForceNext: Function;
}





interface Foods {
  [key: string]: number;
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
  const [isOtherClicked, setOtherClicked] = useState(false);
  const [isProduceClicked, setProduceClicked] = useState(false);
  const [firstProduce, setFirstProduce] = useState(true);
  const [firstOther, setFirstOther] = useState(true);

  const [isWeightValid, setIsWeightValid] = useState(true);

  const [checked, setChecked] = useState<string[]>([]);
  // State for checkbox buttons

  // State for if user is adding a new location
  const [donorName, setName] = useState('');
  const [donorLocationType, setDonorLocationType] = useState('');
  const [donorEntityType, setDonorEntityType] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [food, setFoodType] = useState('');

  const [weight, setWeight] = useState(0);



  const [foods, setFoods] = useState<Foods>({});

  const addFood = (name: string, weight: number) => {
    setFoods((prevDict) => ({ ...prevDict, [name]: weight }));
  };



  


  const removeFood = (name: string) => {
    setFoods((prevDict) => {
      const newDict = { ...prevDict };
      delete newDict[name];
      return newDict;
    });
  };

  
  const [demographic, setDemographic] = useState('');
  const [area, setArea] = useState('');
  const [input, setInput] = useState('');

  const { name } = current;

  const submitPressed = () => {
    let foodTypes = checked;
    let isValid = checked.length > 0;

    if (isOtherClicked) {
      if (input.trim().length === 0) {
        isValid = false;
      } else {
        isValid = true;
        setChecked([...checked, input]);
        // react updates state variables asynchronously so this is to get most recent food list
        foodTypes = [...checked, input];
      }
    }

    if (isValid) {
      console.log(`submitting form with data: ${foodTypes}`);
      if (createNew === false) {
        setPickupDeliveryObject({
          ...PickupDeliveryObject,
          id: current._id,
          name: current.name,
          EntityType: current.EntityType,
          LocationType: current.LocationType,
          Demographic: current.DemographicName,
          FoodType: foodTypes,
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
          FoodType: foodTypes,
          Area: area
        });
        setForceNext(true);
      }
    } else {
      toast.error('Please enter value for Other.');
    }
  };


  const handleTextBox = () => {
    if (!isOtherClicked)
    {
      const inputVal = document.getElementById("other_lbsTextBox");
        if (inputVal !== null)
        {
          inputVal.style.display = 'block'
        }
      
    }
    if(isOtherClicked)
    {
      const inputVal = document.getElementById("other_lbsTextBox");
        if (inputVal !== null)
        {
          inputVal.style.display = 'none'
        }
        // unchecked
        if (input in foods)
          {
             removeFood(input)
          }
    }

    }

    const handleTextBox2 = () => {
      if (!isProduceClicked)
      {
        const inputVal = document.getElementById("produce_lbsTextBox");
          if (inputVal !== null)
          {
            inputVal.style.display = 'block'
          }
          
      }
      if(isProduceClicked)
      {
        const inputVal = document.getElementById("produce_lbsTextBox");
          if (inputVal !== null)
          {
            inputVal.style.display = 'none'
          }
          // unchecked
          if ("Produce" in foods)
          {
             removeFood("Produce")
          }

      }
  
      }

  const handleClick = () => {
    let updatedList = [...checked];


    console.log('checked array', checked)

    if (updatedList.indexOf(current.FoodType) !== -1) 
    {
      // if currentFoodtype is in the checked array, remove it
      // remove text box as well
      updatedList.splice(updatedList.indexOf(current.FoodType), 1);
    } 
    else 
    {
      updatedList = [...checked, current.FoodType];
    }
    setChecked(updatedList);
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
              placeholder="Food Type"
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
              placeholder="Food Type"
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
              <div className="flex items-center mb-4">
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 w-8 h-8 inline-block mr-2 bg-white border border-grey flex-no-shrink"
                  id="checkbox"
                  type="checkbox"
                  name="foodType"
                  value={current.FoodType}
                  onClick={() => {
                    handleTextBox2();
                    setProduceClicked(!isProduceClicked);
                    handleClick();
                  }}
                  
                />
                <label
                  htmlFor="checkbox"
                  className="flex items-center cursor-pointer text-3xl"
                >
                  {current.FoodType}
                </label>


                <input
                    className="bg-white ml-2 text-2xl w-20 h-10 italic py-4 px-4 mt-2 rounded-lg shadow text-left"
                    id = "produce_lbsTextBox"
                    type="text"
                    style={{ display: 'none' }}
                    placeholder="lbs" 
                    onChange={(e) => {
                      
                        setWeight(parseInt(e.target.value));
                      
                    
                    }}
                    onBlur={(e) => {
                      if (isNaN(weight))
                      {
                        setIsWeightValid(false)
                        toast.error("Please enter a valid number for weight")
                      }
                      else
                      {
                        setIsWeightValid(true)
                        addFood("Produce", weight)
                      }
                      
                      
                    }}
                    

                    />
              </div>
            )}
            {current && (
              <div>
                <input
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600  w-8 h-8 inline-block mr-2 bg-white border border-grey flex-no-shrink"
                  id="checkbox2"
                  type="checkbox"
                  name="foodType"
                  value="Other"
                  onClick={() => {
                    handleTextBox();
                    setOtherClicked(!isOtherClicked);
                    
                    handleClick();
                  }}
                />
                <label htmlFor="checkbox2" className="cursor-pointer text-3xl">
                  {'Other'}{' '}

                  <input
                    className="bg-white ml-2 text-2xl w-20 h-10 italic py-4 px-4 mt-2 rounded-lg shadow text-left"
                    id = "other_lbsTextBox"
                    type="text"
                    style={{ display: 'none' }}
                    onChange={(e) => {
                        
                        setWeight(parseInt(e.target.value));
                    }}
                    placeholder="lbs" />
                </label>

                
                <input
                  className="bg-white ml-2 text-4xl w-full italic py-4 px-4 mt-2 rounded-lg shadow w-full text-left"
                  type="text"
                  disabled={!isOtherClicked}
                  onChange={(e) => {
                    setInput(e.target.value);
                  }}
                  onBlur={(e) => {
                    if (isNaN(weight))
                      {
                        setIsWeightValid(false)
                        toast.error("Please enter a valid number for weight")
                      }
                      else
                      {
                        setIsWeightValid(true)
                        addFood(input, weight)
                      }
                  }}
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
          disabled={
            (checked.length === 0 && !isOtherClicked) || !isWeightValid
          } /* disable if nothing is clicked */
          className="bg-amber-500 rounded-full w-full mt-5 p-3 text-3xl text-white font-semibold shadow"
          onClick={() => {
            submitPressed();
            console.log(foods)
          }}
        >
          Continue
        </button>
      </div>
      {/* </form> */}
    </div>
  );
}

export default LocationForm;