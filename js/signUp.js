const emailInput = document.querySelector('#exampleInputEmail1');
const passwordInput = document.querySelector('#exampleInputPassword1');
const check =document.querySelector('#exampleCheck1');
const signUpBtn = document.querySelector('#signUpBtn');
// console.log(txt);
signUpBtn.addEventListener('click', function(e){
    const email = emailInput.value;
    const password = passwordInput.value;
    if (email === "" || password === "") {
        alert("請輸入內容");
        return;
    }

    axios.post(`${url}/signup`, {
        "email": email,
        "password": password
    })
    .then(function (response) {
        console.log(response.data);
        alert("註冊成功")
        window.location.href ="logIn.html";
    })
    .catch(err => {
        console.log(err.response);
        alert(err.response.data);
    });

    emailInput.value = "";
    passwordInput.value = "";
});