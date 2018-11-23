window.onload = main;

function main(){
    generateConfirmation();
    document.getElementById("back").addEventListener("click", goBack);
    document.getElementById("confirm").addEventListener("click", confirmMeet);
}

function goBack(){
    window.location.href = "plan.html";
}

function confirmMeet(){

}

function generateConfirmation(){
    let meetName = localStorage.getItem("meetName");
    let meetDescription = localStorage.getItem("meetDescription");
    let meetDay = convertDate(localStorage.getItem("meetDay"));
    let meetStart = convertTime(localStorage.getItem("meetStart"));
    let meetEnd = convertTime(localStorage.getItem("meetEnd"));

    let str = "<strong>Meetup Name:</strong> " +meetName + "<br>";
    str += "<strong>Meetup Description:</strong> " +meetDescription + "<br>";
    str += "<strong>Meetup Day:</strong> " +meetDay + "<br>";
    str += "<strong>Start Time:</strong> " +meetStart + "<br>";
    str += "<strong>End Time:</strong> " +meetEnd + "<br><br>";

    document.getElementById("confirmation").innerHTML = str;
}

function convertDate(date){
    let year = parseInt(date.slice(0, 4));
    let month = parseInt(date.slice(6, 8));
    let day = parseInt(date.slice(9, 11));

    let str = month + "-" + day + "-" + year;
    return str;
}

function convertTime(time){
    let hour = parseInt(time.slice(0,2));
    let minute = parseInt(time.slice(3,5));
    if (minute < 10){
        minute = "0" + minute;
    }
    let converted = "";

    if(hour < 12){
        converted += hour + ":" + minute + " AM";
    }else if(hour == 12){
        converted += hour + ":" + minute + " PM";

    }else{
        hour = hour - 12;
        converted += hour + ":" + minute + " PM";
    }
    return converted;
}