import "./App.css";
import { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    setLoading(true);      
    setError("");
    setWeather(null);

    fetch(
      `https://api.weatherapi.com/v1/current.json?key=c43d778a3c174e2d81c131723260302&q=${city}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("City not found");
        }
        return response.json();
      })
      .then((data) => {
        setWeather(data);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Unable to fetch weather data");
        alert("Failed to fetch weather data");
      })
      .finally(() => {
        setLoading(false);  
      });
  };

  return (
    <div>
     

      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch} class="btn btn-success">Search</button>

       {loading && <p>Loading data...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div className="weather-cards">
          <div className="weather-card">
            <h4>Temperature</h4>
            <p>{weather.current.temp_c} °C</p>
          </div>

          <div className="weather-card">
            <h4>Humidity</h4>
            <p>{weather.current.humidity} %</p>
          </div>

          <div className="weather-card">
            <h4>Condition</h4>
            <p>{weather.current.condition.text}</p>
          </div>

          <div className="weather-card">
            <h4>Wind Speed</h4>
            <p>{weather.current.wind_kph} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
