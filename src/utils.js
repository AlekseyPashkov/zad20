import { moveTaskToInProgress, moveTaskToFinished } from "./services/taskOperations";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const addToUserStorage = function (obj, key, user) {
  const userKey = `${key}_${user.login}`;
  const storageData = getFromStorage(userKey);
  storageData.push(obj);
  localStorage.setItem(userKey, JSON.stringify(storageData));
};

export const getFromUserStorage = function (key, user) {
  const userKey = `${key}_${user.login}`;
  return JSON.parse(localStorage.getItem(userKey) || "[]");
};

export const removeFromStorage = function (obj, key) {
  let storageData = getFromStorage(key);
  storageData = storageData.filter(item => item !== obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const removeFromUserStorage = function (obj, key, user) {
  let storageData = getFromUserStorage(key, user);
  storageData = storageData.filter(item => item !== obj);
  localStorage.setItem(`${key}_${user.login}`, JSON.stringify(storageData));
};

export const generateTestUser = function (User) {
  //localStorage.clear();
  const testUser = new User("test", "qwerty123");
  const testUser2 = new User("test2", "qwerty123");
  User.save(testUser);
  User.save(testUser2);
};

export function displayStoredTasks(user) {
  const readyList = document.querySelector("#ready");
  const inProgressList = document.querySelector("#inProgress");
  const finishedList = document.querySelector("#finished");

  const tasks = getFromUserStorage("readyTasks", user);
    tasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.className = "task";
      taskItem.textContent = task;
      readyList.appendChild(taskItem);
    });

  const inProgressTasks = getFromUserStorage("inProgressTasks", user);
    inProgressTasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.className = "task";
      taskItem.textContent = task;
      inProgressList.appendChild(taskItem);
    });

  const finishedTasks = getFromUserStorage("finishedTasks", user);
    finishedTasks.forEach(task => {
      const taskItem = document.createElement("div");
      taskItem.className = "task";
      taskItem.textContent = task;
      finishedList.appendChild(taskItem);
    });

  updateButtonStates(user);
  updateTaskCounters(user);
}

export function setupTaskDropdownButton(user) {
  const dropdownMenu = document.querySelector("#dropdown-menu");
    if (dropdownMenu) {
      const tasks = getFromUserStorage("readyTasks", user);
      tasks.forEach(task => {
        const dropdownItem = document.createElement("li");
        dropdownItem.classList.add("dropdown-item");
        dropdownItem.textContent = task;
        dropdownItem.addEventListener("click", (e) => {
          e.preventDefault();
          moveTaskToInProgress(task, user);
        });
        dropdownMenu.appendChild(dropdownItem);
      });
    }
}

export function setupFinishedDropdownButton(user) {
  const dropdownMenuFinished = document.querySelector("#dropdown-menu-finished");
    if (dropdownMenuFinished) {
      const inProgressTasks = getFromUserStorage("inProgressTasks", user);
      inProgressTasks.forEach(task => {
        const dropdownItem = document.createElement("div");
        dropdownItem.classList.add("dropdown-item");
        dropdownItem.textContent = task;
        dropdownItem.addEventListener("click", (e) => {
          e.preventDefault();
          moveTaskToFinished(task, user);
        });
        dropdownMenuFinished.appendChild(dropdownItem);
      });
    }
}

export function updateButtonStates(user) {
  const readyTasks = getFromUserStorage("readyTasks", user);
  const inProgressTasks = getFromUserStorage("inProgressTasks", user);
  const addNewTaskInProgressButton = document.querySelector("#addNewTaskInProgress");
  const addNewTaskToFinishedButton = document.querySelector("#addNewTaskToFinished");
    if (addNewTaskInProgressButton) {
      addNewTaskInProgressButton.disabled = readyTasks.length === 0;
    }
    if (addNewTaskToFinishedButton) {
      addNewTaskToFinishedButton.disabled = inProgressTasks.length === 0;
    }
}

export function updateTaskCounters(user) {
  const readyTasks = getFromUserStorage("readyTasks", user);
  const finishedTasks = getFromUserStorage("finishedTasks", user);
  const activeTasksCounter = document.querySelector("#counter-active-tasks");
  const finishedTasksCounter = document.querySelector("#counter-finished-tasks");
    if (activeTasksCounter) {
      activeTasksCounter.textContent = readyTasks.length;
    }
    if (finishedTasksCounter) {
      finishedTasksCounter.textContent = finishedTasks.length;
    }
}