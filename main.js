const api = {
    key: "b58a2bc7dfc2d4b6e251714287d28055",
    base: "https://api.openweathermap.org/data/2.5/"
}

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);

function setQuery(evt){
    if(evt.keyCode == 13){
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

function getResults(query){
    fetch(`${api.base}/weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults);
}

function displayResults(weather){
    let city = document.querySelector('.location .city');
    city.innerText =  `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${(weather.main.temp).toFixed(2)}<span>°c</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
  
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${(weather.main.temp_min).toFixed(2)}°c / ${(weather.main.temp_max).toFixed(2)}°c`;
}

function dateBuilder(d){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September",
                    "October", "November", "December"];
    const days = ["Sun","Mon","Tues","Wed","thurs","Fri","Sat"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}