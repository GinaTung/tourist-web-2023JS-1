const viewsList = document.querySelector(".viewsList");
const menu2 = document.querySelector(".menu");
const title =document.querySelector(".title");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");
// console.log(id);
console.log(userId);
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
  }else{
    renderDefaultedData2();
  }
}
function renderProtectedData() {
  let str = "";
  str = `
  <a class="btn btn-primary" href="collectList.html?userId=${userId}" type="button">收藏</a>
  <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
  `;
  menu.innerHTML = str;
}
function renderProtectedData2() {
  let str = "";
  str = `
  <a href="index.html?userId=${userId}&token=${token}" class="text-decoration-none text-black" type="button">景點收藏管理網站</a>
  `;
  title.innerHTML = str;
}
function renderDefaultedData2() {
  let str = "";
  str = `
  <a href="index.html" class="text-decoration-none text-black" type="button">景點收藏管理網站</a>
  `;
  title.innerHTML = str;
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
              <a href="viewContent.html?id=${item.id}&userId=${userId}" class="btn btn-primary">看詳細</a>
          </div>
      </div>
  </li>`;
  });
  viewsList.innerHTML = str;
}
getViews();
checkLoggedIn2();
