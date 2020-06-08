// SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".todo-filter");
const importButton = document.getElementById("import-button");
const clearButton = document.getElementById("clear-button");
todoInput.focus();

// EVENT LISTENERS
todoButton.addEventListener("click", newTodo);

document.addEventListener("keydown", (event) => {
  if (event.code == "Enter" || event.code == "NumpadEnter") {
    newTodo(event);
  }
});

todoList.addEventListener("click", listBtn);

filter.addEventListener("click", filtering);

importButton.addEventListener("click", getTodosFromLocal);
clearButton.addEventListener("click", clearList);

document.addEventListener("DOMContentLoaded", getTodosFromLocal);

// FUNCTIONS
function cl(text) {
  console.log(text);
}

//adding buttons to the todo
function createIconButton(task) {
  const listBtns = document.createElement("div");
  function creatingIcon(iconClass1, iconClass2, iconName) {
    let listButton = document.createElement("button");

    let buttonIcon = document.createElement("i");
    buttonIcon.classList.add(iconClass1);
    buttonIcon.classList.add(iconClass2);
    listButton.classList.add(iconName);
    listButton.classList.add("list-btn");
    listButton.appendChild(buttonIcon);
    listBtns.appendChild(listButton);
  }
  creatingIcon("far", "fa-check-square", "check-btn");
  creatingIcon("fas", "fa-exclamation", "priority");
  creatingIcon("fas", "fa-trash-alt", "delete-btn");
  task.appendChild(listBtns);
}

//constructing new task with buttons
function createTodo(text) {
  const newTodo = document.createElement("li");
  const todoText = document.createElement("p");
  if (text == "") {
    todoText.textContent = "take a nap";
  } else {
    todoText.textContent = text;
  }
  newTodo.appendChild(todoText);
  //adding buttons
  createIconButton(newTodo);
  // adding constructed todo task
  todoList.appendChild(newTodo);
}

function newTodo(event) {
  //preventing refreshing the page
  event.preventDefault();
  //creating todo
  createTodo(todoInput.value);
  saveLocal(todoInput.value);
  todoInput.value = "";
  todoInput.focus();
}

//buttons functionality
function listBtn(event) {
  const item = event.target;
  let task = item.parentNode.parentNode;
  //delete button
  if (item.classList[0] === "delete-btn") {
    task.classList.add("deleting");
    task.addEventListener("transitionend", () => {
      event.target.parentNode.parentNode.remove();
    });
    deleteFromLocal(item);
  } //completed task button
  else if (item.classList[0] === "check-btn") {
    if (item.classList[2] === "checked") {
      item.innerHTML = '<i class="far fa-check-square"></i>';
      event.target.parentNode.parentNode.classList.remove("checked");
      item.classList.remove("checked");
    } else {
      event.target.parentNode.parentNode.classList.add("checked");
      item.classList.add("checked");
      item.innerHTML = '<i class="fas fa-check-square"></i>';
    }
    //priority button
  } else if (item.classList[0] === "priority") {
    task.classList.toggle("priorityTask");
    item.parentNode.classList.toggle("priority-btns");
  }
}

//FILTERING TASKS TO DO
function filtering(e) {
  const todos = document.querySelector(".todo-list").childNodes;

  switch (e.target.value) {
    case "all":
      todos.forEach(function (todo) {
        todo.style.display = "flex";
        if (todo.classList.contains("checked")) {
          todo.style.opacity = "40%";
        }
      });
      break;

    case "todo":
      todos.forEach(function (todo) {
        if (todo.classList.contains("checked")) {
          todo.style.display = "none";
        } else {
          todo.style.display = "flex";
        }
      });
      break;

    case "completed":
      todos.forEach(function (todo) {
        if (todo.classList.contains("checked")) {
          todo.style.display = "flex";
          todo.style.opacity = "80%";
        } else {
          todo.style.display = "none";
        }
      });
    default:
      break;
  }
}

// Local storage

function saveLocal(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  if (task == "") {
    tasks.push("take a nap");
  } else {
    tasks.push(task);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTodosFromLocal() {
  todoList.innerHTML = "";
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    alert("You don't have anything to do!");
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function (task) {
      createTodo(task);
    });
  }
  todoInput.focus();
}

function clearList() {
  todoList.innerHTML = "";
  localStorage.clear();
}

function deleteFromLocal(deleted) {
  let text = deleted.parentNode.parentNode.children[0].textContent;
  let tasks = JSON.parse(localStorage.getItem("tasks"));
  tasks.splice(tasks.indexOf(text), 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
