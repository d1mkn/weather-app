async function fetchData() {
  const response = await fetch(
    'https://api.openweathermap.org/data/2.5/weather?q=Uman&appid=798214fee8cf5a1c98981c6f53aa8c25'
  );
  return response;
}

fetchData()
  .then(response => response.json())
  .then(data => console.log(data.hits));
