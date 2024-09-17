const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");
const addUpdate = document.getElementById("AddUpdateClick");

let todo = JSON.parse(localStorage.getItem("todo-list"));
if (!todo) {
  todo = [];
}

// Function to display all tasks from local storage when the page loads
function displayTodoItems() {
  listItems.innerHTML = ""; // Clear current list

  todo.forEach((item) => {
    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${item.item}</div>
                      <div>
                      <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="bin.png" align = "right" />
                        <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="pencil.png" align = "right" />
                      </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}

// Function to create a new todo item
function CreateToDoItems() {
  if (todoValue.value === "") {
    todoAlert.innerText = "Please enter your todo text!";
    todoValue.focus();
  } else {
    let IsPresent = false;
    todo.forEach((element) => {
      if (element.item == todoValue.value) {
        IsPresent = true;
      }
    });

    if (IsPresent) {
      setAlertMessage("This item already present in the list!");
      return;
    }

    // Create the new task and add to the DOM
    let li = document.createElement("li");
    const todoItems = `<div title="Hit Double Click and Complete" ondblclick="CompletedToDoItems(this)">${todoValue.value}</div>
                      <div>
                        <img class="edit todo-controls" onclick="UpdateToDoItems(this)" src="pencil.png" />
                        <img class="delete todo-controls" onclick="DeleteToDoItems(this)" src="bin.png" />
                      </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);

    // Add the new task to the `todo` array
    let itemList = { item: todoValue.value, status: false };
    todo.push(itemList);
    setLocalStorage();
  }

  // Clear the input field
  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
}

// Function to save the todo list to local storage
function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

// Update function (same as your original)
function UpdateToDoItems(e) {
  if (
    e.parentElement.parentElement.querySelector("div").style.textDecoration ===
    ""
  ) {
    todoValue.value =
      e.parentElement.parentElement.querySelector("div").innerText;
    updateText = e.parentElement.parentElement.querySelector("div");
    addUpdate.setAttribute("onclick", "UpdateOnSelectionItems()");
    addUpdate.setAttribute("src", "refresh.png");
    todoValue.focus();
  }
}

// Function to update a selected item
function UpdateOnSelectionItems() {
  let IsPresent = false;
  todo.forEach((element) => {
    if (element.item == todoValue.value) {
      IsPresent = true;
    }
  });

  if (IsPresent) {
    setAlertMessage("This item already present in the list!");
    return;
  }

  // Update the item in the todo array
  todo.forEach((element) => {
    if (element.item == updateText.innerText.trim()) {
      element.item = todoValue.value;
    }
  });
  setLocalStorage();

  // Update the DOM
  updateText.innerText = todoValue.value;
  addUpdate.setAttribute("onclick", "CreateToDoItems()");
  addUpdate.setAttribute("src", "plus.png");
  todoValue.value = "";
  setAlertMessage("Todo item Updated Successfully!");
}

// Call this function on page load to display the todo items
displayTodoItems();

function DeleteToDoItems(e) {
  let deleteValue = e.parentElement.previousElementSibling.innerText;
  if (confirm('Are you sure. Due you want to delete this ${deleteValue}!')){
    e.parentElement.parentElement.setAttribute("class","deleted-item");
    todoValue.focus();

    todo.forEach((element) => {
      if(element.item == deleteValue.trim()) {
        todo.splice(element,1);
      }
    });

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    },1000);

    setLocalStorage();
  }
}

function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    const img = document.createElement("img");
    img.src = "check.png";
    img.className = "todo-controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    e.parentElement.querySelector("div").appendChild(img);
    e.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}

function setLocalStorage() {
  localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message) {
  todoAlert.removeAttribute("class");
  todoAlert.innerText = message;
  setTimeout(() => {
    todoAlert.classList.add("toggleMe");
  }, 1000);
}

