// let token = "";
let userId;
const emailInput2 = document.querySelector("#exampleInputEmail2");
const passwordInput2 = document.querySelector("#exampleInputPassword2");
const logInBtn = document.querySelector("#logInBtn");
// console.log(emailInput2,passwordInput2,logInBtn);
logInBtn.addEventListener("click", function (e) {
  const email = emailInput2.value;
  const password = passwordInput2.value;
  if (email === "" || password === "") {
    alert("請輸入內容");
    return;
  }
  axios
    .post(`${url}/login`, {
      email: email,
      password: password,
    })
    .then(function (response) {
      userId = response.data.user.id; // 从响应数据中获取userId
      token = response.data.accessToken;
      localStorage.setItem("userId", userId); // 将userId存储到localStorage中
      localStorage.setItem("token", token);

      console.log(response.data.accessToken);
      alert("登入成功");
      window.location.href = `viewsList.html?userId=${userId}&token=${token}`;
    })
    .catch((err) => {
      console.log(err.response);
      alert(err.response.data);
    });

  emailInput2.value = "";
  passwordInput2.value = "";
});

