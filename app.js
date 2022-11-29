const placeholders = document.querySelectorAll(".column");
let dragElemColor = "";
let draggableTodo = null;
const items = document.querySelectorAll(".item");
const taskClose = document.querySelector(".close");

taskClose.addEventListener("click", removeTask);

for (const placeholder of placeholders) {
  placeholder.addEventListener("dragover", dragOver);
  placeholder.addEventListener("dragenter", dragEnter);
  placeholder.addEventListener("dragleave", dragLeave);
  placeholder.addEventListener("drop", dragDrop);
}

for (const item of items) {
  item.addEventListener("dragstart", dragStart);
  item.addEventListener("dragend", dragEnd);
}

function dragStart(event) {
  draggableTodo = this;
  event.target.classList.add("hold");
  setTimeout(() => {
    event.target.classList.add("hide");
  }, 0);
}

function dragEnd(event) {
  draggableTodo = null;
  event.target.className = `item ${dragElemColor}`;
}

function dragOver(event) {
  event.preventDefault();
}

function dragEnter(event) {
  event.target.classList.add("hovered");
}

function dragLeave(event) {
  event.target.classList.remove("hovered");
}

function dragDrop(event) {
  if (event.currentTarget.classList.contains("start")) {
    dragElemColor = "purple";
  } else if (event.target.classList.contains("progress")) {
    dragElemColor = "blue";
  } else {
    dragElemColor = "green";
  }
  event.target.classList.remove("hovered");
  this.appendChild(draggableTodo);
}

const addItem = document.querySelector(".add-item");
addItem.addEventListener("click", showPopup);

const popup = document.querySelector(".popup");

const confirm = document.querySelector(".confirm");
confirm.addEventListener("click", insertTask);

function createTask(value) {
  const start = document.querySelector(".start");
  const taskContainer = document.createElement("div");
  const taskBody = document.createElement("div");
  const text = document.createTextNode(value);

  taskContainer.appendChild(taskBody);
  taskBody.appendChild(text);
  taskBody.classList.add("item-text");
  taskContainer.classList.add("item");
  taskContainer.setAttribute("draggable", "true");
  taskContainer.addEventListener("dragstart", dragStart);
  taskContainer.addEventListener("dragend", dragEnd);

  const close = document.createElement("span");
  const cross = document.createTextNode("\u00D7");
  close.classList.add("close");
  close.appendChild(cross);

  taskBody.appendChild(close);

  start.appendChild(taskContainer);

  close.addEventListener("click", removeTask);

  document.querySelector(".popup-input").value = "";
}

function removeTask(event) {
  event.target.parentElement.style.display = "none";
}

function showPopup() {
  popup.classList.add("active");
}

function closePopup() {
  popup.classList.remove("active");
}

const popupCloser = document.querySelector(".popup-close");
popupCloser.addEventListener("click", closePopup);

function insertTask() {
  try {
    const inputValue = document.querySelector(".popup-input").value;
    if (inputValue !== "") {
      popup.classList.remove("active");
      createTask(inputValue);
    } else {
      throw new Error("An empty task can not be created");
    }
  } catch (error) {
    alert(error.message);
  }
}
