// Importing necessary modules from React, Ant Design, and other dependencies
import React, {useEffect, useState, useRef} from 'react';
import {Divider, Table, Button} from 'antd';
import {useData} from '../Context/TableContext'; // Importing custom hook
import '../../Style/Table.css';
import axios from 'axios';


// Functional component named Tables, taking searchData as a prop
const Tables = ({searchData}) => {
    // Destructuring values from the custom hook useData
    const {
        tableData,
        updateTableData,
        handlePlayClick,
        isPlaying,
        isAudioVisible,
        currentAudioIndex,
        setCurrentAudioIndex,
        transformedData,
        endedEvent,
        handleLikeClick,
        liked
    } = useData();
    const audioRef = useRef(null);


    // useEffect hook to fetch data when the component mounts or searchData changes
    useEffect(() => {
        const fetchData = async () => {
            // Use searchData if available, otherwise, fetch the default data
            const dataToFetch = searchData || 'http://localhost:3001/song/findAll';

            try {
                const response = await axios.get(dataToFetch);
                const responseData = response.data;

                // Checking the response format and updating the context data if valid
                if (
                    Array.isArray(responseData) &&
                    responseData.every(
                        (item) =>
                            item.id &&
                            item.songName &&
                            item.artistName &&
                            item.songPath &&
                            item.trackNumber
                    )
                ) {
                    updateTableData(responseData);
                } else {
                    console.error('Invalid response format:', responseData);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, [searchData]);


    // Function to handle like button click

    const handleLike = (record) => {
        // Updating the context data to toggle the liked state
        const updatedData = tableData.map((item) =>
            item.key === record.key ? {...item, liked: !item.liked} : item
        );

        updateTableData(updatedData);

        console.log('Like button clicked for record:', record);
    };

    console.log(audioRef.current)
    // Table columns configuration
    const columns = [
        {
            title: 'Play',
            dataIndex: 'play',
            render: (text, record) => (<>
                <div className='play-container'>
                    <div className='icon'>░</div>
                    <Button
                        className={`play-but ${record.played ? 'played' : ''} ${
                            isPlaying && currentAudioIndex === record.key ? 'played' : ''
                        }`}
                        onClick={() => handlePlayClick(record)}
                    ></Button>
                </div>
            </>),
        },
        {
            title: 'Song Name',
            dataIndex: 'name',
        },
        {
            title: 'Artist Name',
            dataIndex: 'artistName',
        },
        {
            title: 'Track',
            dataIndex: 'id',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Like',
            dataIndex: 'like',
            render: (text, record) => (
                <span>
                    {/* Like button and other actions */}
                    <Button
                        className={`like ${record.liked ? 'liked' : ''}`}
                        onClick={() => handleLikeClick(record)}
                    ></Button>
                    <Button
                        className="completed"
                        onClick={() => handleLikeClick(record)}
                    ></Button>
                    <Button
                        className="share"
                        onClick={() => handleLikeClick(record)}
                    ></Button>
                    <Button
                        className="selects"
                        onClick={() => handleLikeClick(record)}
                    ></Button>
                </span>
            ),
        },
    ];

    // Rendering the component with Ant Design Table and audio player if visible
    return (
        <div className="table">
            <Divider></Divider>
            <Table columns={columns} dataSource={transformedData} size="middle" pagination={{defaultPageSize: 5}}/>
            {isAudioVisible && (
                <div className="play-container">
                    <audio
                        className='audio-controlerr'
                        controls
                        autoPlay
                        ref={audioRef}
                        id={`audio-${currentAudioIndex}`}
                        onEnded={endedEvent}


                    >
                        <source
                            src={transformedData.find((item) => item.key === currentAudioIndex)?.audioURL}
                            type="audio/mp3"
                        />
                        Your browser does not support the audio tag.
                    </audio>
                </div>
            )}
        </div>
    );
};

// Exporting the component as the default export
export default Tables;
