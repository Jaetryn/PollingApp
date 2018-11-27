window.onload = main;


function main(){
    fetchMeetupData();
    fetchAvailabilityData();
    
}

function fetchMeetupData(){
    let meetName = localStorage.getItem("meetName");
    let meetDescription = localStorage.getItem("meetDescription");
    let meetDate = localStorage.getItem("meetDate");
    let meetStart = localStorage.getItem("meetStart");
    let meetEnd = localStorage.getItem("meetEnd");
    let meetID = localStorage.getItem("meetID");

    let success = "Meetup Details<br>";
    let content = "Name: " + meetName + " Description: " + meetDescription + " Start: " + meetStart + " End: " + meetEnd + " ID: " + meetID;

    document.getElementById("success").innerHTML = success;
    document.getElementById("content").innerHTML = content;
    document.getElementById("back").addEventListener("click", goBack);
    document.getElementById("submit").addEventListener("click", addAvailability);
}

function goBack(){
    window.location.href = "../main.html";
}

function addAvailability(){
    window.location.href = "addavailability.html";
}

function fetchAvailabilityData(){
    let meetID = localStorage.getItem("meetID");

        /* PHP CALL */
        $.post("fetchavailabilitydata.php", { meet: meetID }, 
        function(data){
            if(data != "fail"){
                produceStatistics(data);
                let meetDetails = data.split(",");
            }else{
                document.getElementById("data").innerHTML += "<br> No one yet!<br>";
            }
        });
}   

function produceStatistics(data){
    let meetDetails = data.split(",");
    meetDetails.pop();
    let names = [];
    let availability = [];
    for (index = 0; index < meetDetails.length; index++){
        if (index % 2 == 0){
            names.push(meetDetails[index]);
        }else{
            availability.push(meetDetails[index]);
        }
    }

    let numberOfAttendees = uniqueAttendees(names);
    let bestTime = mostCommonTime(availability);
    let times = getTimes();
    let votes = getVotes(times, availability);

    createGraph(times, votes);

    document.getElementById("data").innerHTML += "There are " +numberOfAttendees +" attendee(s)!<br>";
    document.getElementById("data").innerHTML += "Most people can attend the event from " +bestTime + ".<br><br>";

}

function getVotes(times, availability){
    let votes = [];
    let index = 0;
    times.forEach(element1 => {votes[index++] = 0;});

    index = 0;
    times.forEach(element1 => {availability.forEach(element2 => {if (element1 == element2){votes[index] = votes[index] + 1;}});index++;});
    return votes;
}

function getTimes(){
    let meetStart = localStorage.getItem("meetStart");
    let meetEnd = localStorage.getItem("meetEnd");
    let times = [];

    let normalStart = localStorage.getItem("meetStart");
    let normalEnd = localStorage.getItem("meetEnd");
    let militaryStart = convertTime(normalStart);
    let militaryEnd = convertTime(normalEnd);

    let duration = subtractMilitary(militaryStart, militaryEnd);
    let interval = parseInt(duration.slice(0, 2)) > 2 ? 30 : 15;
    let totalDiff = findTotalDiff();
    let rows = computeRows(totalDiff, interval);

    
    let minCount = parseInt(localStorage.getItem("meetStart").split(":")[1].split(" ")[0]);
    let hourCount = parseInt(localStorage.getItem("meetStart").slice(":")[0]);

    hourMil = parseInt(militaryStart.slice(0, 2));
    minMil = parseInt(militaryStart.slice(2, 4));
    hourEndMil = parseInt(militaryEnd.slice(0, 2));
    minEndMil = parseInt(militaryEnd.slice(2, 4));

    for (index = 0; index <= rows; index++){

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

        times.push(hourCount + ":" +minCountStr +timePeriod + " to " + hourCountAhead + ":" +minCountStrAhead +timePeriodAhead);
    

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

    }
    return times;
}

function findTotalDiff(){
    let meetStart = localStorage.getItem("meetStart");
    let meetEnd = localStorage.getItem("meetEnd");

    let hourDiff = parseInt(meetEnd.slice(0, 2)) - parseInt(meetStart.slice(0, 2));
    let minDiff = parseInt(meetEnd.slice(2,4)) - parseInt(meetStart.slice(2,4));

    if (hourDiff <= 2){
        interval = 15;
    }else{
        interval = 30;
    }

    return (hourDiff * 60) + minDiff;
}


function computeRows(totalDiff, interval){
    let intervalCount = 0;

    while (totalDiff >= interval){
        intervalCount++;
        totalDiff -= interval;
    }

    return intervalCount;
}



function uniqueAttendees(names){    
    let unique = [];


    names.forEach(element => {
        if (!unique.includes(element)){
            unique.push(element);
        }
    });

    return unique.length;
}

function mostCommonTime(availability){
    let unique = [];
    let mostCommon = "";
    let numberOccurences = -1;

    availability.forEach(element =>{
        if (!unique.includes(element)){
            unique.push(element);
        }
    });

    unique.forEach(element =>{
        if (availability.filter(element2 => element2 == element).length > numberOccurences){
            numberOccurences = availability.filter(element2 => element2 == element).length;
            mostCommon = element;
        }
    })

    return mostCommon;

}

function subtractMilitary(start, end){
    let milHourStart = parseInt(start.slice(0, 2));
    let milMinStart = parseInt(start.slice(3, 5));
    let milHourEnd = parseInt(end.slice(0, 2));
    let milMinEnd = parseInt(end.slice(3,5));

    let milHourNew = milHourEnd - milHourStart;

    let milMinNew = milMinEnd - milMinStart;

    if (milMinNew < 0){
        milHourNew--;
        milMinNew += 60;
    }

    if (milHourNew < 10){
        milHourNew = "0" + milHourNew;
    }

    
    return milHourNew + ":" + milMinNew;
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