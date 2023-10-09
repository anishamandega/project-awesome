let now = new Date()
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()]
let hours = now.getHours()
let minutes = now.getMinutes()

let dateofDay = document.getElementById("day");
dateofDay.innerHTML = `${day} ${hours}:${minutes} `

function showWeather(response) {
    // feature for the current city
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${response.data.name}`;

  // feature for the waether 
  let temp = document.querySelector("#today");
  let temperature = Math.round(response.data.main.temp);
  temp.innerHTML = `${temperature}°`;

  // feature for the wind
  let wind = document.querySelector("#wind");
  let windSpeed = Math.round(response.data.wind.speed);
  wind.innerHTML = `Wind: ${windSpeed}km/h`

  // feature for the humididity
  let humidity = document.querySelector("#humidity");
  let hum = Math.round(response.data.main.humidity);
  humidity.innerHTML = `Humidity: ${hum}%`;

  let clouds = document.querySelector("#clouds");
  clouds.innerHTML = `${response.data.weather[0].description}`;
}

function searchCity(event) {
    event.preventDefault(); // Prevent form submission
    let apiKey = "28aaa5c4dd44bf0ec5a104a52b1dc567";
    let city = document.querySelector("#search").value;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    axios.get(apiUrl).then(showWeather);
}

function retrievePosition(position) {
    let apiKey = "28aaa5c4dd44bf0ec5a104a52b1dc567";
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    axios.get(url).then(showWeather);
}

function getLocationAndWeather(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(retrievePosition);
}


let searchForm = document.querySelector("#search-form");
let currentLocationButton = document.querySelector("#current-location");


searchForm.addEventListener("submit", searchCity);
currentLocationButton.addEventListener("click", getLocationAndWeather);