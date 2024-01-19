import './App.css';
import HomePage  from "./Components/Home/HomePage";
import {DataProvider} from "./Components/Context/TableContext";

function App() {
  return (
<DataProvider>

    <div className="App">
<HomePage />
    </div>
</DataProvider>
  );
}

export default App;
