import React, { useEffect, useRef } from 'react';

import './Location.css'

interface locale {
	name: string,
	LocationType: string,
	EntityType: string,
	FoodType: string,
	  DemographicName: string,

	CombinedAreaName: string,
	_id: string,
  }

interface Props {
	filterLocations : Function,
	filtered? : locale[],
	clearFilter : Function,
	clearCurrent : Function 
}

type locationObject = React.ChangeEvent<HTMLInputElement>;

const LocationFilter = ({filterLocations, filtered, clearFilter, clearCurrent} : Props) =>{
	const text = useRef('');

	// On load set text to '' if filtered === null
	useEffect(() => {
		if (filtered === null) {
			text.current = '';
		}
	});

	// If text field is not empty, clear the current object and filter by the given text.  Otherwise, if text field is empty clear the filter array
	const onChange = (e : locationObject) => {
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
		<div className='filter-parent'>
			<form className='filter-form'>
				<input
					id="filter-text"
					type="text"
					placeholder={'Filter Locations...'}
					onChange={onChange}
				/>
			</form>
		</div>
	);
};

export default LocationFilter;
