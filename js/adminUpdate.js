const InputTitle1 = document.querySelector("#InputTitle1");
const formControlTextarea1 =document.querySelector("#formControlTextarea1");
const addViewBtn = document.querySelector("#addViewBtn");

// 新增待辦功能
addViewBtn.addEventListener('click',function(e){
    if (InputTitle1.value=="" || formControlTextarea1.value =="") {
      alert("請輸入內容");
      return;
    }
    let obj = {};
    obj.name = InputTitle1.value;
    obj.description = formControlTextarea1.value;
    axios.post(`${url}/views`,obj)
    .then(function(response){
        console.log(response.data);
    })
    .catch(function (err) {
        console.log(err.response.message);
        alert(err.response.data);
      });
      InputTitle1.value = "";
      formControlTextarea1.value = "";
  })