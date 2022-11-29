let now = new Date();
let months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
let month = months[now.getMonth()];
if (month < 10) {
  month = "0" + month;
}
let date = now.getDate();
if (date < 10) {
  date = "0" + date;
}
let year = now.getFullYear();
let currentDate = date + "." + month + "." + year;
let dateWindow = document.querySelector("#cDate");
dateWindow.innerHTML = currentDate;
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let dayWindow = document.querySelector("#cDay");
dayWindow.innerHTML = day;
let hour = now.getHours();
if (hour < 10) {
  hour = "0" + hour;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
}
let currentTime = hour + " : " + minutes;
let timeWindow = document.querySelector("#cTime");
timeWindow.innerHTML = currentTime;
function formatDayForecast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}
function showForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-2 row-cols-md-5 g-5">`;
  let days = [
    "Sunday",
    "Monday",
    "Thuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
      <div class="card h-70">
       <div class="card-body">
        <div class="weather-forecast-date">${formatDayForecast(
          forecastDay.dt
        )}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="60"/>
          <div id="daily-forecast-weather">        ${
            forecastDay.weather[0].main
          }</div>
          <div id="daily-forecast-temp-max">${Math.round(
            forecastDay.temp.max
          )}°C</div>
          <span id="daily-forecast-temp-min">${Math.round(
            forecastDay.temp.min
          )}°C</span>
          </div>
          </div>
        </div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}
function showTemp(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  let icona = document.querySelector("#icon");
  icona.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsTemp = response.data.main.temp;
  document.querySelector("#temperature").innerHTML = Math.round(celsTemp);
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#humid").innerHTML = response.data.main.humidity;
  document.querySelector("#weather").innerHTML = response.data.weather[0].main;
  getForecast(response.data.coord);
}
function rWeather(city) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}
function searching(event) {
  event.preventDefault();
  let search = document.querySelector("#userCity");
  let city = search.value;
  rWeather(city);
}
function searchUser(position) {
  let apiKey = "85bbd3d16a2dfe0ecf253c7ae1e8fe03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchUser);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", searching);
let userLocation = document.querySelector("#location");
userLocation.addEventListener("click", getCurrentLocation);

rWeather("Kyiv");
