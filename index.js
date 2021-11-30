const api = 'eaf2517a4d67d9a320b66318638667e5';
const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const tempC = document.querySelector('.c');
const windSpeed = document.querySelector('.KPH');
const direction = document.querySelector('.°');
const airPressure = document.querySelector(`.airpressure`);
const hum = document.querySelector('.percent');
const tempF = document.querySelector('.f')
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');
const updateDOM = document.querySelector(`.lastUpdated`);
const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
window.addEventListener("submit", e=> {
    e.preventDefault();
    let inputVal = input.value;
    const base = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${api}&units=metric`;
    ScreenUpdate(base);
    msg.textContent = "";
    form.reset();
    input.focus();
});
window.addEventListener('load', () => {
    let long;
    let lat;
    // Accesing Geolocation of User
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            // Storing Longitude and Latitude in variables
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const base = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${api}&units=metric`;
            // Using fetch to get data
            ScreenUpdate(base);
        });
    }
})
function ScreenUpdate(base) {
    fetch(base)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const {temp, humidity, pressure} = data.main;
            const place = data.name;
            const {country} = data.sys;
            const {description, icon} = data.weather[0];

            const{speed, deg} = data.wind;
            const {sunrise, sunset} = data.sys;
            const value = data.dt;
            const fahrenheit = (temp * 9) / 5 + 32;
            const KPHSpeed = speed * 3.6;
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
            // Converting Epoch(Unix) time to GMT
            const sunriseGMT = new Date(sunrise * 1000);
            const sunsetGMT = new Date(sunset * 1000);
            const lastupdateGMT = new Date(value * 1000);
            // Interacting with DOM to show data
            iconImg.src = iconUrl;
            loc.textContent = `${place}, ${country.toLocaleString()}`;
            desc.textContent = `${description}`;
            tempC.textContent = `${temp.toFixed(2)} °C`;
            hum.textContent = `${humidity.toFixed(1)}%`;
            airPressure.textContent = `${pressure} hPa`;
            tempF.textContent= `${fahrenheit.toFixed(2)} °F`
            windSpeed.textContent = `${KPHSpeed.toFixed(1)} KPH`;
            direction.textContent = `${deg}°`
            sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString('en-UK')}, ${sunriseGMT.toLocaleTimeString('en-UK')}`;
            sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString('en-UK')}, ${sunsetGMT.toLocaleTimeString('en-UK')}`;
            updateDOM.textContent = `${lastupdateGMT.toLocaleDateString('en-UK')}, ${lastupdateGMT.toLocaleTimeString('en-UK')}`;
        });
}