import axios from 'axios';

const API_KEY = '1635890035cbba097fd5c26c8ea672a1';  // Replace with your OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

export const getWeatherByCity = async (city) => {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        q: city,
        units: 'metric',
        appid: API_KEY,
      },
    });

    const dailyData = {};

    response.data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyData[date]) {
        dailyData[date] = {
          temp_min: item.main.temp,
          temp_max: item.main.temp,
          pressure_min: item.main.pressure,
          pressure_max: item.main.pressure,
          humidity_min: item.main.humidity,
          humidity_max: item.main.humidity,
        };
      } else {
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp);
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp);
        dailyData[date].pressure_min = Math.min(dailyData[date].pressure_min, item.main.pressure);
        dailyData[date].pressure_max = Math.max(dailyData[date].pressure_max, item.main.pressure);
        dailyData[date].humidity_min = Math.min(dailyData[date].humidity_min, item.main.humidity);
        dailyData[date].humidity_max = Math.max(dailyData[date].humidity_max, item.main.humidity);
      }
    });

    return Object.entries(dailyData).slice(0, 5).map(([date, data]) => ({ date, ...data }));
  } catch (error) {
    console.error("Error fetching weather data: ", error);
    throw error;
  }
};