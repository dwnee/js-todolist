
let addBtn = document.getElementById("add-item");

let inputItemContent = document.getElementById("input-item");

let checkItem = document.getElementById("check");
let deleteItem = document.getElementById("delete");

let taskList = [];

addBtn.addEventListener("click", add)
function add(){
  let inputValue = inputItemContent.value;
  taskList.push(inputValue);
  console.log(taskList);
  render();
}

function render(){
  let resultHTML = ``;
  for(let i=0; i<taskList.length; i++){
    resultHTML += `<div class="task">
    <p>${taskList[i]}</p>
    <div>
      <button id="check">V</button>
      <button id="delete">X</button>
    </div>
  </div>`;
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}