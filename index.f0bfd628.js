async function fetchData(){return await fetch("https://api.openweathermap.org/data/2.5/weather?q=Uman&appid=798214fee8cf5a1c98981c6f53aa8c25")}fetchData().then((a=>a.json())).then((a=>console.log(a.hits)));
//# sourceMappingURL=index.f0bfd628.js.map
