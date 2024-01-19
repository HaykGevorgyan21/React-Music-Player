// Importing necessary modules from React
import React, {createContext, useContext, useState} from 'react';

// Creating a React context named TableContext
const TableContext = createContext();

// Creating a DataProvider component
export const DataProvider = ({children}) => {
    // State variables for table data and auto-play status
    const [tableData, setTableData] = useState([]);
    const [isAutoPlayed, setIsAutoPlayed] = useState(false);
    const [isAudioVisible, setIsAudioVisible] = useState(false);
    const [currentAudioIndex, setCurrentAudioIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSong, setCurrentSong] = useState();
    const [liked, setLiked] = useState(false)


    const transformedData = tableData.map((item) => ({
        play: '',
        key: item.id,
        name: item.songName,
        artistName: item.artistName,
        id: item.trackNumber,
        like: 'like',
        played: false,
        liked: false,
        audioURL: `http://localhost:3001${item.songPath}`,
    }));
    // Function to update the table data
    const updateTableData = (data) => {
        setTableData(data);
    };


    const playNext = () => {
        const index = transformedData.findIndex((x) => x.key === currentAudioIndex);

        if (index === transformedData.length - 1) {
            setCurrentAudioIndex(transformedData[0].key);
        } else {
            setCurrentAudioIndex(transformedData[index + 1].key);


        }
        const audioElement = document.getElementById(`audio-${currentAudioIndex}`);
        if (audioElement) {
            audioElement.load(); // Reset the audio element
            audioElement.play(); // Play the next song
        }

    };

    // Function to handle canplay event

    const endedEvent = () => {
        // Play the next song when the current song ends
        playNext();
    };

    // Function to handle play button click
    const handlePlayClick = (record) => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);

            // Updating the context data to mark the record as played
            const updatedData = tableData.map((item) =>
                item.key === record.key ? {...item, played: !item.played} : item
            );
            updateTableData(updatedData);

            if (!isAudioVisible) {
                // Showing the audio player if it's not visible
                setCurrentAudioIndex(record.key);
                setIsAudioVisible(true);
                setIsPlaying(true); // Set isPlaying to true when audio starts playing
            } else {
                // Handling the case when the audio player is already visible
                if (currentAudioIndex === record.key) {
                    const audioElement = document.getElementById(`audio-${record.key}`);
                    if (audioElement) {
                        audioElement.pause();
                        setIsPlaying(false); // Set isPlaying to false when audio stops
                    }
                    if (!isAutoPlayed) {
                        setIsAudioVisible(false);
                        setCurrentAudioIndex(0);
                    }
                } else {
                    // Switching to a new audio track if a different record is clicked
                    setCurrentAudioIndex(record.key);
                    setIsPlaying(true); // Set isPlaying to true when audio starts playing
                }
            }

            console.log('Play button clicked for record:', record);
        }, 0);
    };

    const handleLikeClick = (record) => {
        // Updating the context data to toggle the liked state
        const updatedData = tableData.map((item) =>
            item.key === record.key ? {...item, liked: !item.liked} : item
        );

        updateTableData(updatedData);
        setLiked(!liked)
        console.log('Like button clicked for record:', record);
    };

    // Providing the context values to the wrapped components
    return (
        <TableContext.Provider value={{
            tableData,
            updateTableData,
            isAutoPlayed,
            setIsAutoPlayed,
            handlePlayClick,
            loading,
            isPlaying,
            isAudioVisible,
            setIsAudioVisible,
            currentAudioIndex,
            setCurrentAudioIndex,
            transformedData,
            playNext,
            endedEvent,
            handleLikeClick,
            liked
        }}>
            {children}
        </TableContext.Provider>
    );
};


// Custom hook named useData for accessing the context values
export const useData = () => {
    const context = useContext(TableContext);

    // Throwing an error if useData is not used within a DataProvider
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }

    // Returning the context values
    return context;
};
