import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateTestUser, getFromUserStorage, displayStoredTasks, setupTaskDropdownButton, setupFinishedDropdownButton, updateTaskCounters, updateButtonStates } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { setupAddNewTaskButton } from "./services/taskOperations";

export const appState = new State();
const loginForm = document.querySelector("#app-login-form");

generateTestUser(User);

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");
  let user = authUser(login, password);
  let fieldHTMLContent = user ? taskFieldTemplate : noAccessTemplate;
  document.querySelector("#content").innerHTML = fieldHTMLContent;

  if (user) {
    appState.currentUser = user;
    displayStoredTasks(appState.currentUser);
    setupAddNewTaskButton(appState.currentUser);
    setupTaskDropdownButton(appState.currentUser);
    setupFinishedDropdownButton(appState.currentUser);
    updateButtonStates(appState.currentUser);
    updateTaskCounters(appState.currentUser);
  }
});
