console.log("JavaScript Connected!");

document.addEventListener("DOMContentLoaded", () => {



  // all your code here
  alert("JavaScript working!");

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const subjectInput = document.getElementById("subject");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const subjectError = document.getElementById("subjectError");
const messageError = document.getElementById("messageError");
const successMessage = document.getElementById("successMessage");

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  nameError.textContent = "";
  emailError.textContent = "";
  subjectError.textContent = "";
  messageError.textContent = "";
  successMessage.textContent = "";

  let isValid = true;

  if (nameInput.value.trim() === "") {
    nameError.textContent = "Name is required.";
    isValid = false;
  }

  if (emailInput.value.trim() === "") {
    emailError.textContent = "Email is required.";
    isValid = false;
  } else if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid email address.";
    isValid = false;
  }

  if (subjectInput.value.trim() === "") {
    subjectError.textContent = "Subject is required.";
    isValid = false;
  }

  if (messageInput.value.trim() === "") {
    messageError.textContent = "Message is required.";
    isValid = false;
  }

  if (isValid) {
    successMessage.textContent = "Form submitted successfully!";
    form.reset();
  }
});

function createTask(taskText) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = taskText;

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.className = "remove-btn";
  removeBtn.addEventListener("click", () => li.remove());

  li.appendChild(span);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

addTaskBtn.addEventListener("click", () => {
  const task = taskInput.value.trim();
  if (task !== "") {
    createTask(task);
    taskInput.value = "";
  }
});

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    addTaskBtn.click();
  }
});
});
