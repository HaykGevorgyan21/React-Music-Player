// Importing necessary modules from React and custom styles
import React, {useState} from 'react';
import '../../Style/Playbutton.css';
import {useData} from '../Context/TableContext';

// Functional component named PlayButton
function PlayButton() {
    const {isAutoPlayed, setIsAutoPlayed, updateTableData, tableData, handlePlayClick, transformedData} = useData();
    const [played, setPlayed] = useState(false)


    //Button in played next song
    const handlePlayAllClick = () => {
        const songAtIndex1 = transformedData[0];
        if (songAtIndex1) {
            handlePlayClick(songAtIndex1);
            setPlayed(!played)
        }
    };

    return (
        <div className="play-button-container" onClick={handlePlayAllClick}>
            {/* Icon indicating play state */}
            <div className={`icon-play ${played ? 'played' : ''}`}></div>
            {/* Play button */}
            <button className="play-button" onClick={handlePlayAllClick}>Play All</button>
            {/* Placeholder select element */}
            <select className="select"></select>
        </div>
    );
}

export default PlayButton;
