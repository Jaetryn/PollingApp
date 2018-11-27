window.onload = main;

function main(){
    document.getElementById("submit").addEventListener("click", fetchData);
    document.getElementById("back").addEventListener("click", goBack);
}

function fetchData(){
    if (isNaN(document.getElementById("meetID").value)){
        errorMessage("Please enter a valid meetup ID");
    }else{
        clearError();
        let meetID = parseInt(document.getElementById("meetID").value);
        let meetDetails = "";
        /* PHP CALL */
        $.post("fetchdata.php", { meet: meetID }, 
        function(data){
            if(data != "fail"){
                let meetDetails = data.split(",");

                localStorage.setItem("meetName", meetDetails[0]);
                localStorage.setItem("meetDescription", meetDetails[1]);
                localStorage.setItem("meetDate", meetDetails[2]);
                localStorage.setItem("meetStart", meetDetails[3]);
                localStorage.setItem("meetEnd", meetDetails[4]);
                localStorage.setItem("meetID", meetDetails[5]);

                

                window.location.href = "found.html";
            }else{
                errorMessage("Meetup with that ID does not exist. Try another one!");
            }
        });

    }
}

function clearError(){
    document.getElementById("errorTitle").innerHTML = "";
    document.getElementById("errorMessage").innerHTML = "";  
}
function errorMessage(message){
    let title = "<h2>Error</h2><br>";
    document.getElementById("errorTitle").innerHTML = title;
    document.getElementById("errorMessage").innerHTML = message;
}

function goBack(){
    window.location.href = "../main.html";
}