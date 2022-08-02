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


function addTodo(e) {



    // Preventing submit button to refresh the page.
    e.preventDefault();
    
    formInput.value = "";
}