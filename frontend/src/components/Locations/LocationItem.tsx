import {useEffect} from 'react'

interface locale {
	name: string,
	LocationType: string,
	EntityType: string,
	FoodType: string,
	CombinedAreaName: string,
	_id: string,
  }

interface Props {
  location : locale, 
  setCurrent : Function,
  clearFilter : Function,
  setCreateNew? : Function,
  isNew? : boolean,
}

const LocationItem = ({location, setCurrent, clearFilter, setCreateNew, isNew} : Props) =>{
  // Deconstruct location prop and get location name.
  const { name } = location;
  useEffect(()=>{
    if(isNew && setCreateNew !== undefined){
      setCreateNew(true)
    }
  })
  
  //  The button expands to fit the enter div... on click setCurrent function is called and passed up to Location state.  
  //  Filter is cleared so it isn't displayed below the text field.

  return (
    <div className="flex items-center justify-center
      bg-white text-4xl font-medium py-7 my-4 drop-shadow-xl rounded-lg
      transform active:translate-y-2" 
        onClick={() => {
          setCurrent(location);
          clearFilter();
        }}
    >
      <h3>{name}</h3>
    </div>
  );
};

export default LocationItem;