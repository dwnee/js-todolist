// 1. check 버튼을 클릭하면 done상태(isComplete)를 true를 false로 바꿔준다
// 2. isComplete이 true이면 끝난 걸로 간주하고 밑줄 보여주기
// 3. false이면 안 끝난걸로 간주하고 그대로

// delete 버튼을 누르면 할 일 삭제

let addBtn = document.getElementById("add-item");

let inputItemContent = document.getElementById("input-item");

let checkItem = document.getElementById("check");
let deleteItem = document.getElementById("delete");

let taskList = [];

addBtn.addEventListener("click", add);

function add() {
  // let inputValue = inputItemContent.value;
  let task = {
    id: randomIDGenerate(),
    taskContent: inputItemContent.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  let resultHTML = ``;
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].isComplete == true) {
      resultHTML += `
        <div class="task task-done-bg">
          <p class="task-done">${taskList[i].taskContent}</p>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')" id="revert"><i class="fa-solid fa-rotate-left"></i></i></button>
            <button onclick="deleteTask('${taskList[i].id}')" id="delete"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      `;
    } else {
      resultHTML += `
        <div class="task">
          <p>${taskList[i].taskContent}</p>
          <div>
            <button onclick="toggleComplete('${taskList[i].id}')" id="check"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${taskList[i].id}')" id="delete"><i class="fa-solid fa-xmark"></i></button>
        </div>
      </div>`;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  // console.log(taskList, "toggle");
  render();
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id){
  for (let i = 0; taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList.splice(i,1);
      break;
    }
  }
  // console.log("delete");
  console.log(taskList);
  render();
}