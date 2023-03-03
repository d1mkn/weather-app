import { fetchByName, fetchByCords } from './weather-api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('#api_form'),
  submitBtn: document.querySelector('[type=submit]'),
  aboutSec: document.querySelector('.about'),
  cityEl: document.querySelector('#yourCity'),
  weatherEl: document.querySelector('.current-weather'),
  tempretureEl: document.querySelector('.current-temperature'),
  windEl: document.querySelector('.current-wind'),
  timeEl: document.querySelector('.last-update'),
};

refs.form.addEventListener('submit', onSubmit);
window.addEventListener('load', function () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(findGeo);
  } else {
    x.innerHTML = 'Geolocation is not supported by this browser.';
  }
});

async function findGeo(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  //fetch
  const weatherFetch = await fetchByCords(lat, lon);
  const weatherData = weatherFetch.data;
  // to local storage
  localStorage.setItem('city', weatherData.name);
  // render
  await renderMarkup(weatherData);
}

async function onSubmit(e) {
  e.preventDefault();

  try {
    const query = e.currentTarget.query.value.trim();
    if (query === '') {
      return Notify.info('Enter the city you are looking for.');
    }
    // fetch
    const weatherFetch = await fetchByName(query);
    const weatherData = weatherFetch.data;
    // to local storage
    localStorage.setItem('city', weatherData.name);
    // render
    await renderMarkup(weatherData);
  } catch (error) {
    console.log(error);
    return Notify.failure(
      'Weather forecast for this city is currently unavailable.'
    );
  }
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
    const weatherFetch = await fetchByName(localStorage.city);
    const weatherData = weatherFetch.data;
    renderMarkup(weatherData);
  }
  return;
}

oldQueryMarkup();
