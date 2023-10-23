const logOutBtn = document.querySelector("#logOutBtn");
logOutBtn.addEventListener("click", logOut);

function logOut() {
  alert("登出成功");
  // 刪除本地儲存的令牌
  localStorage.removeItem("token"); // 使用 "token" 作為鍵名稱
  localStorage.removeItem("userId"); // 如果需要，同時刪除用戶ID
  // 跳轉到登入頁面或首頁
  window.location.href = "../logIn.html";
}


