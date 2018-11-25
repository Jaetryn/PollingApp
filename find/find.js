window.onload = main;

function main(){
    document.getElementById("submit").addEventListener("click", fetchData);
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
                alert("success");
                let meetDetails = data.split(",");

                let meetName = meetDetails[0];
                let meetDescription = meetDetails[1];
                let meetStart = meetDetails[2];
                let meetEnd = meetDetails[3];
                let meetID = meetDetails[4];
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