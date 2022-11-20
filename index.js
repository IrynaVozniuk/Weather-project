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
}
function rWeather(city) {
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
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
