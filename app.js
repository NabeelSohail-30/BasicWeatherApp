let getWeather = () => {

    let cityName = document.querySelector("#city").value;
    document.querySelector(".main").style.display = "block";

    let body = document.querySelector("body");

    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=6a6cb112b4746fd1d963422db62a0782&q=${cityName}`)
        .then(function (response) {
            console.log("response is success");
            console.log(response.data);


            document.querySelector("#main-data").innerHTML = `${response.data.name} ${response.data.main.temp}<sup>o</sup>C`;
            document.querySelector("#icon").src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`;
            document.querySelector("#weather").value = response.data.weather[0].main;
            document.querySelector("#weatherDesc").value = response.data.weather[0].description;
            document.querySelector("#temp").value = response.data.main.temp;
            document.querySelector("#feelsLike").value = response.data.main.feels_like;
            document.querySelector("#maxTemp").value = response.data.main.temp_max;
            document.querySelector("#minTemp").value = response.data.main.temp_min;
            document.querySelector("#pressure").value = response.data.main.pressure;
            document.querySelector("#humidity").value = response.data.main.humidity;
            document.querySelector("#visibility").value = response.data.visibility;
            document.querySelector("#windSpeed").value = response.data.wind.speed;
            document.querySelector("#windDirection").value = response.data.wind.deg;
            document.querySelector("#cloud").value = response.data.clouds.all;


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
