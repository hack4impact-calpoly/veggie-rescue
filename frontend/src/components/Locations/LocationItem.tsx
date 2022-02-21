import {useEffect} from 'react'

// type Props = {
//   location : any, 
//   setCurrent : React.Dispatch<React.SetStateAction<object>>,
//   clearFilter : Function,
//   setCreateNew? : React.Dispatch<React.SetStateAction<boolean>>,
//   isNew? : Boolean,
// }

type Props = {
  location : any, 
  setCurrent : Function,
  clearFilter : Function,
  setCreateNew? : Function,
  isNew? : boolean,
}

const LocationItem: React.FC<Props> = ({location, setCurrent, clearFilter, setCreateNew, isNew}) =>{
// export const FilterItem = ({ location, setCurrent, clearFilter, setCreateNew, isNew }) => {
  // Deconstruct location prop and get location name.
  const { name } = location;
  
  useEffect(()=>{
    if(isNew && setCreateNew !== undefined){
      setCreateNew(true)
    }
  })
  
  //  The button expands to fit the enter div... on click setCurrent function is called and passed up to Location state.  Filter is cleared so it
  //  isn't displayed below the text field.

  return (
    <div className="card bg-light w-full">
      <button
        className="w-full p-1"
        onClick={() => {
          setCurrent(location);
          clearFilter();
        }}
      >
        <h3 className="text-primary text-left w-full">{name}</h3>
      </button>
    </div>
  );
};

export default LocationItem;