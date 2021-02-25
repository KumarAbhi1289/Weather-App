var loc = document.getElementById('location');
var date = document.getElementById('date');
var weather = document.getElementById('weather');
var temp = document.getElementById('temp');
var humidity = document.getElementById('humidity');
var desc = document.getElementById('desc');
var d = new Date()
var days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
var day = days[d.getDay()];
var months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
var month = months[d.getMonth()];
var getDate = d.getDate();
var year = d.getFullYear();
var hours = d.getHours();
var meridiem = 'AM';
if(hours > 11){
    meridiem = 'PM';
}
var min = d.getMinutes();
var xhr = new XMLHttpRequest();


// jab tak location na pata ho tab tak mumbai ka dikahyga
xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        var getJsonData = this.responseText;
        getObjData = JSON.parse(getJsonData);
        city = getObjData.name;
        if(getObjData.sys.country == 'IN'){
            country = 'India';
        }
        else{
            country = getObjData.sys.country;
        }
        city = loc.innerHTML = city +", " +country;
        temp.innerHTML = ((getObjData.main.temp - 273.15).toPrecision(4))+ "°C";
        humidity.innerHTML = "Humidity: "+ getObjData.main.humidity+ "% <strong>|</strong> Pressure: "+ getObjData.main.pressure+ " mbar";
        date.innerHTML = `${day} <strong>|</strong> ${getDate} ${month} ${year} <strong>|</strong> ${hours}:${min} ${meridiem}`;
        desc.innerHTML = "<strong>Weather Description:</strong> "+ getObjData.weather[0].description
        weather.style.backgroundImage = "url('./icons/"+ getObjData.weather[0].icon +".png')";
        
    }
}
xhr.open('GET', "https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=ace04b89d96491487b0fe5f67b115e5d", true)
xhr.send()



// location pata chal gaya
navigator.geolocation.getCurrentPosition(getSuccess, getError);
function getSuccess(position){
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    //  api.openweathermap.org/data/2.5/weather?lat=26.8467088&lon=80.9461592&appid=ace04b89d96491487b0fe5f67b115e5d
    xhr.onreadystatechange = function() {
        if(this.readyState == 4 && this.status == 200){
            var getJsonData = this.responseText;
            getObjData = JSON.parse(getJsonData);
            city = getObjData.name;
            if(getObjData.sys.country == 'IN'){
                country = 'India';
            }
            else{
                country = getObjData.sys.country;
            }
            city = loc.innerHTML = city +", " +country;
            console.log(city, country);
            temp.innerHTML = ((getObjData.main.temp - 273.15).toPrecision(4))+ "°C";
            humidity.innerHTML = "Humidity: "+ getObjData.main.humidity+ "% <strong>|</strong> Pressure: "+ getObjData.main.pressure+ " mbar";
            date.innerHTML = `${day} <strong>|</strong> ${getDate} ${month} ${year} <strong>|</strong> ${hours}:${min} ${meridiem}`;

            // if (getObjData.weather[0].id >= 200 && getObjData.weather[0].id < 300){
            //     weather.style.background = 'http://openweathermap.org/img/wn/11d@2x.png';
            // }
            desc.innerHTML = "<strong>Weather Description:</strong> "+ getObjData.weather[0].description
            weather.style.backgroundImage = "url('./icons/"+ getObjData.weather[0].icon +".png')";
        }
    }
    xhr.open('GET', "https://cors-anywhere.herokuapp.com/api.openweathermap.org/data/2.5/weather?lat="+ lat+ "&lon="+ lon+ "&appid=ace04b89d96491487b0fe5f67b115e5d", true)
    xhr.send()
}
function getError(){
    console.log("Error")
}