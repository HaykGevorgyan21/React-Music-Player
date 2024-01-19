// Importing necessary modules from React, Ant Design, and other dependencies
import React, {useState} from 'react';
import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import '../../Style/Searchbar.css'; // Importing custom styles
import axios from 'axios';
import {useData} from '../Context/TableContext'; // Importing custom hook

// Functional component named Searchbar
function Searchbar() {
    // Destructuring values from the custom hook useData
    const {updateTableData} = useData();
    const silverColor = '#C0C0C0'; // Silver color code
    const [searchValue, setSearchValue] = useState('');

    // Asynchronous function to fetch data based on the searchValue
    const fetchData = async () => {
        try {
            // Sending a GET request to fetch all songs
            const response = await axios.get(`http://localhost:3001/song/findAll`);
            const responseData = response.data;

            // Filter data based on searchValue (case-insensitive search)
            const filteredData = responseData.filter(item =>
                item.songName.toLowerCase().includes(searchValue.toLowerCase()) ||
                item.artistName.toLowerCase().includes(searchValue.toLowerCase())
            );

            // Update the context data with the filtered results
            updateTableData(filteredData);
        } catch (error) {
            console.error('Error fetching filtered data:', error.message);
        }
    };

    // Event handler for input change
    const handleInputChange = (e) => {
        // Update searchValue when the input changes
        setSearchValue(e.target.value);

        // Fetch data on keyup
        fetchData();
    };

    // Rendering the component with Ant Design Input for search
    return (
        <>
            <Input
                type="search"
                placeholder="Filter..."
                className="searchbar"
                style={{color: silverColor, borderColor: silverColor}}
                prefix={<SearchOutlined style={{color: silverColor}}/>}
                value={searchValue}
                onChange={handleInputChange}
            />
        </>
    );
}

// Exporting the component as the default export
export default Searchbar;
