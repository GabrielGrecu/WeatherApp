const key="f66db8b21f92889a3d0dce980f840ff7";

const select=document.querySelector(".form-select");
const city=document.querySelector(".city");
const temp=document.querySelector(".temp");
const icon=document.querySelector(".icon");
const weatherType=document.querySelector(".weather-type");
const time=document.querySelector(".time");
const wind=document.querySelector(".wind");
const humidity=document.querySelector(".humidity");
const atmp=document.querySelector(".atmp");

const kelvinToCelsius=(degrees)=>{
    const celsius=degrees-273.15;
    return celsius.toFixed(1);
};

const getCities=()=>{
    fetch('cities.json',{
        method: 'GET',
    })
    .then(response=>response.json())
    .then(data=>{
        data.forEach(city=>{
            const option=document.createElement("option");
            option.value=city.id;
            option.text=city.name;

            //daca e Timisoara
            if(city.id === 665087){
                option.setAttribute("selected", true);
            }

            select.appendChild(option);
        });
    })
    .catch((error)=>{
        console.error('Error:', error);
    });
}


const getWeather=(cityId=665087)=>{
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${key}`,{
    method: 'GET',
})
    .then(response =>response.json())
    .then(data=> {
        const date = new Date();

        city.innerText=data.name;
        temp.innerText=kelvinToCelsius(data.main.temp)+'\xB0C';
        icon.src=`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherType.innerText=data.weather[0].description;
        time.innerText=`${date.toLocaleTimeString()}, ${date.toLocaleDateString()}`;
        wind.innerText=`Wind ${data.wind.speed} m/s`;
        humidity.innerText=`Humidity ${data.main.humidity}%`;
        humidity.innerText=`Humidity ${data.main.humidity}%`;
        atmp.innerText=`Pressure ${data.main.pressure} hPa`;
    })
    .catch((error)=>{
        console.error('Error:', error);
    });
}


getCities();
getWeather();
select.addEventListener("change", function(e){
    const cityId=e.target.value;
    getWeather(cityId);
});




