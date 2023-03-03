import fetchWeatherData from './weather-api';

const refs = {
  form: document.querySelector('#api_form'),
  submitBtn: document.querySelector('[type=submit]'),
  cityEl: document.querySelector('#yourCity'),
  weatherEl: document.querySelector('.current-weather'),
  tempretureEl: document.querySelector('.current-temperature'),
  windEl: document.querySelector('.current-wind'),
  timeEl: document.querySelector('.last-update'),
};

refs.form.addEventListener('submit', onSubmit);

async function onSubmit(e) {
  e.preventDefault();

  const query = e.currentTarget.query.value;

  // fetch
  const weatherFetch = await fetchWeatherData(query);
  const weatherData = weatherFetch.data;
  console.log(weatherData);

  localStorage.setItem('city', weatherData.name);

  // change city
  refs.cityEl.innerHTML = weatherData.name;

  renderMarkup(weatherData);
}

async function renderMarkup(weatherData) {
  const date = new Date();
  const time = date.toLocaleTimeString() + ' ' + date.toLocaleDateString();
  refs.form.query.value = '';
  refs.cityEl.innerHTML = localStorage.city;
  refs.weatherEl.innerHTML = weatherData.weather[0].description;
  refs.tempretureEl.innerHTML = Math.floor(weatherData.main.temp) + ' C&deg';
  refs.windEl.innerHTML = weatherData.wind.speed + ' m/s';
  refs.timeEl.innerHTML = `Last Update ` + time;
}

async function oldQueryMarkup() {
  if (localStorage.city) {
    const weatherFetch = await fetchWeatherData(localStorage.city);
    const weatherData = weatherFetch.data;
    renderMarkup(weatherData);
  }
  return;
}

oldQueryMarkup();
