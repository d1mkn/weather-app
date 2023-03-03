import axios from 'axios';

const API_KEY = '798214fee8cf5a1c98981c6f53aa8c25';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

axios.defaults.baseURL = BASE_URL;

async function fetchByName(query) {
  const response = await axios.get(
    `?q=${query}&appid=${API_KEY}&wind=wind.speed.unit&lastupdate=lastupdate.value&units=metric`
  );
  return response;
}

async function fetchByCords(latitude, longitude) {
  const response = await axios.get(
    `?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&wind=wind.speed.unit&lastupdate=lastupdate.value&units=metric`
  );
  return response;
}

export { fetchByName, fetchByCords };
