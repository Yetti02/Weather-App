/*const inputField = document.getElementById('city-input');  
const searchIcon = document.getElementById('search-icon');  

inputField.addEventListener('input', function() {  
    if (inputField.value.trim() !== '') {  
      searchIcon.style.display = 'none'; // Hide the icon when typing  
    } else {  
        searchIcon.style.display = 'block'; // Show the icon when input is empty  
    }  
});  */

//main
// not working due to no api key
const searchForm = document.querySelector('.search-location');  
const cityValue = document.querySelector('.search-location input');  
const cityName = document.querySelector('.city-name p');  
const cardBody = document.querySelector('.card-body');  
const timeImage = document.querySelector('.card-top img');  
const cardInfo = document.querySelector('.back-card');  

const spitOutCelcius = (kelvin) => {  
    return Math.round(kelvin - 273.15);  
};  

const isDayTime = (icon) => icon.includes('d');  

const updateWeatherApp = (city) => {  
    console.log(city);  
    const imageName = city.weather[0].icon;  
    const iconSrc = `https://openweathermap.org/img/wn/${imageName}@2x.png`;  
    cityName.textContent = city.name;  
    cardBody.innerHTML = `
        <div class="card-mid row">  
            <div class="col-8 text-center temp">  
              <span>${spitOutCelcius(city.main.temp)}&deg;C</span>  
            </div>  
            <div class="col-4 condition-temp">  
              <p class="condition">${city.weather[0].description}</p>  
              <p class="high">${spitOutCelcius(city.main.temp_max)}&deg;C</p>  
              <p class="low">${spitOutCelcius(city.main.temp_min)}&deg;C</p>  
            </div>  
        </div>  
        <div class="icon-container card shadow mx-auto">  
            <img src="${iconSrc}" alt="" />  
        </div>  
        <div class="card-bottom px-5 py-4 row">  
            <div class="col text-center">  
              <p>${spitOutCelcius(city.main.feels_like)}&deg;C</p>  
              <span>Feels Like</span>  
            </div>  
            <div class="col text-center">  
              <p>${city.main.humidity}%</p>  
              <span>Humidity</span>  
            </div>  
        </div>  
   ` ;  
    
    timeImage.setAttribute('src', isDayTime(imageName) ? 'img/day_image.svg' : 'img/night_image.svg');  
    cityName.classList.toggle('text-black', isDayTime(imageName));  
    cityName.classList.toggle('text-white', !isDayTime(imageName));  
    
    cardInfo.classList.remove('display:none;');  
};  

const requestCity = async (city) => {  
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key  
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);  
    if (!response.ok) {  
        throw new Error("City not found");  
    }  
    return response.json();  
};  
searchForm.addEventListener('submit', e => {  
    e.preventDefault();  
    const citySearched = cityValue.value.trim();  
    if (citySearched) {  
        requestCity(citySearched)  
            .then(data => {  
                updateWeatherApp(data);  
                searchForm.reset(); // Reset the form only on success  
            })  
            .catch(error => {  
                console.error(error);  
                alert(error.message); // Display error message to user  
            });  
    } else {  
        alert('Please enter a city name.');  
    }  
});