
const searchWindow=document.getElementById('main');
const infoWindow=document.querySelector('.info');
const infoBtn=document.getElementById('about-btn');
const mainBtn=document.getElementById('home');
infoBtn.addEventListener('click',()=>{
    searchWindow.style.display='none';
    infoWindow.style.display='block';
})
mainBtn.addEventListener('click',()=>{
    searchWindow.style.display='block';
    infoWindow.style.display='none';
})
searchBtn=document.getElementById('btn');
searchBtn.addEventListener('click',get);
document.getElementById('entery').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') get();
});
var weatherStatus;
var isday;

function getWeatherDescription(code) {
  const weather = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Freezing fog",
    51: "Light drizzle",
    53: "Moderate drizzle",
    55: "Dense drizzle",
    61: "Slight rain",
    63: "Moderate rain",
    65: "Heavy rain",
    71: "Slight snow",
    73: "Moderate snow",
    75: "Heavy snow",
    80: "Slight rain showers",
    81: "Moderate rain showers",
    82: "Violent rain showers",
    95: "Thunderstorm",
    96: "Thunderstorm with slight hail",
    99: "Thunderstorm with heavy hail"
  };

  return weather[code] ?? "Unknown weather";
}
function getWindDirection(degrees) {
    const directions = [
        "N", "NE", "E", "SE",
        "S", "SW", "W", "NW"
    ];

    return directions[Math.round(degrees / 45) % 8];
}


async function get() {
    const cityName = document.getElementById('entery').value.trim();

    if (!cityName) {
        return;
    }

    const controller = new AbortController();

    let isTimeout = false;

    const timeout = setTimeout(() => {
        isTimeout = true;
        controller.abort();
    }, 8000);

    const loader = document.querySelector('.load');
    const error = document.querySelector('#err');
    const table = document.querySelector('.table');

    loader.style.display = 'flex';
    error.style.display = 'none';
    table.style.display = 'none';

    try {
        // Step 1: Geocoding API

        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=en&format=json`,
            { signal: controller.signal }
        );

        if (!geoRes.ok) {
            throw new Error('GEOCODING_ERROR');
        }

        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            throw new Error('CITY_NOT_FOUND');
        }

        const place = geoData.results[0];

        const latitude = place.latitude;
        const longitude = place.longitude;

        // Step 2: Weather API

        const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,weather_code,wind_speed_10m,wind_direction_10m&timezone=auto`,
            { signal: controller.signal }
        );

        if (!res.ok) {
            throw new Error('WEATHER_API_ERROR');
        }

        const data = await res.json();

        if (!data.current) {
            throw new Error('INVALID_WEATHER_DATA');
        }

        // Step 3: Display data

        const current = data.current;

        document.getElementById('loc').textContent =
            `${place.name}, ${latitude.toFixed(2)}° N, ${longitude.toFixed(2)}° E`;

        document.getElementById('time').textContent =
            current.time.slice(11, 16);

        document.getElementById('tmp').textContent =
            `${getWeatherDescription(current.weather_code)} ${current.temperature_2m}° Feels like ${current.apparent_temperature}°`;

        document.getElementById('wind').textContent =
            `${current.wind_speed_10m} km/h Direction: ${getWindDirection(current.wind_direction_10m)}`;

        weatherStatus = getWeatherDescription(current.weather_code);
        isday = current.is_day === 1;

        del();
        CheckUi();
        day();

        table.style.display = 'grid';

    } catch (err) {

        console.error(err);

        if (isTimeout) {
            error.textContent = 'Request Timeout! Please try again.';
        }
        else if (err.name === 'AbortError') {
            error.textContent = 'Request Cancelled!';
        }
        else if (err.message === 'CITY_NOT_FOUND') {
            error.textContent = 'City not found!';
        }
        else if (err.message === 'GEOCODING_ERROR') {
            error.textContent = 'Unable to search for this city!';
        }
        else if (err.message === 'WEATHER_API_ERROR') {
            error.textContent = 'Weather service error!';
        }
        else {
            error.textContent = 'Network Error! Please check your connection.';
        }

        error.style.display = 'block';

    } finally {

        clearTimeout(timeout);
        loader.style.display = 'none';

    }
}

function del(){
    document.querySelector('.snow').style.display='none';
    document.querySelector('.rainy').style.display='none';
    document.querySelector('.mist').style.display='none';
    document.querySelector('.sun').style.display='none';
    document.querySelector('.clouds').style.display='none';
    document.querySelector('.moon').style.display='none';
}
function day(){
     if(isday){
        document.querySelector('.sun').style.display='inline';
    }
    else{
        document.querySelector('.moon').style.display='inline';
    }
}
function CheckUi(){
     document.querySelector('.animated').style.display='block'
    if (weatherStatus.includes("Snow") || (weatherStatus.includes("snow")){
        snow();
        document.querySelector('.snow').style.display='inline';
    }
    if (weatherStatus.includes("Rain") || weatherStatus.includes("rain")){
        rain();
        document.querySelector('.rainy').style.display='inline';
    }
    if (weatherStatus.includes("Fog") || (weatherStatus.includes("fog")){
        document.querySelector('.mist').style.display='inline';
    }
    if (weatherStatus.includes("Sunny")){
        document.querySelector('.sun').style.display='inline';
    }
    if (weatherStatus.includes("Cloudy") || (weatherStatus.includes("Thunderstorm")) || weatherStatus.includes("Overcast") || weatherStatus.includes("Partly")){
        document.querySelector('.clouds').style.display='inline';
    }
    if (weatherStatus.includes("clear")){
        document.querySelector('.animated').style.display='none'
    }
}

function rain(){
    const rainy=document.querySelector('.rainy')
    for(let i=0 ;i<100;i++){
        let drop=document.createElement('div');
        drop.className='drop';
        drop.style.left=Math.random(0,10)*100 + "%";
        drop.style.animationDuration=(0.2 + Math.random(0,10))+'s';
        rainy.appendChild(drop);
        rainy.appendChild(drop);
    }
}
function snow(){
    const snowy=document.querySelector('.snow');
    for(let i=0 ;i<100;i++){
        let drop=document.createElement('div');
        drop.className='snowDrops';
        drop.innerHTML='<div class="d1"></div><div class="d2"></div><div class="d3"></div><div class="d4"></div>'
        drop.style.left=Math.random(0,10)*100 + "%";
        drop.style.animationDuration=(1.5 + Math.random(0,10))+'s';
        snowy.appendChild(drop);
    }
}
