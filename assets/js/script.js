var historyUser = [];


function getApi(cityName) {
var fiveDayForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=imperial&appid=537c5082f054c67490bdd35711142b24`;

var currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=537c5082f054c67490bdd35711142b24`;

$.ajax({
   url: fiveDayForecast,
     method: 'GET'
 })
.then (function (response) {
      
var currentDate = moment().format("M/DD/YYYY");
    $("#city").text(response.city.name + " " + currentDate);
for (i = 5; i < response.list.length; i += 8) { 

var j = i.toString();        

var dateEl = $("<li>");
    dateEl.text(moment(response.list[i].dt_txt).format('M/D/YYYY')); 
    dateEl.attr("class", "bolder");
           
var tempEl = $("<li>");
    tempEl.text("Temp: " + response.list[i].main.temp + String.fromCharCode(176) + "F");

var windEl = $("<li>");
    windEl.text("Wind: " + response.list[i].wind.speed + " MPH");
var humidityEl = $("<li>");
    humidityEl.text("Humidity: " + response.list[i].main.humidity + "%");

var iconEl = $("<img>");
    iconEl.attr("class", "futureIcon");
            
var iconCode = response.list[i].weather[0].icon;
var iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;
    iconEl.attr("src", iconUrl);
        $("#" + j).append(dateEl);
        $("#" + j).append(iconEl);
        $("#" + j).append(tempEl);
        $("#" + j).append(windEl);
        $("#" + j).append(humidityEl);
    }
})
   

.catch (function (error) {
    console.log(error.responseJSON.cod, error.responseJSON.message);
 })

 $.ajax({
    url: currentWeather,
    method: 'GET',
})

.then(function (response) {
    
var temp = response.main.temp;
var wind = response.wind.speed;
var humidity = response.main.humidity;
    
console.log(temp, wind, humidity);
   
$(".temp").text("Temperature: " + temp + String.fromCharCode(176) + "F");
    
$(".wind").text("Wind: " + wind + " MPH");
    
$(".humidity").text("Humditiy: " + humidity + "%");
    
var dayIconCode = response.weather[0].icon;
var dayIconUrl = `http://openweathermap.org/img/wn/${dayIconCode}@2x.png`;
var img = $("<img>");
img.attr("src", dayIconUrl);

var latitude = response.coord.lat;
   
console.log(latitude);
    
var longitude = response.coord.lon;
    
var oneCall = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=mintutely,hourly,daily,alerts&appid=537c5082f054c67490bdd35711142b24`;

}).catch(function (error) {
    console.log(error.responseJSON.cod, error.responseJSON.message);
})
}    