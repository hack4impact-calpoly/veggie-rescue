import React, { useEffect, useRef } from 'react';

const LocationsFilter = ({filterLocations, filtered, clearFilter, clearCurrent}) => {
	const text = useRef('');

	// On load set text to '' if filtered === null
	useEffect(() => {
		if (filtered === null) {
			text.current.value = '';
		}
	});

	// If text field is not empty, clear the current object and filter by the given text.  Otherwise, if text field is empty clear the filter array
	const onChange = (e) => {
		if (text.current.value !== '') {
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
				ref={text}
				type="text"
				placeholder={'Filter Locations...'}
				onChange={onChange}
			/>
		</form>
	);
};

export default LocationsFilter;
