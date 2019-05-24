window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone')
  let tempSection = document.querySelector('.temperature');
  let tempSpan = document.querySelector('.temperature span')

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}https://api.darksky.net/forecast/6bdbd96749d4ccb4ee190b8cccd0ff8f/${lat},${long}`;

      fetch(api)
      .then(response => response.json())
      .then(data => {
        const { temperature, summary, icon } = data.currently;
        // Set DOM Elements from the API
        temperatureDegree.textContent = temperature;
        locationTimezone.textContent = data.timezone;
        temperatureDescription.textContent = summary;
        setIcons(icon, document.querySelector('.icon'));

        //Change between F and C
        tempSection.addEventListener('click', () => {
          if(tempSpan.textContent === 'F') {
            let cTemp = ((parseFloat(temperature) - 32) * (5/9));
            temperatureDegree.textContent = cTemp.toFixed(2);
            tempSpan.textContent = 'C';
          } else {
            tempSpan.textContent = 'F';
            temperatureDegree.textContent = temperature;
          }
        })
      });
    });
  }
  
  function setIcons (icon, iconID) {
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID,  Skycons[currentIcon]);
  }
})