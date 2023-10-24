const tableTbody = document.querySelector(".table-tbody");
const urlParams = new URLSearchParams(window.location.search);
const userId2 = urlParams.get("userId");
const roleData2 = urlParams.get("role");
function getViews(){
    axios
    .get(`${url}/views`)
    .then(function (response) {
      console.log(response.data);
      data = response.data;
      renderData5();
    })
    .catch(function (err) {
      console.log(err.response.message);
      alert(err.response.data);
    });
}

function renderData5(){
    let str="";
    data.forEach(function (item,index) { 
        str+=`
        <tr>
        <th scope="row">${item.id}</th>
        <td class="col-2">${item.name}</td>
        <td>${item.description}</td>
        <td class="text-end">
        <a class="" id="" href="adminEdit.html?userId=${userId2}&role=${roleData2}&id=${item.id}&token=${token}" type="button">編輯</a>
        <a class="text-danger" id="deleteViewBtn" data-num="${item.id}" href="#" type="button">刪除</a>
        </td>
      </tr>
        `
        tableTbody.innerHTML=str;
     })
}
// 刪除待辦功能
tableTbody.addEventListener("click",function(e){
  if(e.target.getAttribute("id")!=="deleteViewBtn"){
    return;
  }
  let num = e.target.getAttribute("data-num");
  axios.delete(`${url}/views/${num}`)
  .then(function(res){
    console.log(res.data);
    getViews()
    alert("刪除成功！");
  })
  .catch(function (err) {
    console.log(err.response.message);
    alert(err.response.data);
  });
})


getViews();