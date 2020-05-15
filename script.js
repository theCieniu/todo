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
  checkBtn.classList.add("list-btn");
  checkBtn.classList.add("check-btn");
  checkBtn.innerHTML = '<i class="far fa-check-square"></i>';
  listBtns.appendChild(checkBtn);
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("list-btn");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerHTML = '<i class="fas fa-trash-alt"></i>';
  listBtns.appendChild(deleteBtn);
  // adding constructed todo task
  newTodo.appendChild(listBtns);
  todoList.appendChild(newTodo);
  todoInput.value = "";
  todoInput.focus();
}
