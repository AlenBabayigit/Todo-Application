// Selecting The Elements
const form = document.querySelector("#todo-form");
const formInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".list-group");
const inputCol = document.querySelector("#input-col");
const todoCol = document.querySelector("#todo-col");
const filterButton = document.querySelector("#filter-todos");
const clearButton = document.querySelector("#clear-todos");


// Adding Event Listeners
addEventListenerToAllElements();

function addEventListenerToAllElements() {
    document.addEventListener("DOMContentLoaded", loadTodosFromLocalStorage);
    form.addEventListener("submit", addTodo);
    todoCol.addEventListener("click", deleteTodo);
    filterButton.addEventListener("click", filterTodos);
    clearButton.addEventListener("click", deleteAllTodos);
}


/** 
 * @returns {Array<string>} todo list stored in local storage
 */
 function getTodosFromLocalStorage() {
    return localStorage.getItem("todos") !== null ? JSON.parse(localStorage.getItem("todos")) : [];
}


/**
 * loadTodosFromLocalStorage() adds the todos stored in localStorage to UI.
 */
function loadTodosFromLocalStorage() {
    let todos = getTodosFromLocalStorage();
    todos.forEach((todo) => addTodoToUI(todo));
}


/**
 * addTodo() adds the new todos to UI and localStorage.
 * If todo already exits or input is blank, it will show an alert to the user.
 * @param {*} e 
 */
function addTodo(e) {
    const todoText = formInput.value.trim();
    let todos = getTodosFromLocalStorage();
    if (todoText === "") {
        // Displaying danger alert if the input is blank.
        showAlert("alert-danger", "Todo input cannot be blank.")
    }
    else if (todos.indexOf(todoText) === -1) {
        // Adding todo to UI.
        addTodoToUI(todoText);
        // Adding todo to local storage
        addTodoToLocalStorage(todoText);
        // Displaying success alert.
        showAlert("alert-success", "Todo added successfully.")
    }
    else {
        // Displaying danger alert if todo already exists.
        showAlert("alert-danger", "Todo already exists.")
    }
    // Preventing submit button to refresh the page.
    e.preventDefault();
    // Clearing the input section.
    formInput.value = "";
}

/**
 * addTodoToUI() creates a li element with todo input's text and adds it to the list.
 * @param {string} newTodo todo input
 */
function addTodoToUI(newTodo) {
    // Creating the <li> element.
    const listItem = document.createElement("li");
    listItem.className = "list-group-item"
    listItem.innerHTML = `${newTodo}
    <a href="#" class="delete-item">
        <i class="fa fa-remove"></i>
    </a>`
    // Adding <li> item to the list.
    todoList.appendChild(listItem);
}

/**
 * addTodoToLocalStorage() updates the todos stored in local storage with the newly added todo.
 * @param {string} newTodo 
 */
 function addTodoToLocalStorage(newTodo) {
    let todos = getTodosFromLocalStorage();
    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * showAlert() puts an alert message to the inputCol.
 * @param {string} type alert class 
 * @param {string} message alert message
 */
function showAlert(type, message) {
    const alert = document.createElement("p");
    alert.className = type;
    alert.textContent = message;
    inputCol.appendChild(alert);
    // Removing the alert message after 750 milliseconds.
    window.setTimeout(() => alert.remove(), 750)
}


/**
 * deleteTodo() removes the li element when user clicked on the remove symbol.
 * @param {*} e 
 */
function deleteTodo(e) {
    if (e.target.className === "fa fa-remove") {
        let li = e.target.parentElement.parentElement;
        deleteTodoFromLocalStorage(li.textContent.trim());
        li.remove();
        showAlert("alert-success", "Todo deleted successfully.");
    }
}

/**
 * deleteTodoFromLocalStorage function deletes the removed todo from localStorage.
 * @param {*} todoToDelete removed todo
 */
function deleteTodoFromLocalStorage(todoToDelete) {
    let todos = getTodosFromLocalStorage();
    todos.forEach((todo, index) => {
        if (todo === todoToDelete) {
            todos.splice(index, 1);
        }
    });
    localStorage.setItem("todos", JSON.stringify(todos));
}


/**
 * filterTodos() filters todos.
 * If filterText doesn't occur in todo, function sets the li element's display property to none.
 * @param {*} e 
 */
function filterTodos(e) {
    const filterText = formInput.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach((listItem) => {
        const text = listItem.textContent.toLowerCase();
        if (text.indexOf(filterText) === -1) {
            listItem.setAttribute("style", "display: none");
        }
        else {
            listItem.setAttribute("style", "display: block");
        }
    })
    // Clearing filter after 2000 milliseconds.
    window.setTimeout(clearFilter, 2000)
}

/**
 * clearFilter() clears the filter and sets all todos visible.
 */
function clearFilter() {
    const listItems = document.querySelectorAll(".list-group-item");
    // Setting all li elements' display to block.
    listItems.forEach((listItem) => listItem.setAttribute("style", "display: block"));
    formInput.value = "";
}


/**
 * deleteAllTodos() removes all todos from the list when user clicked the clear button.
 * @param {*} e event 
 */
function deleteAllTodos(e) {
    if (confirm("Are you sure to clear all todos?")) {
        while(todoList.firstElementChild != null) {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}