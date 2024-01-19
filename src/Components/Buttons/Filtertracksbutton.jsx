// Importing necessary modules from React and custom styles
import React, { useState, useEffect } from 'react';
import '../../Style/Filtertrackbutton.css';
import { useData } from '../Context/TableContext';

// Functional component named FilterTracksButton
const FilterTracksButton = () => {
    // Destructuring values from the custom hook useData
    const { tableData, updateTableData } = useData();

    // State variable for managing sorting order (ascending or descending)
    const [isAscending, setIsAscending] = useState(true);

    // Function to handle the button click, toggling the sorting order
    const handleButtonClick = () => {
        setIsAscending((prevIsAscending) => !prevIsAscending);
    };

    // Effect to handle sorting when isAscending changes
    useEffect(() => {
        const handleSort = () => {
            // Creating a copy of tableData and sorting it based on trackNumber
            const sortedData = [...tableData].sort((a, b) => {
                // Assuming id is a number
                return isAscending ? a.trackNumber - b.trackNumber : b.trackNumber - a.trackNumber;
            });


            // Updating the table data with the sorted data
            updateTableData(sortedData);
        };

        // Trigger sorting when isAscending changes
        handleSort();
    }, [isAscending]);

    // Rendering the FilterTracksButton component
    return (
        <div className="filter-button-container">
            {/* Icon indicating filter */}
            <div className="icon-filter"  onClick={handleButtonClick}></div>
            {/* Button for toggling sorting order */}
            <button className="filter-button" onClick={handleButtonClick}>
                Track Nu... {isAscending ? '▲' : '▼'}
            </button>
        </div>
    );
};

// Exporting the component as the default export
export default FilterTracksButton;
