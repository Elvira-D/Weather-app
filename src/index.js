
var today = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
let day = days[today.getDay()];
var minutes = today.getMinutes();
if (minutes < 10) {
    minutes = "0" + minutes;
}
var date = day + " " + today.getHours() + ":" + minutes;
let time = document.querySelector("#date");
time.innerHTML = date;

function searchCity(event) {
    event.preventDefault();
    let input = document.querySelector("#search-city").value;
    let newcity = document.querySelector("#city");
    let cityName = document.getElementById("search-city").value;
    let apiKey = "4820a880cf32920cd905490b92fa0630";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    axios.get(`${url}&appid=${apiKey}`).then(showWeather);
    newcity.innerHTML = input;
}

let showCity = document.querySelector("#search");
showCity.addEventListener("click", searchCity);

function fah(event) {
    event.preventDefault();
    let fahrenheit = document.querySelector("#min");
    fahrenheit.innerHTML = "52";
}

let f1 = document.querySelector("#f1");
f1.addEventListener("click", fah);

function maxFahrenheit(event) {
    event.preventDefault();
    let fahrenheit2 = document.querySelector("#max");
    fahrenheit2.innerHTML = "72";
}

let f2 = document.querySelector("#f2");
f2.addEventListener("click", maxFahrenheit);

function showWeather(response) {
    let minTemperature = Math.round(response.data.main.temp_min);
    let temperatureElement1 = document.querySelector("#min");
    temperatureElement1.innerHTML = `${minTemperature}`;
    let maxTemperature = Math.round(response.data.main.temp_max);
    let temperatureElement2 = document.querySelector("#max");
    temperatureElement2.innerHTML = `${maxTemperature}`;
    let currentTemperature = Math.round(response.data.main.temp);
    let currentTemp = document.querySelector("#current-temperature");
    currentTemp.innerHTML = `Current Temperature ${currentTemperature}℃`;
    currentTemp.innerHTML = currentTemp.innerHTML.bold();

}

function currentPosition(position, response) {
    let apiKey = "4820a880cf32920cd905490b92fa0630";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    axios.get(url).then(showWeather);
}


let button = document.querySelector("button");
button.addEventListener("click", currentPosition);

function displayWeatherCondition(response) {
    document.querySelector("#city").innerHTML = response.data.name;
}

let currentLocationButton = document.querySelector("button");
currentLocationButton.addEventListener("click", displayWeatherCondition);

navigator.geolocation.getCurrentPosition(currentPosition);

