window.onload = main;

function main(){
    document.getElementById("submit").addEventListener("click", verifyInput);
    document.getElementById("back").addEventListener("click", switchPageMain);
}

function switchPageMain(){
    window.location.href = "../main.html";
}

function verifyInput(){
    let meetName = document.getElementById("meetName").value;
    let meetDescription = document.getElementById("meetDescription").value;
    let meetStart = document.getElementById("meetStart").value;
    let meetEnd = document.getElementById("meetEnd").value;

    let errorMsg = "";

    if (meetName == ""){
        errorMsg += "Please enter a valid meet name<br>";
    }

    if (meetDescription == ""){
        errorMsg += "Please enter a valid meet description<br>";
    }

    if (errorMsg != ""){
        document.getElementById("error").innerHTML = "<br><h2 id='errorTitle'>Error</h2>";
        document.getElementById("error").innerHTML += errorMsg;
    }else{
        let startYear = parseInt(meetStart.slice(0, 4));
        let startMonth = parseInt(meetStart.slice(5, 7));
        let startDay = parseInt(meetStart.slice(8, 10));
        alert(startYear);
        alert(startMonth);
        alert(startDay);

    }
    


    /*
    let alertMsg = "meet Name: " +meetName +" meet Description: " +meetDescription +" meet Start: " +meetStart +" meet End: " +meetEnd;
    alert(alertMsg);
    */
}