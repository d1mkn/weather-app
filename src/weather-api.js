import axios from 'axios';

const API_KEY = '798214fee8cf5a1c98981c6f53aa8c25';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

axios.defaults.baseURL = BASE_URL;

export default async function fetchWeatherData(query) {
  const response = await axios.get(
    `?q=${query}&appid=${API_KEY}&wind=wind.speed.unit&lastupdate=lastupdate.value&units=metric`
  );
  return response;
}
