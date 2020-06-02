
// today = new Date();
// const currDate = today.getDate();
// today.setDate(currDate + 4);
// console.log(today + (today.getMonth()+1) +" "+ today.getDate() + " "+today.getDay())



var weatherDesc = [];

var maxTemp =[];
var minTemp =[];
var feelsLike = [];

var windSpeed = [];
var windDirection = [];

var rainVal = [];


getData(44.736055,-81.2659795,"Oliphant");
getData(43.6670783,-79.367694,"Toronto");
getData(45.3501,-80.033,"Cottage");//45.3501, -80.033]

function getData(lat, lon, place){

fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=a8cc9bbc3fa05a762076523ce4bd8067')
.then(response => response.json())
.then(data => {
    for(let i = 0; i < 8; i++){
        var maxTempValue = Math.round(parseFloat(data['daily'][i]['temp']['max'])-273);
        var minTempValue = Math.round(parseFloat(data['daily'][i]['temp']['min'])-273);
        var feelsLikeValue = Math.round(parseFloat(data['daily'][i]['feels_like']['day'])-273);

        var windSpeedValue = Math.round(parseFloat(data['daily'][i]['wind_speed'])*3.6);
        var windDirectionValue = Math.round(parseFloat(data['daily'][i]['wind_deg']));

        var rainValue = Math.round(parseFloat(data['daily'][i]['rain']));

        var wetherDescValue = data['daily'][i]['weather'][0]['main'];
        if(Number.isNaN(rainValue)){
            rainValue = 0;
        }

        weatherDesc[i]=wetherDescValue;

        maxTemp[i] = maxTempValue;
        minTemp[i] = minTempValue;
        feelsLike[i]=feelsLikeValue;

        windSpeed[i] = windSpeedValue;
        windDirection[i]=windDirectionValue;

        rainVal[i] = rainValue;
        
       
        
           
        
        
    }
    console.log("done");
    showWeek(place);
})

.catch(err => alert("Wrong city name!" + err));

}


var rainThresh = 5;
var windThresh = 20;
var tempThresh = 16;



function showWeek(place){
    today = new Date();
    let dayVal = today.getDay();
 
    for(let i = 0; i < 8; i++){
        let dayOfWk = dayVal+i;
        showDay(place, dayOfWk,weatherDesc[i],maxTemp[i],minTemp[i],feelsLike[i],windSpeed[i],windDirection[i],rainVal[i]);
    }

}

function showDay(place, dayVal,weatherDesc,maxTemp,minTemp,feelsLike,windSpeed,windDir,rainVal){
    // let elements = document.getElementsByClassName(cards);
    // for(let day = 0; day<7 ;day++){


    let windDirection= "";
    let dir = parseInt(windDir);
    if(dir <= 11.25 || dir >= 348.75){
        windDirection="N";
    }else if(dir <= 33.75){
        windDirection="NNE";
    }else if(dir <= 56.25){
        windDirection="NE";
    }else if(dir <= 78.75){
        windDirection="ENE";
    }else if(dir <= 101.25){
        windDirection="E";
    }else if(dir <= 123.75){
        windDirection="ESE";
    }else if(dir <= 146.25){
        windDirection="SE";
    }else if(dir <= 168.75){
        windDirection="SSE";
    }else if(dir <= 191.25){
        windDirection="S";
    }else if(dir <= 213.75){
        windDirection="SSW";
    }else if(dir <= 236.25){
        windDirection="SW";
    }else if(dir <= 258.75){
        windDirection="WSW";
    }else if(dir <= 281.25){
        windDirection="W";
    }else if(dir <= 303.75){
        windDirection="WNW";
    }else if(dir <= 326.25){
        windDirection="NW";
    }else if(dir <= 348.75){
        windDirection="NNW";
    }

    let dayOfWeek = "Mon";
    switch(dayVal%7){
        case 0:
            dayOfWeek="Sun";
            break;
        case 1:
            dayOfWeek="Mon";
            break;
        case 2:
            dayOfWeek="Tues";
            break;
        case 3:
            dayOfWeek="Wed";
            break
        case 4:
            dayOfWeek="Thurs";
            break;
        case 5:
            dayOfWeek="Fri";
            break;
        case 6:
            dayOfWeek="Sat";
            break;
    }
    
    let isGood= false;
    if(parseInt(windSpeed)>windThresh && parseInt(rainVal)<rainThresh && parseInt(maxTemp)>tempThresh){
        isGood=true;
    }

//https://openweathermap.org/weather-conditions
    let main = weatherDesc;
    imageType = "";
    if(main == "Thunderstorm"){
        imageType = "lightning";
    }else if(main == "Drizzle"){
        imageType = "cloudy";
    }else if(main =="Rain"){
        imageType = "rain";
    }else if(main =="Snow"){
        imageType = "snow";
    }else if(main =="Clear"){
        imageType = "sunny";
    }else if(main =="Clouds"){
        imageType = "partly-cloudy";
    }else{
        imageType = "";
    }





    let green = "";
    if(isGood){
        green="-good"
    }

        let cell = document.createElement('div');
        cell.classList.add("container");
        cell.classList.add(imageType+green);// image type

        let day = document.createElement("h3");
        day.classList.add("day-date");
        day.classList.add("day-info");
        day.innerText=dayOfWeek;// day of week
        cell.appendChild(day);
        
        let description =document.createElement("div");
        description.classList.add("day-description");
        description.classList.add("day-info");
        description.innerText=weatherDesc;// weather
        cell.appendChild(description);

        let dropdown =document.createElement("div");
        dropdown.classList.add("dropdown");
        cell.appendChild(dropdown);

        let button =document.createElement("button");
        button.classList.add("day-temperature");
        button.classList.add("day-info");
        button.innerText=maxTemp+"°C";// temperature
        dropdown.appendChild(button);

        let dropdownContent =document.createElement("div");
        dropdownContent.classList.add("dropdown-content");
        dropdown.appendChild(dropdownContent);

        let item1 = document.createElement("a")
        item1.innerText="Max: "+maxTemp+"°C";
        dropdownContent.appendChild(item1);

        let item2 = document.createElement("a")
        item2.innerText="Min: "+minTemp+"°C";
        dropdownContent.appendChild(item2);

        let item3 = document.createElement("a")
        item3.innerText="Feels Like: "+feelsLike+"°C";
        dropdownContent.appendChild(item3);


        //START
        let wind =document.createElement("div");
        wind.classList.add("dropdown");
        cell.appendChild(wind);

        let button2 =document.createElement("button");
        button2.classList.add("day-temperature");
        button2.classList.add("day-info");
        button2.innerText=windSpeed+"km/hr";// temperature
        wind.appendChild(button2);

        let windContent =document.createElement("div");
        windContent.classList.add("dropdown-content");
        wind.appendChild(windContent);

        let item5 = document.createElement("a")
        item5.innerText="Min: "+windSpeed+"km/hr";
        windContent.appendChild(item5);
        
        let directionItem = document.createElement("a");
        directionItem.innerText="Direction: "+windDirection;
        windContent.appendChild(directionItem);

        //END


        let percip =document.createElement("div");
        percip.classList.add("day-percipitation");
        percip.classList.add("day-info");
        percip.innerText=rainVal+" mm Rain";
        cell.appendChild(percip);


        let cards = document.getElementsByClassName('cards ' + place)[0].appendChild(cell);
    
    // }
    
}
