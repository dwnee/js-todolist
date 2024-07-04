let addBtn = document.getElementById("add-item");
let inputItemContent = document.getElementById("input-item");
let taskList = [];
let mode = "tab-all"; // 초기 탭 모드는 전체 보기
let filterList = [];

addBtn.addEventListener("click", add);

let tabs = document.querySelectorAll(".tab-title");
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function(event) {
    filter(event);
  });
}

function add() {
  if (inputItemContent.value.trim() === "") {
    return;
  }
  let task = {
    id: randomIDGenerate(),
    taskContent: inputItemContent.value,
    isComplete: false,
  };
  taskList.push(task);
  inputItemContent.value = ""; // 추가 후 입력 필드 비우기
  filter({ target: { id: mode } }); // 현재 모드에 맞게 필터링하여 UI 업데이트
}

function render() {
  let list = [];
  if (mode === "tab-all") {
    list = taskList;
  } else {
    list = filterList;
  }

  let resultHTML = ``;
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      resultHTML += `
        <div class="task task-done-bg">
          <p class="task-done">${list[i].taskContent}</p>
          <div>
            <button onclick="toggleComplete('${list[i].id}')" id="revert"><i class="fa-solid fa-rotate-left"></i></button>
            <button onclick="deleteTask('${list[i].id}')" id="delete"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      `;
    } else {
      resultHTML += `
        <div class="task">
          <p>${list[i].taskContent}</p>
          <div>
            <button onclick="toggleComplete('${list[i].id}')" id="check"><i class="fa-solid fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')" id="delete"><i class="fa-solid fa-xmark"></i></button>
          </div>
        </div>
      `;
    }
  }
  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter({ target: { id: mode } }); // 현재 모드에 맞게 필터링하여 UI 업데이트
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
      break;
    }
  }
  filter({ target: { id: mode } }); // 현재 모드에 맞게 필터링하여 UI 업데이트
}

function filter(event) {
  mode = event.target.id;
  filterList = []; // 필터링 할 때마다 초기화
  if (mode === "tab-all") {
    render();
  } else if (mode === "tab-progressing") {
    for (let i = 0; i < taskList.length; i++) {
      if (!taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  } else if (mode === "tab-done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
    render();
  }
}

/* 탭 아래 줄 그리기 */
let underBar = document.getElementById("under-line");
let tabMenu = document.querySelectorAll(".tab-title");
tabMenu.forEach((menu) =>
  menu.addEventListener("click", (e) =>
    underBarIndicator(e.currentTarget)
  )
);

function underBarIndicator(e) {
  underBar.style.left = e.offsetLeft + "px";
  underBar.style.width = e.offsetWidth + "px";
  underBar.style.top = e.offsetTop + e.offsetHeight + "px";
}

inputItemContent.addEventListener("keypress", function(event) {
  // 사용자가 키보드에서 "Enter" 키를 누를 때
  if (event.key === "Enter") {
    // 필요한 경우 기본 동작 취소
    event.preventDefault();
    // 버튼 요소를 클릭하여 추가
    document.getElementById("add-item").click();
  }
});
