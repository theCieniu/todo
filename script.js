// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
todoInput.focus();

// EVENT LISTENERS
todoButton.addEventListener("click", newTodo);

document.addEventListener("keydown", (event) => {
  if (event.code == "Enter" || event.code == "NumpadEnter") {
    newTodo(event);
  }
})

todoList.addEventListener("click", listBtn)

// FUNCTIONS
function newTodo(event) {
  event.preventDefault();
  // todo text
  const newTodo = document.createElement("li");
  const todoText = document.createElement("div");
  if (todoInput.value === "") {
    todoText.textContent = "drzemka"
  } else {
    todoText.textContent = todoInput.value;
  }
  newTodo.appendChild(todoText);
  // buttons
  const listBtns = document.createElement("div");
  const checkBtn = document.createElement("button");
  checkBtn.classList.add("check-btn");
  checkBtn.classList.add("list-btn");
  checkBtn.innerHTML = '<i class="far fa-check-square"></i>';
  listBtns.appendChild(checkBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.classList.add("list-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  listBtns.appendChild(deleteBtn);
  // adding constructed todo task
  newTodo.appendChild(listBtns);
  todoList.appendChild(newTodo);
  todoInput.value = "";
  todoInput.focus();
}


function listBtn(event) {
  const item = event.target
  if (item.classList[0] === "delete-btn") {
    let task = item.parentNode.parentNode;
    task.classList.add("deleting");
    task.addEventListener("transitionend", () => {
      event.target.parentNode.parentNode.remove();
    })
  } else if (item.classList[0] === "check-btn") {
    if (item.classList[2] === "checked") {
      item.innerHTML = '<i class="far fa-check-square"></i>'
      event.target.parentNode.parentNode.classList.remove("checked");
      item.classList.remove("checked");
    } else {
      event.target.parentNode.parentNode.classList.add("checked")
      item.classList.add("checked")
      item.innerHTML = '<i class="fas fa-check-square"></i>'
    }
  }
}
