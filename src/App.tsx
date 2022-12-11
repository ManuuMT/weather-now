import "./App.scss";
import Weather from "./components/Weather/Weather";

const App = () => {
  return (
    <div className="App">
      <Weather city="London" />
    </div>
  );
};

export default App;
