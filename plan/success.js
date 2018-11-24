window.onload = main;

function main(){
    document.getElementById("message").innerHTML = localStorage.getItem("success") + "<br>" +"<br>";
    document.getElementById("main").addEventListener("click", goToMain);
}

function goToMain(){
    window.location.href = "../main.html";
}