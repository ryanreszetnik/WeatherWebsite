// today = new Date();
// const currDate = today.getDate();
// today.setDate(currDate + 4);
// console.log(today + (today.getMonth()+1) +" "+ today.getDate() + " "+today.getDay())

var rain = [];
var wind = [];
var temp = [];

var data = [];

var weather = ["good xd"]


getData(44.736055,-81.2659795,"Oliphant");
getData(43.6670783,-79.367694,"Toronto");
getData(45.3501,-80.033,"Cottage");//45.3501, -80.033]

function getData(lat, lon, place){

fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&appid=a8cc9bbc3fa05a762076523ce4bd8067')
.then(response => response.json())
.then(data => {
    for(let i = 0; i < 7; i++){
        var tempValue = Math.round(parseFloat(data['daily'][i]['temp']['max'])-273);
        var windSpeedValue = Math.round(parseFloat(data['daily'][i]['wind_speed'])*3.6);
        var rainValue = Math.round(parseFloat(data['daily'][i]['rain']));
        if(Number.isNaN(rainValue)){
            rainValue = 0;
        }
        console.log(tempValue + " " + windSpeedValue + " rain: " + rainValue);
        console.log(place + " " + i );
        // data[parseInt(place)][parseInt(i)][0]=tempValue+"";
        // data[parseInt(place)][parseInt(i)][1]=windSpeedValue+"";
        // data[parseInt(place)][parseInt(i)][2]=rainValue+"";
        rain[i] = rainValue;
        wind[i] = windSpeedValue;   
        temp[i] = tempValue;
        
    }
    console.log("done");
    showTwoWeeks(place);
})

.catch(err => alert("Wrong city name!" + err));

}



console.log(rain);
console.log(wind);
console.log(temp);

var rainThresh = 10;
var windThresh = 22;
var tempThresh = 15;


function showTwoWeeks(location){

    console.log("start")
    today = new Date();
    endDay = new Date();
    endDay.setDate(endDay.getDate()+7);
    currDay = new Date();
    currDay.setDate(currDay.getDate()-today.getDay());
    tbl = document.getElementById("cal_body");
    let counter = 0;
    for(let week = 0; week <2; week++){
    let row = document.createElement("tr");
        for(let day = 0; day < 7; day++){
            cell = document.createElement("td");
           
            if(currDay>=today && currDay<endDay){
            table = document.createElement("table");
            cell.appendChild(table);
            for(let place = 0; place < 5; place++){
                let row2 = document.createElement("tr");
                let cell2 = document.createElement("td");
                
                if(place ==0){
                    cellText = document.createTextNode(currDay.getDate());
                    cell2.appendChild(cellText)
                    counter++;
                }else if(place == 1){
                    cellText = document.createTextNode(location);
                    cell2.appendChild(cellText)
                    var i = counter-1;
                    if(rain[i]<=rainThresh && wind[i]>= windThresh && temp[i]>=tempThresh){
                        cell2.setAttribute("style", "background: green;");
                    }else{
                        cell2.setAttribute("style", "background: red;");
                    }


                }else if(place == 2){
                    cellText = document.createTextNode("Wind: " + wind[i]);
                    cell2.appendChild(cellText)
                }else if(place == 3){
                    cellText = document.createTextNode("Temp: " + temp[i]);
                    cell2.appendChild(cellText)
                }else if(place == 4){
                    cellText = document.createTextNode("Rain: " + rain[i]);
                    cell2.appendChild(cellText)
                }

                
                // cellText.setAttribute("style", "width:100%;");
               
                
                row2.appendChild(cell2);
                table.appendChild(row2);
            }


            // if(week == 0 && day >= today.getDay() || week==1 &&counter<7){
            //     cellText = document.createTextNode(day*(week+1)*100);
            //     cell.appendChild(cellText);
            //     counter++;
            // }
            }
            row.appendChild(cell);
            currDay.setDate(currDay.getDate() + 1);
        }
        tbl.appendChild(row)
    }
    
}