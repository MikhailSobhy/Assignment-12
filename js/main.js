var findBtn = document.querySelector(".find-btn");
var input = document.querySelector("input");
var allContainer = document.querySelector(".weather .container .all-container");
var weatherDetails = [];

async function getWeather(value = 'cairo') {
  var weather = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=eb363723c97d402bba4113334241012&q=${value}&days=3`
  );
  var result = await weather.json();
  return result;
}

findBtn.addEventListener("click", async function () {
  var city = input.value;
  weatherDetails = await getWeather(city);
  if (weatherDetails) {
    displayWeather(weatherDetails);
  } else {
    console.log("Error there is no data");
  }
});

function displayWeather(weatherDetails) {
  var date = weatherDetails.forecast.forecastday[0].date;
  var day = formatDateDay(date);
  var month = formatDateMonth(date);
  var dateTwo = weatherDetails.forecast.forecastday[1].date;
  var dayTwo = formatDateDay(dateTwo);
  var dateThree = weatherDetails.forecast.forecastday[2].date;
  var dayThree = formatDateDay(dateThree);
  var cartoona = "";
  cartoona = `<div class="show">
            <div class="row">
              <div class="col-12 col-lg-4 first-day">
                <div class="first-day-container">
                  <div class="date-details">
                    <div class="day">${day}</div>
                    <div class="date">${month}</div>
                  </div>
                  <div class="weather-details">
                    <div class="city">${weatherDetails.location.name}</div>
                    <div class="degree-details">
                      <div class="degree">${weatherDetails.current.temp_c}<sup>o</sup>C</div>
                      <div class="weather-icon"><img src="https:${weatherDetails.current.condition.icon}"/></div>
                    </div>
                    <div class="weather-status">${weatherDetails.current.condition.text}</div>
                    <div class="more-details">
                      <span class="humidity"><img src="img/icon-umberella@2x.png" alt="Umberella"> ${weatherDetails.current.humidity}%</span>
                      <span class="wind-kph"><img src="img/icon-wind@2x.png" alt="Wind"> ${weatherDetails.current.wind_kph} km/h</span>
                      <span class="wind-direction"><img src="img/icon-compass@2x.png" alt="Compass"> ${weatherDetails.current.wind_dir}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-12 col-lg-4 text-center second-day">
                <div class="day">${dayTwo}</div>
                <div class="weather-details-2">
                  <div class="weather-icon-2"><img src="https:${weatherDetails.forecast.forecastday[1].day.condition.icon}"/></div>
                  <div class="weather-degree-2">${weatherDetails.forecast.forecastday[1].day.maxtemp_c}<sup>o</sup>C</div>
                  <small>${weatherDetails.forecast.forecastday[1].day.mintemp_c}<sup>o</sup>C</small>
                  <div class="weather-status-2">${weatherDetails.forecast.forecastday[1].day.condition.text}</div>
                </div>
              </div>
              <div class="col-12 col-lg-4 text-center third-day">
                <div class="day">${dayThree}</div>
                <div class="weather-details-3">
                  <div class="weather-icon-3"><img src="https:${weatherDetails.forecast.forecastday[2].day.condition.icon}"/></div>
                  <div class="weather-degree-3">${weatherDetails.forecast.forecastday[2].day.maxtemp_c}<sup>o</sup>C</div>
                  <small>${weatherDetails.forecast.forecastday[2].day.mintemp_c}<sup>o</sup>C</small>
                  <div class="weather-status-3">${weatherDetails.forecast.forecastday[2].day.condition.text}</div>
                </div>
              </div>
            </div>
          </div>`;

  allContainer.innerHTML = cartoona;
}

function formatDateDay(dateString) {
  var date = new Date(dateString);
  var dayName = date.toLocaleString("en-US", { weekday: "long" });
  return `${dayName}`;
}

function formatDateMonth(dateString) {
  var date = new Date(dateString);
  var formattedDate = date.toLocaleString("en-US", {
    day: "numeric",
    month: "long",
  });
  return `${formattedDate}`;
}

async function defaultCall (){
    var defaultCall = await getWeather();
  displayWeather(defaultCall);
}
defaultCall()