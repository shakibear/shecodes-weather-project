// date
let now = new Date();
let date = now.getDate();
let year = now.getFullYear();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];
let actualDate = document.querySelector("#actual-date");
actualDate.innerHTML = `${month}  ${date},   ${year}`;
// time and day
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
let hour = now.getHours();
let minute = now.getMinutes();
let actualTime = document.querySelector("#actual-time");
if (minute < 10) {
  let newMinute = `0${minute}`;
  actualTime.innerHTML = `${day} ${hour}:${newMinute}`;
}
if (hour < 10) {
  let newHour = `0${hour}`;
  actualTime.innerHTML = `${day} ${newHour}:${minute}`;
} else {
  actualTime.innerHTML = `${day} ${hour}:${minute}`;
}
// search engine
function showWeather(searchedCity) {
  let temperature = Math.round(searchedCity.data.main.temp);
  let shownTemperature = document.querySelector("#temperature");
  shownTemperature.innerHTML = temperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = searchedCity.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = searchedCity.data.wind.speed;
  let description = document.querySelector("#description");
  description.innerHTML = searchedCity.data.weather[0].main;
  let feelsLike = Math.round(searchedCity.data.main.feels_like);
  let shownFeelsLike = document.querySelector("#feels-like");
  shownFeelsLike.innerHTML = feelsLike;
  let country = document.querySelector("#country");
  country.innerHTML = searchedCity.data.sys.country;
}
function changeTemp(searchedCity) {
  let temperature = Math.round(searchedCity.data.main.temp);
  let shownTemperature = document.querySelector("#temperature");
  shownTemperature.innerHTML = temperature;
}
function search(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form");
  let result = document.querySelector("#searched-city");
  result.innerHTML = input.value;
  let apiKey = "4dabb70bffff905cdbe14c6bb466fc7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let searchInput = document.querySelector("form");
searchInput.addEventListener("submit", search);
// temperature
function clickOnF(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form");
  let result = document.querySelector("#searched-city");
  result.innerHTML = input.value;
  let apiKey = "4dabb70bffff905cdbe14c6bb466fc7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=imperial`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(changeTemp);
}
function clickOnC(event) {
  event.preventDefault();
  let input = document.querySelector("#search-form");
  let result = document.querySelector("#searched-city");
  result.innerHTML = input.value;
  let apiKey = "4dabb70bffff905cdbe14c6bb466fc7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}
let changeToF = document.querySelector("#fahrenheit");
changeToF.addEventListener("click", clickOnF);
let changeToC = document.querySelector("#celcius");
changeToC.addEventListener("click", clickOnC);
// current location
function showCurrentWeather(city) {
  let currentCity = document.querySelector("#searched-city");
  currentCity.innerHTML = city.data.name;
  let temperature = Math.round(city.data.main.temp);
  let shownTemperature = document.querySelector("#temperature");
  shownTemperature.innerHTML = temperature;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = city.data.main.humidity;
  let wind = document.querySelector("#wind");
  wind.innerHTML = city.data.wind.speed;
  let description = document.querySelector("#description");
  description.innerHTML = city.data.weather[0].main;
  let feelsLike = Math.round(city.data.main.feels_like);
  let shownFeelsLike = document.querySelector("#feels-like");
  shownFeelsLike.innerHTML = feelsLike;
  let country = document.querySelector("#country");
  country.innerHTML = city.data.sys.country;
}
function locationWeather(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "4dabb70bffff905cdbe14c6bb466fc7b";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showCurrentWeather);
}
function getLocation() {
  navigator.geolocation.getCurrentPosition(locationWeather);
}
let locationButton = document.querySelector("#location-button");
locationButton.addEventListener("click", getLocation);
