window.onload = main;

function main(){
    createEventTable();
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

    for (index = 0; index <= rows; index++){
        table += "<tr id='row" +index +"'><td>";
        if (minCount < 10){
            minCountStr = "0" + minCount;
        }
        if (hourMil >= 12){
            timePeriod = " PM";
        }else{
            timePeriod = " AM";
        }

        if (index + 1 != rows){
            let hourMilAhead = hourMil;
            let minMilAhead = minMil + interval;

            if (minMilAhead >= 60){
                minMilAhead -= 60;
                hourMilAhead++;
            }

            timePeriodAhead = hourMilAhead >= 12 ? " PM" : " AM";
            hourCountAhead = hourMilAhead > 12 ? hourMilAhead - 12 : hourMilAhead;
            minCountStrAhead = minMilAhead < 10 ? "0" + minMilAhead : minMilAhead;
        }


        table += hourCount + ":" +minCountStr +timePeriod + " to " + hourCountAhead + ":" +minCountStrAhead +timePeriodAhead;
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
            minMil - 60;
            hourMil++;
            if(hourMil > 23){
                hourMil = 0;
            }
        }

    }

    if (totalDiff - (interval * rows) != 0){
        hourMilEnd = parseInt(meetEnd.slice(0, 2));
        minMilEnd = parseInt(meetEnd.slice(2, 4));

        minMilEnd = minMilEnd - interval;

        if (minMilEnd < 0){
            minMilEnd = minMilEnd + 60;
            hourMilEnd--;
        }

        timePeriod = hourMilEnd >= 12? " PM" : " AM";

        hourConv = hourMilEnd > 12? hourMilEnd - 12 : hourMilEnd;
        minConv = minMilEnd;

        table += "<tr id='" + (rows + 1) + "'><td>" + hourConv + ":" +minConv +timePeriod + "</td></tr>";


    }

    table += "</table>";
    document.getElementById("availTable").innerHTML = table;
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