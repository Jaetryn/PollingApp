window.onload = main;

function main(){
    oldInputCheck();
    document.getElementById("submit").addEventListener("click", verifyInput);
    document.getElementById("back").addEventListener("click", switchPageMain);
}

function oldInputCheck(){ /* If coming back from the confirmation page, this puts old data back into the forms. */
    let meetName = localStorage.getItem("meetName");
    let meetDescription = localStorage.getItem("meetDescription");
    let meetDay = localStorage.getItem("meetDay");
    let meetStart = localStorage.getItem("meetStart");
    let meetEnd = localStorage.getItem("meetEnd");

    document.getElementById("meetName").value = meetName;
    document.getElementById("meetDescription").value =  meetDescription;
    document.getElementById("meetDay").value = meetDay;
    document.getElementById("meetStart").value = meetStart;
    document.getElementById("meetEnd").value = meetEnd;
}

function switchPageMain(){
    localStorage.clear();
    window.location.href = "../main.html";
}

function verifyInput(){
    let meetName = document.getElementById("meetName").value;
    let meetDescription = document.getElementById("meetDescription").value;
    let meetDay = document.getElementById("meetDay").value;
    let meetStart = document.getElementById("meetStart").value;
    let meetEnd = document.getElementById("meetEnd").value;

    let errorMsg = "";

    if (meetName == ""){
        errorMsg += "Please enter a valid meet name<br>";
    }

    if (meetDescription == ""){
        errorMsg += "Please enter a valid meet description<br>";
    }

    if (meetDay == ""){
        errorMsg += "Please enter a valid meet day<br>";
    }

    if (meetStart == "" || meetEnd == ""){
        errorMsg += "Please enter a valid meet start and end time<br>";
    }else{
        let startHour = parseInt(meetStart.slice(0,2));
        let endHour = parseInt(meetEnd.slice(0,2));
    
        if (startHour >= endHour){
            errorMsg += "Please enter a valid start time<br>"
        }
    }


    if (errorMsg != ""){
        document.getElementById("error").innerHTML = "<br><h2 id='errorTitle'>Error</h2>";
        document.getElementById("error").innerHTML += errorMsg;
    }else{
        localStorage.setItem("meetName", meetName);
        localStorage.setItem("meetDescription", meetDescription);
        localStorage.setItem("meetDay", meetDay);
        localStorage.setItem("meetStart", meetStart);
        localStorage.setItem("meetEnd", meetEnd);

        window.location.href = "confirm.html";
    }


}