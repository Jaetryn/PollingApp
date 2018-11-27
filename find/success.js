window.onload = main;

function main(){
    document.getElementById("back").addEventListener("click", goBack);
}

function goBack(){
    window.location.href = "../main.html";
}