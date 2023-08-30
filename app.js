let getWeather = () => {

    let body = document.querySelector("body");

    navigator.geolocation.getCurrentPosition(async (success) => {
        const { latitude, longitude } = success.coords;
    });

    axios.get(`https://api.openweathermap.org/data/2.5//forecast?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=6a6cb112b4746fd1d963422db62a0782&q=${cityName}`)
        .then(function (response) {
            console.log("response is success");
            console.log(response.data);

            const currentWeather = `<div class="details" >
                                    <h2>${cityName} ( ${response.data.weather[0].description} )</h2>
                                    <h6>Temperature: ${response.data.main.temp}°C</h6>
                                    <h6>Feels Like: ${response.data.main.feels_like}°C</h6>
                                    <h6>Max Temperature: ${response.data.main.temp_max}°C</h6>
                                    <h6>Min Temperature: ${response.data.main.temp_min}°C</h6>
                                    <h6>Wind: ${response.data.wind.speed} M/S</h6>
                                    <h6>Humidity: ${response.data.main.humidity}%</h6>
                                    </div>`;

            document.querySelector('.current-weather').innerHTML = currentWeather;

            let weatherMain = response.data.weather[0].main;

            if (weatherMain == 'Clear') {
                body.style.backgroundImage = 'url("Images/clear.jpg")';
            }
            else if (weatherMain == 'Clouds') {
                let weatherId = response.data.weather[0].id;
                switch (weatherId) {
                    case 801:
                        body.style.backgroundImage = 'url("Images/clouds801.jpg")';
                        break;
                    case 802:
                        body.style.backgroundImage = 'url("Images/clouds802.jpg")';
                        break;
                    case 803:
                        body.style.backgroundImage = 'url("Images/clouds803.jpg")';
                        break;
                    case 804:
                        body.style.backgroundImage = 'url("Images/clouds804.jpg")';
                        break;
                }
            }
            else if (weatherMain == 'Haze') {
                body.style.backgroundImage = 'url("Images/haze.jpg")';
            }
            else if (weatherMain == 'Fog') {
                body.style.backgroundImage = 'url("Images/fog.jpg")';
            }
            else if (weatherMain == 'Mist') {
                body.style.backgroundImage = 'url("Images/mist.jpg")';
            }
            else if (weatherMain == 'Smoke') {
                body.style.backgroundImage = 'url("Images/smoke.jpg")';
            }
            else if (weatherMain == 'Snow') {
                let weatherId = response.data.weather[0].id;
                switch (weatherId) {
                    case 600:
                    case 601:
                        body.style.backgroundImage = 'url("Images/light_snow.jpg")';
                        break;
                    case 602:
                    case 611:
                    case 612:
                    case 613:
                        body.style.backgroundImage = 'url("Images/snow.jpg")';
                        break;
                    case 615:
                    case 616:
                        body.style.backgroundImage = 'url("Images/snow_rain.jpg")';
                        break;
                    case 620:
                    case 621:
                    case 622:
                        body.style.backgroundImage = 'url("Images/snow_shower.jpg")';
                        break;
                }
            }
            else if (weatherMain == 'Rain') {
                let weatherId = response.data.weather[0].id;
                switch (weatherId) {
                    case 500:
                    case 501:
                        body.style.backgroundImage = 'url("Images/rain.jpg")';
                        break;
                    case 503:
                    case 504:
                    case 502:
                    case 520:
                    case 521:
                    case 522:
                    case 531:
                        body.style.backgroundImage = 'url("Images/heavyrain.jpg")';
                        break;
                    case 511:
                        body.style.backgroundImage = 'url("Images/snow_rain.jpg")';
                        break;
                }
            }
            else if (weatherMain == 'Thunderstorm') {
                let weatherId = response.data.weather[0].id;
                switch (weatherId) {
                    case 200:
                    case 201:
                    case 202:
                        body.style.backgroundImage = 'url("Images/thunderRain.jpg")';
                        break;
                    case 212:
                    case 221:
                    case 230:
                    case 231:
                    case 232:
                        body.style.backgroundImage = 'url("Images/heavyThunder.jpg")';
                        break;
                    case 210:
                    case 211:
                        body.style.backgroundImage = 'url("Images/thunder.jpg")';
                        break;
                }
            }
            else if (weatherMain == 'Drizzle') {
                body.style.backgroundImage = 'url("Images/rain.jpg")';
            }
            else {
                body.style.backgroundImage = 'url("Images/base.jpg")';
            }

        })
        .catch(function (error) {
            console.log(error);
        })
}

// function getCityCoordinates() {
//     navigator.geolocation.getCurrentPosition(
//         position => {
//             const { latitude, longitude } = position.coords; // Get coordinates of user location
//             // Get city name from coordinates using reverse geocoding API
//             const API_URL = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=6a6cb112b4746fd1d963422db62a0782&q`;
//             fetch(API_URL).then(response => response.json()).then(data => {
//                 const { name } = data[0];
//                 getWeatherDetails(name, latitude, longitude);
//             }).catch(() => {
//                 alert("An error occurred while fetching the city name!");
//             });
//         },
//         error => { // Show alert if user denied the location permission
//             if (error.code === error.PERMISSION_DENIED) {
//                 alert("Geolocation request denied. Please reset location permission to grant access again.");
//             } else {
//                 alert("Geolocation request error. Please reset location permission.");
//             }
//         });
// }