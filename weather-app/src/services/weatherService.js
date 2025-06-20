import axios from 'axios';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export const getWeatherByCity = async (city) => {
  if (!city) throw new Error("City name is required");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city.trim()
  )}&appid=${API_KEY}&units=metric&lang=en`;

  const response = await axios.get(url);
  return response.data;
};

export const getWeatherByCoordinates = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=en`;

  const response = await axios.get(url);
  return response.data;
};
