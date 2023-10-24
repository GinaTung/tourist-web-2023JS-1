const menu4 = document.querySelector(".menu4");
const urlParams3 = new URLSearchParams(window.location.search);
const userId3 = urlParams3.get("userId");
const roleData1 = urlParams3.get("role");

function checkLoggedIn4() {
    if (roleData1 === "admin") {
      renderProtectedData4();
    }
  }

  function renderProtectedData4() {
    let str = "";
    str = `
    <a class="btn btn-outline-primary" href="adminPage.html?userId=${userId3}&role=${roleData1}&token=${token}" type="button">回到後台</a>
    <a class="btn btn-outline-primary" href="viewsList.html?userId=${userId3}&role=${roleData1}&token=${token}" type="button">回到首頁</a>
    <a class="btn btn-outline-primary" href="adminUpdate.html?userId=${userId3}&role=${roleData1}&token=${token}" type="button">新增景點</a>
    <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
    `;
    menu4.innerHTML = str;
  }

  checkLoggedIn4();