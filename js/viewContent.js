const viewContent = document.querySelector(".viewContent");
const collectBtn = document.querySelector("#collectBtn");
const menu =document.querySelector(".menu");
const urlParams = new URLSearchParams(window.location.search);
const idParam = urlParams.get('id');
const userId2 = urlParams.get('userId');

const title =document.querySelector(".title");
const roleData2 = urlParams.get("role");
console.log(idParam,userId2,roleData2);
let data = [];
let listItem; // 在外部定义listItem变量
let favoriteProducts =[];
let dataCollect = [];


function getViewsContent() {
  axios
    .get(`${url}/views/${idParam}`)
    .then(function (response) {
      console.log(response.data);
      data = response.data;
      renderData2();
      dataCollect = response.data; // 将获取到的数据赋值给dataCollect
      getCollect(); // 获取收藏数据后再初始化按钮状态
    })
    .catch(function (err) {
      console.log(err);
      alert(err.response);
    });
}

function checkLoggedIn2() {
  if (token) {
    renderProtectedData();
    renderProtectedData2();
  } else{
    renderDefaultedData2();
  }
}
function renderProtectedData(){
  let str ="";
  str=`
  <a class="btn btn-primary" href="collectList.html?userId=${userId2}" type="button">收藏</a>
  <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
  `
  menu.innerHTML=str;
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
function renderData2() {
  listItem = {
    id: data.id,
    name: data.name,
    description: data.description,
  };

  let str = JSON.stringify(listItem);
  viewContent.innerHTML = str;
}

function getCollect() {
  axios
    .get(`${url}/collects?userId=${userId2}`)
    .then(function (response) {
      console.log(response.data);
      dataCollect = response.data;
  
      // 判断是否有已收藏的商品
      const hasCollectedItem = dataCollect.some(item => item.id === listItem.id && item.haveCollect === true);
  
      if (hasCollectedItem) {
        collectBtn.textContent = "已收藏";
        collectBtn.classList.add("collected");
      } else {
        collectBtn.textContent = "未收藏";
        collectBtn.classList.remove("collected");
      }
  
      // 初始化按钮的点击事件
      addCollects();
    })
    .catch(function (err) {
      console.log(err);
      alert(err.response);
    });
}
function addCollects() {
  collectBtn.addEventListener("click", function () {
    const viewId = listItem.id;

    if (favoriteProducts.some((item) => item.id === viewId)) {
      // 如果商品已收藏，则从收藏列表中移除
      favoriteProducts = favoriteProducts.filter(
        (item) => item.id !== viewId
      );
      collectBtn.textContent = "未收藏";
      collectBtn.classList.remove("collected");
      // 发送请求，从收藏列表中移除商品
      axios
        .delete(`${url}/collects/${viewId}`)
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
          alert(err.response);
        });
    } else {
      // 如果商品未收藏，则清空数组并添加新的收藏商品
      favoriteProducts = []; // 清空数组
      const productInfo = {
        id: viewId,
        name: listItem.name,
        description: listItem.description,
        haveCollect: true,
      };
      favoriteProducts.push(productInfo);
      collectBtn.textContent = "已收藏";
      collectBtn.classList.add("collected");

      // 发送单个商品信息到服务器
      // 发送请求，添加商品到收藏列表
      axios
        .post(`${url}/collects`, {
          id: viewId,
          name: listItem.name,
          description: listItem.description,
          userId: userId,
          haveCollect: true,
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (err) {
          console.log(err);
          alert(err.response);
        });
        console.log(favoriteProducts);
    }


  });
}




// 调用函数获取用户的收藏状态

getViewsContent();
checkLoggedIn2();