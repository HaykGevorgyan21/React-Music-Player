// Importing the CSS file for styling
import '../../Style/Controlbar.css';

// Importing button components
import Playallbutton from "../Buttons/Playallbutton";
import Uploadbutton from "../Buttons/Uploadbutton";
import Filtertracksbutton from "../Buttons/Filtertracksbutton";
import Searchbar from "../SearchBar/Searchbar";

// Functional component named Controlbar
function Controlbar() {
    // Rendering the Controlbar component
    return (
        <>
            <div className="controlbar">
               <div className='one'>
                   {/* Rendering Playallbutton component */}
                   <Playallbutton/>
                   {/* Rendering Uploadbutton component */}
                   <Uploadbutton/>
               </div>
               <div className='two'>
                   {/* Rendering Filtertracksbutton component */}
                   <Filtertracksbutton/>
                   {/* Rendering Searchbar component */}
                   <Searchbar/>
               </div>
            </div>
        </>
    );
}

// Exporting the component as the default export
export default Controlbar;
