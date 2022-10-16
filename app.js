let getWeather = () => {

    let cityName = document.querySelector("#city").value;
    document.querySelector(".main").style.display = "block";

    axios.get(`https://api.openweathermap.org/data/2.5/weather?units=metric&appid=6a6cb112b4746fd1d963422db62a0782&q=${cityName}`)
        .then(function (response) {
            console.log("response is success");
            console.log(response.data);


            document.querySelector("#main-data").innerHTML = `${response.data.name} ${response.data.main.temp}<sup>o</sup>C`;
            document.querySelector("#icon").src = `http://openweathermap.org/img/wn/${response.data.weather[0].weathericon}.png`;
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

        })
        .catch(function (error) {
            console.log(error);
        })
}
