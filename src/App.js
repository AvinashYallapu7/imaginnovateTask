import React, { useState } from 'react';
import { getWeatherByCity } from './WeatherService';
import './App.css';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    try {
      const data = await getWeatherByCity(city);
      setWeatherData(data);
      setError('');
    } catch (error) {
      setError('Failed to fetch weather data. Please try again.');
      setWeatherData([]);
    }
  };

  return (
    <div className="container">
      <h1>Weather in Your City</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Forecast</button>
      {error && <p>{error}</p>}
      <div className="table-container">
        {weatherData.map((weather, index) => (
          <table key={index}>
            <thead>
              <tr>
                <th colSpan="3">{new Date(weather.date).toLocaleDateString()}</th>
              </tr>
              <tr>
                <th>Parameter</th>
                <th>Min</th>
                <th>Max</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Temperature (°C)</td>
                <td>{weather.temp_min}</td>
                <td>{weather.temp_max}</td>
              </tr>
              <tr>
                <td>Pressure (hPa)</td>
                <td>{weather.pressure_min}</td>
                <td>{weather.pressure_max}</td>
              </tr>
              <tr>
                <td>Humidity (%)</td>
                <td>{weather.humidity_min}</td>
                <td>{weather.humidity_max}</td>
              </tr>
            </tbody>
          </table>
        ))}
      </div>
    </div>
  );
};

export default App;