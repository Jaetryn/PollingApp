window.onload = main;


function main(){
    createEventTable();
    addTableEventListeners();
    document.getElementById("submit").addEventListener("click", submitData);
    document.getElementById("back").addEventListener("click", goBack);
}

function submitData(){
    let rows = localStorage.getItem("rows");
    let attendeeName = document.getElementById("name").value;
    let meetID = localStorage.getItem("meetID");

    let availableTimes = [];

    /* Adding colored times into an array so we can later iterate through it and make MYSQL queries. */
    for (index = 0; index <= rows; index++){
        let rowName = "row" + index;
        if (document.getElementById(rowName).getAttribute("bgcolor") == "green"){
            availableTimes.push(localStorage.getItem("row" +index +"String"));
        }
    }

    for (index = 0; index < availableTimes.length; index++){
        $.post("addavailabilitydata.php", { name: attendeeName, availability: availableTimes[index], id: meetID }, 
        function(data){
            if(data != "fail"){
                alert("added");
            }else{
                errorMessage("fail");
            }
        });
    }

}

function createEventTable(){
    let meetStart = convertTime(localStorage.getItem("meetStart"));
    let meetEnd = convertTime(localStorage.getItem("meetEnd"));

    let hourDiff = parseInt(meetEnd.slice(0, 2)) - parseInt(meetStart.slice(0, 2));
    let minDiff = parseInt(meetEnd.slice(2,4)) - parseInt(meetStart.slice(2,4));

    if (hourDiff <= 2){
        interval = 15;
    }else{
        interval = 30;
    }

    let totalDiff = (hourDiff * 60) + minDiff;
    let rows = computeRows(totalDiff, interval);

    alert("Start: " +meetStart);
    alert("End: " +meetEnd);
    alert("Hour Diff: " +hourDiff);
    alert("Minute Diff: " +minDiff);
    alert("Total Diff: " +totalDiff);
    alert("Interval: " +interval);
    alert("Rows: " + rows);

    let minCount = parseInt(localStorage.getItem("meetStart").slice(":")[0].slice(" ")[0]);
    let hourCount = parseInt(localStorage.getItem("meetStart").slice(":")[0]);
    let table = "<br><table id='availability' border='1'>";

    hourMil = parseInt(meetStart.slice(0, 2));
    minMil = parseInt(meetStart.slice(2, 4));
    hourEndMil = parseInt(meetEnd.slice(0, 2));
    minEndMil = parseInt(meetEnd.slice(2, 4));

    for (index = 0; index <= rows; index++){
        var element = document.createElement("tr");
        element.id = "row" + index;
        document.body.appendChild(element);

        table += "<tr id='row" +index +"'><td>";
        minCountStr = minCount < 10 ? "0" + minCount : minCount;

        if (hourMil >= 12){
            timePeriod = " PM";
        }else{
            timePeriod = " AM";
        }

        /* Finding the right side of "TO" */
        if (index + 1 <= rows){
            let hourMilAhead = hourMil;
            let minMilAhead = minMil + interval;

            if (minMilAhead >= 60){
                minMilAhead -= 60;
                hourMilAhead++;
            }

            timePeriodAhead = hourMilAhead >= 12 ? " PM" : " AM";
            hourCountAhead = hourMilAhead > 12 ? hourMilAhead - 12 : hourMilAhead;
            minCountStrAhead = minMilAhead < 10 ? "0" + minMilAhead : minMilAhead;
        }else{
            timePeriod = hourEndMil >= 12 ? " PM" : " AM";
            hourCountAhead = hourEndMil > 12 ? hourEndMil - 12 : hourEndMil;
            minCountStrAhead =  minEndMil < 10 ? "0" + minEndMil : minEndMil;
        }

        let rowString = hourCount + ":" +minCountStr +timePeriod + " to " + hourCountAhead + ":" +minCountStrAhead +timePeriodAhead;
        localStorage.setItem("row" +index +"String", rowString);
        table += rowString;
        table += "</td></tr>";    

        minCount += interval;
        if (minCount >= 60){
            minCount -= 60;
            hourCount++;
            if(hourCount > 12){
                hourCount = 1;
            }
        }  

        minMil += interval;
        if (minMil >= 60){
            minMil -= 60;
            hourMil++;
            if(hourMil > 23){
                hourMil = 0;
            }
        }

        localStorage.setItem("rows", rows);
        localStorage.setItem("interval", interval);
    }

    table += "</table>";
    document.getElementById("availTable").innerHTML = table;
}

function addTableEventListeners(){
    let rows = localStorage.getItem("rows");
    let interval = localStorage.getItem("interval");

    for(index = 0; index <= rows; index++){
        id = "row" +index;
        var input = document.getElementById(id);

        input.onclick = (function(id){
            return function(){
                setGreen(id);
            }
         })(id);         
    }
}

function setGreen(id){
    let element = document.getElementById(id);
    if(element.getAttribute("bgcolor") == "green"){
        element.removeAttribute("bgcolor");
    }else{
        element.setAttribute("bgcolor", "green");
    }
}

function computeRows(totalDiff, interval){
    let intervalCount = 0;

    while (totalDiff >= interval){
        intervalCount++;
        totalDiff -= interval;
    }

    return intervalCount;
}

function convertTime(time){
    let hour = 0;
    let minute = 0;

    let index = 0;
    let hourString = "";

    let semicolon = 0;

    while (time[index] != ":"){
        hourString += time[index++];
        let semicolon = index;
    }

    hour = parseInt(hourString);

    while (time[index + 1] != undefined){
        if (time[index] == "P" && time[index + 1] == "M"){
            hour += 12;
        }
        index++;
    }

    index = 0;

    minute = parseInt(time[semicolon + 2] + time[semicolon + 3]);

    if (hour < 10){
        hour = "0" + hour.toString();
    }else{
        hour = hour.toString();
    }

    
    if (minute < 10){
        minute = "0" + minute.toString();
    }else{
        minute = minute.toString();
    }

    return hour + minute;
}


function goBack(){
    window.location.href = "../main.html";
}