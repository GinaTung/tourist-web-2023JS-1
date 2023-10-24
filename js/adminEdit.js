const InputTitle2 = document.querySelector("#InputTitle1");
const formControlTextarea2 = document.querySelector("#formControlTextarea1");
const editViewBtn = document.querySelector("#editViewBtn");
const urlParams = new URLSearchParams(window.location.search);
const id2 = urlParams.get('id'); // 獲取id

console.log(id2);
editViewBtn.addEventListener('click', function(e) {
  if (InputTitle2.value == "" || formControlTextarea2.value == "") {
    alert("請輸入內容");
    return;
  }

  let obj = {};
  obj.name = InputTitle2.value;
  obj.description = formControlTextarea2.value;

  axios.patch(`${url}/views/${id2}`, obj)
    .then(function(response) {
      console.log(response.data);
      // 在這裡可以處理修改成功的相應
    })
    .catch(function(err) {
      console.log(err.response.message);
      alert(err.response.data);
    });

  InputTitle2.value = "";
  formControlTextarea2.value = "";
});


//PATCH修改
// axios
//   .patch("http://localhost:3000/posts/2",{
//     "content":"修改2"
//   })
//   .then(function (response) {
//     console.log(response);
//   });
