const collectCardList = document.querySelector(".collectCardList");
const menu =document.querySelector(".menu");
const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');
// console.log(id);
console.log(userId);
let data = [];

function getCollect() {
  axios
    .get(`${url}/collects`)
    .then(function (response) {
      console.log(response.data); // 确认是否获取到了数据
      // 筛选与当前 userId 匹配的收藏项
      data = response.data.filter(item => item.userId === userId.toString());
      console.log(data);
      renderData4();
    })
    .catch(function (err) {
      console.log(err);
      alert(err.response);
    });
}

// const token = localStorage.getItem("token");
function checkLoggedIn2() {
  if (token) {
    renderProtectedData();
  } 
}
function renderProtectedData(){
  let str ="";
  str=`
  <a class="btn btn-primary" href="collectList.html?userId=${userId}" type="button">收藏</a>
  <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
  `
  menu.innerHTML=str;
}

function deleteCollect(id) {
  axios
    .delete(`${url}/collects/${id}`)
    .then(function (response) {
      console.log(response.data);
      getCollect(); // 更新收藏数据
    })
    .catch(function (err) {
      console.log(err);
      alert(err.response);
    });
}
function addCollect(id) {
  axios
    .post(`${url}/collects`, {
      userId: userId.toString(),
      itemId: id
    })
    .then(function (response) {
      console.log(response.data);
      alert("已收藏成功");
      getCollect(); // 更新收藏数据
    })
    .catch(function (err) {
      console.log(err);
      alert(err.response);
    });
}
function renderData4() {
  let str = '';
  data.forEach(function (item, index) {
    str += `
      <li class="col-sm-4">
        <div class="card h-100">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <p class="d-inline-block text-truncate w-75">${item.description}</p>
          </div>
          <div class="card-footer bg-white border-0">
            <a class="btn btn-outline-secondary collectBtn2" type="button" href="#" data-id=${item.id}>
              ${item.haveCollect ? "已收藏" : "已刪除"}
            </a>
            <a href="viewContent.html?id=${item.id}&userId=${userId}" class="btn btn-primary">看詳細</a>
          </div>
        </div>
      </li>`;
  });

  collectCardList.innerHTML = str;

  // 添加事件监听器
  collectCardList.addEventListener('click', function (e) {
    if (e.target.classList.contains("collectBtn2")) {
      const itemId = e.target.getAttribute("data-id");
      const selectedItem = data.find(item => item.id === parseInt(itemId));

      if (selectedItem && selectedItem.haveCollect) {
        // 用户点击已收藏按钮，执行删除逻辑
        deleteCollect(itemId);
        alert("已刪除成功")
      }else {
        // 用户点击未收藏按钮，执行添加逻辑
        addCollect(itemId);
      }
    }
  });
}

getCollect();
checkLoggedIn2();