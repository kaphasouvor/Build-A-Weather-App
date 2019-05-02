/* global navigator */
/* global fetch */
/* global Skycons */

window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/c41a8f9ca38a1e85243bcb84fca2dcc3/${lat},${long}`;

            fetch(api) // getting info
                .then(response => {
                    return response.json();
                })
                // getting back and storing it in data
                .then(data => {
                    // console.log(data);
                    const { temperature, summary, icon } = data.currently;

                    // set DOM elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    
                    // formula for celsius
                    let celsius = (temperature - 32) * (5/9);
                    
                    
                    //setIcons
                    setIcons(icon, document.querySelector(".icon"));

                    // change temp to Cel/fah
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === "Fahrenheit") {
                            temperatureSpan.textContent = "Celsius";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }
                        else {
                            temperatureSpan.textContent = "Fahrenheit";
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});
