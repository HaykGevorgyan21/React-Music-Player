// Importing necessary modules from React, Ant Design, and other dependencies
import React, {useState} from 'react';
import {Modal, Button, Input, message, Spin} from 'antd';
import axios from 'axios';
import '../../Style/Uploadbutton.css'; // Importing custom styles
import {useData} from '../Context/TableContext';

// Functional component named UploadButton
const UploadButton = () => {
    // Destructuring values from the custom hook useData
    const {updateTableData, tableData} = useData();

    // State variables for managing modal visibility, song information, and loading state
    const [visible, setVisible] = useState(false);
    const [song, setSong] = useState(null);
    const [songName, setSongName] = useState('');
    const [artistName, setArtistName] = useState('');
    const [loading, setLoading] = useState(false);

    // Function to show the modal
    const showModal = () => {
        setVisible(true);
    };

    // Function to handle the OK button click in the modal
    const handleOk = async () => {
        try {
            setLoading(true); // Show the spinner

            // Simulate a 2-second loading period
            setTimeout(async () => {
                if (!song) {
                    message.error('Please upload a song.');
                    return;
                }

                // Creating FormData to send the file and additional data
                const formData = new FormData();
                formData.append('song', song);
                formData.append('songName', songName);
                formData.append('artistName', artistName);

                // Making a POST request to upload the song
                const response = await axios.post('http://localhost:3001/song/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                // Check if the response contains valid data
                if (response && response.data) {
                    const responseData = response.data;
                    console.log(responseData, 'UploadButton');

                    // Update the context data with the new song data
                    updateTableData([responseData, ...tableData]);
                } else {
                    console.error('Invalid response format:', response);
                    message.error('Failed to process the response. Please check the server response format.');
                }

                setLoading(false); // Hide the spinner
                setVisible(false); // Close the modal
            }, 2000); // Simulate 2 seconds
        } catch (error) {
            console.error('Error making POST request:', error.message);
            message.error('Failed to upload the song. Please try again.');

            setLoading(false); // Hide the spinner in case of an error
            setVisible(false); // Close the modal in case of an error
        }
    };

    // Function to handle the Cancel button click in the modal
    const handleCancel = () => {
        setLoading(false); // Hide the spinner if the modal is canceled
        setVisible(false); // Close the modal
    };

    // Function to handle file change in the file input
    const onFileChange = (e) => {
        const selectedSong = e.target.files[0];
        setSong(selectedSong);
        console.log('Selected Song:', selectedSong);
    };

    // Rendering the UploadButton component
    return (
        <>
            <div className="upload-button-container">
                <div className="icon-upload" onClick={showModal}></div>
                <button className="upload-button" onClick={showModal}>
                    Add All
                </button>
                <select className="select"></select>
            </div>

            {/* Modal for uploading songs */}
            <Modal
                title="Upload Songs"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" onClick={handleOk}>
                        OK
                    </Button>,
                ]}
            >
                <div>
                    <h4>Entry 1</h4>
                    {/* Input fields for song name and artist name */}
                    <Input
                        placeholder="Song Name"
                        value={songName}
                        onChange={(e) => setSongName(e.target.value)}
                    />
                    <br/>
                    <br/>
                    <Input
                        placeholder="Artist Name"
                        value={artistName}
                        onChange={(e) => setArtistName(e.target.value)}
                    />

                    <h4>Entry 2</h4>
                    {/* File input for selecting a song file */}
                    <input className='upload-button-file' type="file" onChange={onFileChange}/>
                </div>
            </Modal>

            {/* Displaying a spinner while uploading */}
            {loading && (
                <div className="spinner-container">
                    <Spin className='spin' size="large"/>
                </div>
            )}
        </>
    );
};

// Exporting the component as the default export
export default UploadButton;
