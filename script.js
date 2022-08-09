// Selecting The Elements
const form = document.querySelector("#todo-form");
const formInput = document.querySelector("#todo-input");
const todoList = document.querySelector(".list-group");
const inputCol = document.querySelector("#input-col"); // Card Body
const todoCol = document.querySelector("#todo-col"); // Card Body 2
const filterButton = document.querySelector("#filter-todos");
const clearButton = document.querySelector("#clear-todos");


// Adding Event Listeners

addEventListenerToAllElements();

function addEventListenerToAllElements() {
    form.addEventListener("submit", addTodo);
}

// Functions

function addTodo(e) {
    const todoText = formInput.value.trim();
    
    // Creating the <li> element.
    const listItem = document.createElement("li");
    listItem.className = "list-group-item"
    listItem.innerHTML = `${todoText}
    <a href="#" class="delete-item">
        <i class="fa fa-remove"></i>
    </a>`
    // Adding <li> item to the list.
    todoList.appendChild(listItem);

    // Preventing submit button to refresh the page.
    e.preventDefault();
    // Clearing the input section.
    formInput.value = "";
}