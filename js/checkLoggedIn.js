const menu =document.querySelector(".menu");

// const token = localStorage.getItem("token");
function checkLoggedIn() {
    if (!token) {
      // 用户未登录，获取默认资源
      // fetchDefaultData();
      renderDefaultData();
      collectBtn.style.display = "none"; // 隐藏按钮
    } else {
            // 用户已登录，获取受保护资源
      // fetchProtectedData(token);
      // renderProtectedData();
      collectBtn.style.display = "inline-block";
    }
  }
//   // 获取受保护资源
// function fetchProtectedData(token) {
//     fetch(`${url}/collects`, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         // 在此处处理受保护资源的数据
//         console.log("Protected Data:", data);
//       })
//       .catch(error => {
//         console.error("Error fetching protected data:", error);
//       });
//   }
  
//   // 获取默认资源
//   function fetchDefaultData() {
//     fetch(`${url}/views`)
//       .then(response => response.json())
//       .then(data => {
//         // 在此处处理默认资源的数据
//         console.log("Default Data:", data);
//       })
//       .catch(error => {
//         console.error("Error fetching default data:", error);
//       });
//   }

  function renderProtectedData(){
    let str ="";
    str=`
    <a class="btn btn-primary" href="collectList.html" type="button">收藏</a>
    <a class="btn btn-primary" id="logOutBtn" href="#" type="button">登出</a>
    `
    menu.innerHTML=str;
  }
  function renderDefaultData(){
    let str2 ="";
    str2=`
    <a class="btn btn-primary" href="signUp.html">註冊</a>
    <a class="btn btn-primary" href="logIn.html" tabindex="-1" aria-disabled="true">登入</a>
    `
    menu.innerHTML=str2;
  }
  checkLoggedIn();
  