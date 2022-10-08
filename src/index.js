//Date and time
function formateDate(date) {
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }

  let currentMinute = date.getMinutes();
  if (currentMinute < 10) {
    currentMinute = `0${currentMinute}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[now.getDay()];

  return `${currentDay} ${currentHour}:${currentMinute}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formateDate(now);

//city
function search(city) {
  let apiKey = "45003d6311c2178a0eef65ece98cd7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;

  search(city);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = city;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

search("Sydney");

//Weather and Temperature
function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

function convertToCelcius(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "45003d6311c2178a0eef65ece98cd7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(displayWeather);
}

function convertToFarenheight(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = "45003d6311c2178a0eef65ece98cd7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=imperial`).then(displayWeather);
}

let celcius = document.querySelector("#celcius-link");
celcius.addEventListener("click", convertToCelcius);

let farenheight = document.querySelector("#farenheight-link");
farenheight.addEventListener("click", convertToFarenheight);

//Current Location
function showPosition(position) {
  let apiKey = "45003d6311c2178a0eef65ece98cd7e5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}`;

  axios.get(`${apiUrl}&appid=${apiKey}&units=metric`).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getCurrentLocation);
