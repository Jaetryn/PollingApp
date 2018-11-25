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
                alert("success");
                let meetDetails = data.split(",");

                localStorage.setItem("meetName", meetDetails[0]);
                localStorage.setItem("meetDescription", meetDetails[1]);
                localStorage.setItem("meetDate", meetDetails[2]);
                localStorage.setItem("meetStart", meetDetails[3]);
                localStorage.setItem("meetEnd", meetDetails[4]);
                localStorage.setItem("meetID", meetDetails[5]);

                window.location.href = "found.html";
            }else{
                document.getElementById("data").innerHTML += "<br> No one yet!";
            }
        });


}   