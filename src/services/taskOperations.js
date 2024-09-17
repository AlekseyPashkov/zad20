import { addToUserStorage , updateButtonStates, removeFromUserStorage } from "../utils";
import { updateTaskCounters } from "../utils";

export function setupAddNewTaskButton(user) {
  const addNewTaskButton = document.querySelector("#addNewTask");
  if (addNewTaskButton) {
    addNewTaskButton.addEventListener("click", () => addNewTaskClick(user));
  }
}

export function addNewTaskClick(user) {
  const addNewTaskButton = document.querySelector("#addNewTask");
  if (addNewTaskButton) {
    const readyList = document.querySelector("#ready");
    const newTaskItem = document.createElement('div');
    newTaskItem.className = "task";
    const inputField = document.createElement("input");
    inputField.type = "text";
    newTaskItem.appendChild(inputField);
    readyList.appendChild(newTaskItem);
    addNewTaskButton.textContent = "Submit";
    addNewTaskButton.id = "submitTask";
    addNewTaskButton.removeEventListener("click", () => addNewTaskClick(user));
    addNewTaskButton.addEventListener("click", () => submitTaskClick(user));
  }
}

export function submitTaskClick(user) {
  const submitButton = document.querySelector("#submitTask");
  if (submitButton) {
    const inputField = document.querySelector("#ready input");
    const taskText = inputField.value;
    const newTaskItem = inputField.parentElement;
    addToUserStorage(taskText, "readyTasks", user);
    newTaskItem.innerHTML = taskText;
    submitButton.textContent = "+ Add card";
    submitButton.id = "addNewTask";
    submitButton.removeEventListener("click", () => submitTaskClick(user));
    submitButton.addEventListener("click", () => addNewTaskClick(user));
    updateButtonStates(user);
    updateTaskCounters(user);
  }
}

export function moveTaskToInProgress(task, user) {
  const readyList = document.querySelector("#ready");
  const inProgressList = document.querySelector("#inProgress");
  const taskItems = readyList.querySelectorAll("div");
    taskItems.forEach(taskItem => {
      if (taskItem.textContent === task) {
        readyList.removeChild(taskItem);
      }
    });
  const taskItem = document.createElement("div");
  taskItem.className = "task";
  taskItem.textContent = task;
  inProgressList.appendChild(taskItem);
  removeFromUserStorage(task, "readyTasks", user);
  addToUserStorage(task, "inProgressTasks", user);
  updateButtonStates(user);
  updateTaskCounters(user);
}


export function moveTaskToFinished(task, user) {
  const inProgressList = document.querySelector("#inProgress");
  const finishedList = document.querySelector("#finished");
  const taskItems = inProgressList.querySelectorAll("div");
    taskItems.forEach(taskItem => {
      if (taskItem.textContent === task) {
        inProgressList.removeChild(taskItem);
      }
    });
  const taskItem = document.createElement("div");
  taskItem.className = "task";
  taskItem.textContent = task;
  finishedList.appendChild(taskItem);
  removeFromUserStorage(task, "inProgressTasks", user);
  addToUserStorage(task, "finishedTasks", user);
  updateButtonStates(user);
  updateTaskCounters(user);
}