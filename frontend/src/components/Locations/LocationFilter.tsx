import React, { useEffect, useRef } from 'react';

/*
type Props = {
  setLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginScreen: React.FC<Props> = ({setLogin}) =>{
*/

type Props = {
	filterLocations : any,
	filtered : any,
	clearFilter : any,
	clearCurrent : any 
}

// const LocationsFilter = ({filterLocations, filtered, clearFilter, clearCurrent}) => {
const LocationFilter: React.FC<Props> = ({filterLocations, filtered, clearFilter, clearCurrent}) =>{
	const text = useRef('');

	// On load set text to '' if filtered === null
	useEffect(() => {
		if (filtered === null) {
			text.current = '';
		}
	});

	// If text field is not empty, clear the current object and filter by the given text.  Otherwise, if text field is empty clear the filter array
	const onChange = (e : any) => {
		let curretText = (document.getElementById("filter-text") as HTMLInputElement).value;
		if (curretText !== '') {
			clearCurrent();
			filterLocations(e.target.value);
		} else {
			clearFilter();
		}
	};
	
	// Display the text field only
	return (
		<form>
			<input
				// ref={text}
				id="filter-text"
				type="text"
				placeholder={'Filter Locations...'}
				onChange={onChange}
			/>
		</form>
	);
};

export default LocationFilter;
