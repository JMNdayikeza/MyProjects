const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);

function addTodo(event) {

    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const todoItem = document.createElement("li");
    todoItem.classList.add("todo-item");
    todoItem.innerText = todoInput.value;
    //SAVE LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    todoInput.value = "";

    const completedButton = document.createElement("button");
    completedButton.classList.add("completedButton");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";

    const trashButton = document.createElement("button");
    trashButton.classList.add("trashButton");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";

    todoDiv.appendChild(todoItem);
    todoDiv.appendChild(completedButton);
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);

}

function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === "trashButton") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
        removeLocalTodo(todo);
    }
    if (item.classList[0] === "completedButton") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(event) {
    const todos = Array.from(todoList.children);
    todos.forEach(todo => {
        console.log(todo);
        switch (event.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
        }
    });
}

function saveLocalTodos(todo) {
    //check 
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");
        todoItem.innerText = todo;

        const completedButton = document.createElement("button");
        completedButton.classList.add("completedButton");
        completedButton.innerHTML = "<i class='fas fa-check'></i>";

        const trashButton = document.createElement("button");
        trashButton.classList.add("trashButton");
        trashButton.innerHTML = "<i class='fas fa-trash'></i>";

        todoDiv.appendChild(todoItem);
        todoDiv.appendChild(completedButton);
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodo(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}