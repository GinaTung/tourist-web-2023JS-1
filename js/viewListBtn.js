const viewListBtn =document.querySelector("#viewListBtn");
const userId ="";
token ="";
// const token = localStorage.getItem("token");
function checkLoggedIn() {
    if (!token && !userId) {
        renderDefaultData();
    } else {
        renderProtectedData();
    }
}

function renderProtectedData(){
    viewListBtn.addEventListener("click", function() {
        window.location.href = `viewsList.html?userId=${userId}&token=${token}`;
    });
}

function renderDefaultData(){
    viewListBtn.addEventListener("click", function() {
        window.location.href = "viewsList.html";
    });
}

checkLoggedIn();