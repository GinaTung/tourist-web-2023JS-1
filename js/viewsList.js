const viewsList = document.querySelector(".viewsList");
const menu = document.querySelector(".menu");
const title =document.querySelector(".title");
const urlParams = new URLSearchParams(window.location.search);
const userId2 = urlParams.get("userId");
const roleData2 = urlParams.get("role");
// console.log(id);
console.log(userId2,roleData2);
let data = [];

function getViews() {
  if (token == null) {
    axios
      .get(`${url}/views`)
      .then(function (response) {
        console.log(response.data);
        data = response.data;
        renderData();
      })
      .catch(function (err) {
        console.log(err.response.message);
        alert(err.response.data);
      });
  } else {
    axios
      .get(`${url}/views`)
      .then(function (response) {
        console.log(response.data);
        data = response.data;
        renderData2();
      })
      .catch(function (err) {
        console.log(err.response.message);
        alert(err.response.data);
      });
  }
}

function checkLoggedIn2() {
  if (token) {
    renderProtectedData();
    renderProtectedData2();
    if (roleData === "admin") {
      renderProtectedData3();
    }
  } else {
    renderDefaultedData2();
  }
}
function renderProtectedData() {
  let str = "";
  str = `
  <a class="btn btn-primary" href="collectList.html?userId=${userId2}" type="button">收藏</a>
  <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
  `;
  menu.innerHTML = str;
}
function renderProtectedData2() {
  let str = "";
  str = `
  <a href="viewsList.html?userId=${userId2}&role=${roleData2}&token=${token}" class="text-decoration-none text-black" type="button">景點收藏管理網站</a>
  `;
  title.innerHTML = str;
}
function renderDefaultedData2() {
  let str = "";
  str = `
  <a href="viewsList.html" class="text-decoration-none text-black" type="button">景點收藏管理網站</a>
  `;
  title.innerHTML = str;
}
function renderProtectedData3() {
  let str = "";
  str = `
  <a class="btn btn-outline-primary" href="adminPage.html?userId=${userId2}&role=${roleData2}&token=${token}" type="button">回到後台</a>
  <a class="btn btn-outline-primary" href="viewsList.html?userId=${userId2}&role=${roleData2}&token=${token}" type="button">回到首頁</a>
  <a class="btn btn-outline-primary" href="adminUpdate.html?userId=${userId2}&role=${roleData2}&token=${token}" type="button">新增景點</a>
  <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
  `;
  menu.innerHTML = str;
}
function renderData() {
  let str = "";
  data.forEach(function (item, index) {
    str += `        
      <li class="col-sm-4">
      <div class="card h-100">
          <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="d-inline-block text-truncate w-75">${item.description}</p>
          </div>
          <div class="card-footer bg-white border-0">
              <a href="viewContent.html?id=${item.id}" class="btn btn-primary">看詳細</a>
          </div>
      </div>
  </li>`;
  });
  viewsList.innerHTML = str;
}
function renderData2() {
  let str = "";
  data.forEach(function (item, index) {
    str += `        
      <li class="col-sm-4">
      <div class="card h-100">
          <div class="card-body">
              <h5 class="card-title">${item.name}</h5>
              <p class="d-inline-block text-truncate w-75">${item.description}</p>
          </div>
          <div class="card-footer bg-white border-0">
              <a href="viewContent.html?id=${item.id}&userId=${userId2}&role=${roleData2}" class="btn btn-primary">看詳細</a>
          </div>
      </div>
  </li>`;
  });
  viewsList.innerHTML = str;
}
getViews();
checkLoggedIn2();
