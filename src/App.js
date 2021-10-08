import './App.css';
import Datacard from './Components/Card';
import Map from './Components/Map';
import Sidebar from './Components/Sidebar';

function App() {
  return (
    <div className="App">
      <h1>COVID-19 API Data</h1>
      <Sidebar />
      <Map />
      <Datacard />
    </div>
  );
}

export default App;
