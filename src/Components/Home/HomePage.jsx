// Importing the Controlbar and Tables components, as well as the DataProvider from the TableContext
import Controlbar from "../ControlBar/Controlbar";
import Tables from "../Table/Table";
import {DataProvider} from "../Context/TableContext";

// Functional component named HomePage
function HomePage() {
    // Rendering the DataProvider component, which wraps the Controlbar and Tables components
    return (
        <>
            <DataProvider>
                {/* Rendering the Controlbar component */}
                <Controlbar/>
                {/* Rendering the Tables component */}
                <Tables/>
            </DataProvider>
        </>
    );
}

// Exporting the component as the default export
export default HomePage;
