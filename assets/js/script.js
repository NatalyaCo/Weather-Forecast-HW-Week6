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
}
   

.catch (function (error) {
    console.log(error.responseJSON.cod, error.responseJSON.message);
 })