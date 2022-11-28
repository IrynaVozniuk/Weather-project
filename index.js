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

function showForecast(response) {
  console.log(response.data.daily);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row row-cols-1 row-cols-md-5 g-5">`;
  let days = ["Monday", "Thuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
      <div class="card h-70">
       <div class="card-body">
        <div class="weather-forecast-date">${day}</div>
        <img
          src="http://openweathermap.org/img/wn/50d@2x.png"
          alt=""
          width="50"/>
          <small id="daily-forecast-weather">Partly sunny</small>
          <div id="daily-forecast-temp"> 17°C</div>
          </div>
          </div>
        </div>`;
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
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
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

let celsTemp = null;

function showFar(event) {
  event.preventDefault();
  celTemp.classList.remove("active");
  farTemp.classList.add("active");
  document.querySelector("#temperature").innerHTML = Math.round(
    (celsTemp * 9) / 5 + 32
  );
}
function showCels(event) {
  event.preventDefault();
  celTemp.classList.add("active");
  farTemp.classList.remove("active");
  document.querySelector("#temperature").innerHTML = Math.round(celsTemp);
}
let farTemp = document.querySelector("#far");
farTemp.addEventListener("click", showFar);
let celTemp = document.querySelector("#cels");
celTemp.addEventListener("click", showCels);
rWeather("Kyiv");
