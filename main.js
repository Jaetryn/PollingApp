window.onload = main;

function main(){
    localStorage.clear();
    document.getElementById("planEvent").addEventListener("click", switchPagePlan);
    document.getElementById("findEvent").addEventListener("click", switchPageFind);
}

function switchPagePlan(){
    window.location.href = "plan/plan.html";
}

function switchPageFind(){
    window.location.href = "find/find.html";
}