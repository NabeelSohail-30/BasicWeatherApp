const weatherBackgrounds = {
    Clear: 'clear.jpg',
    Clouds: {
        801: 'clouds801.jpg',
        802: 'clouds802.jpg',
        803: 'clouds803.jpg',
        804: 'clouds804.jpg'
    },
    Haze: 'haze.jpg',
    Fog: 'fog.jpg',
    Mist: 'mist.jpg',
    Smoke: 'smoke.jpg',
    Snow: {
        600: 'light_snow.jpg',
        601: 'light_snow.jpg', // Using the same image for 600 and 601
        602: 'snow.jpg',
        611: 'snow.jpg', // Using the same image for various snow conditions
        612: 'snow.jpg',
        613: 'snow.jpg',
        615: 'snow_rain.jpg',
        616: 'snow_rain.jpg', // Using the same image for 615 and 616
        620: 'snow_shower.jpg',
        621: 'snow_shower.jpg',
        622: 'snow_shower.jpg'
    },
    Rain: {
        500: 'rain.jpg',
        501: 'rain.jpg',
        502: 'heavyrain.jpg',
        503: 'heavyrain.jpg',
        504: 'heavyrain.jpg',
        520: 'heavyrain.jpg',
        521: 'heavyrain.jpg',
        522: 'heavyrain.jpg',
        531: 'heavyrain.jpg',
        511: 'snow_rain.jpg'
    },
    Thunderstorm: {
        200: 'thunderRain.jpg',
        201: 'thunderRain.jpg',
        202: 'thunderRain.jpg',
        210: 'thunder.jpg',
        211: 'thunder.jpg',
        212: 'heavyThunder.jpg',
        221: 'heavyThunder.jpg',
        230: 'heavyThunder.jpg',
        231: 'heavyThunder.jpg',
        232: 'heavyThunder.jpg'
    },
    Drizzle: 'rain.jpg',
    Default: 'base.jpg'
};

const apiKey = '6a6cb112b4746fd1d963422db62a0782';
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

const getWeather = async () => {
    try {
        const body = document.querySelector("body");
        const city = document.querySelector("#city").value;

        let location;
        if (city) {
            const cityCoordinates = await getCoordinatesForCity(city);
            location = { latitude: cityCoordinates.lat, longitude: cityCoordinates.lon };
        } else {
            location = await getCurrentLocation();
        }

        const weatherData = await fetchWeatherData(location.latitude, location.longitude);
        const forcastData = await fetchForcastData(location.latitude, location.longitude);

        document.querySelector('#city').value = '';

        updateWeatherDetails(weatherData);
        updateForcast(forcastData);
        updateBackground(weatherData.weather[0].main, weatherData.weather[0].id);
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

const getCoordinatesForCity = async (city) => {
    const geocodingApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(geocodingApiUrl);
        if (response.ok) {
            const data = await response.json();
            const coordinates = {
                lat: data.coord.lat,
                lon: data.coord.lon
            };
            return coordinates;
        } else {
            throw new Error('City not found');
        }
    } catch (error) {
        throw error;
    }
};


const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
            (success) => {
                const { latitude, longitude } = success.coords;
                resolve({ latitude, longitude });
            },
            (error) => {
                reject(error);
            }
        );
    });
};

const fetchWeatherData = async (latitude, longitude) => {
    const url = `${apiUrl}weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    return await response.json();
};

const fetchForcastData = async (latitude, longitude) => {
    const url = `${apiUrl}forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&exclude=hourly,minutely&units=metric`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch weather data");
    }
    return await response.json();
};

const updateWeatherDetails = (weatherData) => {
    console.log(weatherData);
    const cityName = weatherData.name;
    const description = weatherData.weather[0].description;
    const main = weatherData.main;
    const wind = weatherData.wind;

    const currentWeather = `
        <div class="details">
            <h2>${cityName} (${description})</h2>
            <h6>Temperature: ${main.temp}°C</h6>
            <h6>Feels Like: ${main.feels_like}°C</h6>
            <h6>Max Temperature: ${main.temp_max}°C</h6>
            <h6>Min Temperature: ${main.temp_min}°C</h6>
            <h6>Wind: ${wind.speed} M/S</h6>
            <h6>Humidity: ${main.humidity}%</h6>
        </div>`;

    document.querySelector('.current-weather').innerHTML = currentWeather;
};

const updateForcast = (forcastData) => {
    // console.log('forcastData', forcastData.list);

    const data = forcastData.list;

    let day = 1;
    data.forEach(element => {
        // console.log(element);
        const forecastDate = new Date(element.dt * 1000); // Convert UNIX timestamp to JavaScript Date object
        const forecastDay = forecastDate.toLocaleDateString('en-US', { weekday: 'long' }); // Get day of the week

        if (forecastDate.getHours() === 14) {
            console.log(element);
            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');

            const dayHeader = document.createElement('h3');
            dayHeader.textContent = `Day ${day}`;

            const dateElement = document.createElement('h6');
            dateElement.textContent = `${forecastDay} - ${forecastDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;

            const tempElement = document.createElement('h6');
            tempElement.textContent = `Temperature: ${element.main.temp}°C`;

            const windElement = document.createElement('h6');
            windElement.textContent = `Wind: ${element.wind.speed} M/S`;

            const humidityElement = document.createElement('h6');
            humidityElement.textContent = `Humidity: ${element.main.humidity}%`;

            weatherCard.appendChild(dayHeader);
            weatherCard.appendChild(dateElement);
            weatherCard.appendChild(tempElement);
            weatherCard.appendChild(windElement);
            weatherCard.appendChild(humidityElement);

            document.querySelector('.forecast').appendChild(weatherCard);
            day = day + 1;
        }
    });
};

const updateBackground = (weatherMain, weatherId) => {
    const getImageUrl = (condition, id) => {
        if (weatherBackgrounds[condition]) {
            return typeof weatherBackgrounds[condition] === 'string'
                ? `url("Images/${weatherBackgrounds[condition]}")`
                : `url("Images/${weatherBackgrounds[condition][id]}")`;
        }
        return `url("Images/${weatherBackgrounds.Default}")`;
    };

    const imageUrl = getImageUrl(weatherMain, weatherId);
    document.querySelector("body").style.backgroundImage = imageUrl;
};

getWeather();